'use client';

import React, { useRef, useState, useEffect } from 'react';
import { UploadCloud, X, Image as ImageIcon } from 'lucide-react';
import { Button } from './button';

interface ImagePickerProps {
  label?: string;
  value?: File | string | null;
  onChange: (file: File | null) => void;
  error?: string;
  className?: string;
}

export const ImagePicker: React.FC<ImagePickerProps> = ({
  label,
  value,
  onChange,
  error,
  className = '',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Handle Preview Generation
  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }

    if (typeof value === 'string') {
      setPreview(value);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onChange(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-xs font-semibold uppercase text-text-muted tracking-wide">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.click()}
        className={`
          relative group cursor-pointer overflow-hidden
          border-2 border-dashed transition-all duration-200
          min-h-[160px] flex flex-col items-center justify-center text-center p-4
          bg-background
          ${error 
            ? 'border-destructive/50 bg-destructive/5' 
            : 'border-border hover:border-primary/50 hover:bg-secondary/5'}
        `}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {preview ? (
          <>
            <img
              src={preview}
              alt="Preview"
              className="absolute inset-0 w-full h-full object-contain p-2 z-0"
            />
            {/* Overlay for Remove Action */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                leftIcon={<X size={14} />}
                className="pointer-events-auto"
              >
                إزالة الصورة
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-text-muted transition-colors group-hover:text-primary">
            <div className="p-3 bg-secondary/5 rounded-full mb-3 group-hover:bg-primary/10 transition-colors">
              <UploadCloud size={24} />
            </div>
            <span className="text-sm font-medium">اضغط هنا لرفع صورة</span>
            <span className="text-[10px] opacity-70 mt-1">JPG, PNG حتى 5MB</span>
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
};