import React from 'react';
import { RefreshCw } from 'lucide-react';

interface SlugInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  sourceValue?: string; // The text to generate slug from (e.g. Product Name)
  baseUrl?: string;     // e.g. https://nobel.com/products/
  error?: string;
  className?: string;
  onGenerate?: (slug: string) => void; // Optional callback when generated
}

export const SlugInput: React.FC<SlugInputProps> = ({
  label = "الرابط الدائم (Slug)",
  value,
  onChange,
  sourceValue,
  baseUrl,
  error,
  className = '',
}) => {
  
  // Helper: Convert string to slug (Arabic & English support)
  const slugify = (text: string) => {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\u0621-\u064A0-9-]+/g, '') // Remove non-word chars (allowing Arabic & Numbers)
      .replace(/--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start
      .replace(/-+$/, '');            // Trim - from end
  };

  const handleGenerate = () => {
    if (sourceValue) {
      const newSlug = slugify(sourceValue);
      onChange(newSlug);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Live slugify as user types (prevent spaces/special chars)
    const sanitized = e.target.value.replace(/\s+/g, '-');
    onChange(sanitized);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`} dir='ltr'>
      
      {/* Label & Generate Action */}
      <div className="flex justify-between items-end" dir='rtl'>
        {label && (
          <label className="text-xs font-semibold uppercase text-text-muted tracking-wide flex items-center gap-1">
            {label}
          </label>
        )}
        
        {sourceValue && (
          <button
            type="button"
            onClick={handleGenerate}
            className="text-[10px] text-primary hover:underline flex items-center gap-1 transition-colors"
          >
            <RefreshCw size={10} />
            توليد من الاسم
          </button>
        )}
      </div>

      {/* Input Group */}
      <div className={`
        flex items-stretch border transition-all duration-200 bg-white
        ${error 
          ? 'border-destructive focus-within:ring-1 focus-within:ring-destructive/20' 
          : 'border-border focus-within:border-secondary'}
      `}>
        
        {/* Base URL Prefix */}
        {baseUrl && (
          <div className="bg-secondary/10 text-text-primary px-2 flex items-center border-l border-border select-none" dir="ltr">
            <span className="text-xs font-mono truncate max-w-40">{baseUrl}</span>
          </div>
        )}

        {/* The Input */}
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          className="flex-1 px-3 py-2 text-sm text-text-primary bg-transparent outline-none font-mono placeholder:font-sans"
          placeholder="example-slug-url"
          dir="ltr" // Slugs are usually read LTR even if Arabic
        />
      </div>

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
};