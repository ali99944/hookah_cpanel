'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Plus, X, Image as ImageIcon } from 'lucide-react';

interface MultiImagePickerProps {
  label?: string;
  value?: (File | string)[]; // Can be mix of URL strings and File objects
  onChange: (files: (File | string)[]) => void;
  error?: string;
  max?: number;
}

export const MultiImagePicker: React.FC<MultiImagePickerProps> = ({
  label,
  value = [],
  onChange,
  error,
  max = 4
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const newFile = e.target.files[0];
      onChange([...value, newFile]);
    }
    // Reset input so selecting same file works again if needed
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleRemove = (index: number) => {
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-xs font-semibold uppercase text-text-muted tracking-wide">
          {label} {max && <span className="text-[10px] font-normal normal-case">({value.length}/{max})</span>}
        </label>
      )}

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 gap-4">
        
        {/* Render Existing Images */}
        {value.map((item, index) => (
          <ImageSlot 
            key={index} 
            item={item} 
            onRemove={() => handleRemove(index)} 
          />
        ))}

        {/* Render Add Button (Only if below max) */}
        {value.length < max && (
          <div 
            onClick={() => inputRef.current?.click()}
            className={`
              aspect-square cursor-pointer
              border-2 border-dashed border-border hover:border-primary
              bg-background hover:bg-secondary/5
              flex flex-col items-center justify-center gap-1
              text-text-muted hover:text-primary transition-all
              group
            `}
          >
            <Plus size={24} className="group-hover:scale-110 transition-transform"/>
            {/* <span className="text-[10px] font-bold">إضافة</span> */}
            <input 
              ref={inputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleAdd}
            />
          </div>
        )}
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};

// Helper Sub-component for individual slots
const ImageSlot = ({ item, onRemove }: { item: File | string, onRemove: () => void }) => {
  const [preview, setPreview] = useState<string>('');

  useEffect(() => {
    if (typeof item === 'string') {
      setPreview(item);
    } else {
      const url = URL.createObjectURL(item);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [item]);

  return (
    <div className="relative aspect-square border border-border bg-white group">
      <img 
        src={preview} 
        alt="Uploaded" 
        className="w-full h-full object-cover"
      />
      
      {/* Remove Overlay */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button 
          type="button"
          onClick={onRemove}
          className="p-1.5 bg-destructive text-white hover:bg-red-700 transition-colors rounded-none"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};