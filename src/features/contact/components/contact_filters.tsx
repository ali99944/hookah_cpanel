import React from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { type ContactFilters } from '../types';

interface ContactFiltersProps {
  filters: ContactFilters;
  onChange: (filters: ContactFilters) => void;
  onReset: () => void;
}

export const ContactFiltersBar: React.FC<ContactFiltersProps> = ({ filters, onChange, onReset }) => {
  return (
    <div className="bg-white border border-border p-4 flex gap-4 items-end">
      <div className="flex-1">
        <Input 
          label="بحث"
          placeholder="ابحث بالاسم، البريد أو الموضوع..."
          icon={<Search size={16}/>}
          value={filters.search || ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
        />
      </div>
      <Button variant="ghost" onClick={onReset} leftIcon={<X size={16}/>}>
        تهيئة
      </Button>
    </div>
  );
};