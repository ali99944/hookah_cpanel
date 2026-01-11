import React from 'react';
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css';


interface RichTextEditorProps {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
}

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'align': [] }],
    ['link', 'clean']
  ],
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ label, value, onChange, error }) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-xs font-semibold uppercase text-text-muted tracking-wide">
          {label}
        </label>
      )}
      
      <div className={`
        bg-white
        ${error ? 'border border-destructive' : ''}
      `}>
        <ReactQuill 
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          className="nobel-editor"
        />
      </div>
      
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
};