import React, { useState } from 'react';
import { ContactList } from '../components/contact_list';
import { ContactFiltersBar } from '../components/contact_filters';
import { type ContactFilters } from '../types';
import { ContactStats } from '../components/contact_states';
import { useContactMessages } from '../hooks/use-contacts';

export const ContactPage: React.FC = () => {
  const [filters, setFilters] = useState<ContactFilters>({ search: '' });
  const { data: messages = [], isLoading } = useContactMessages(filters);

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">رسائل التواصل</h1>
        <p className="text-sm text-text-muted">إدارة استفسارات وشكاوى العملاء.</p>
      </div>

      <ContactStats messages={messages} isLoading={isLoading} />
      
      <ContactFiltersBar 
        filters={filters} 
        onChange={setFilters} 
        onReset={() => setFilters({ search: '' })}
      />

      <ContactList data={messages} isLoading={isLoading} />
    </div>
  );
};