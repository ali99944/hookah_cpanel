import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';
import { StatCard } from '../../../components/ui/stat_card';
import type { ContactMessage } from '../types';

interface ContactStatsProps {
  messages: ContactMessage[];
  isLoading: boolean;
}

export const ContactStats: React.FC<ContactStatsProps> = ({ messages, isLoading }) => {
  const total = messages.length;
  
  // Fake stats logic for demo (replace with real API stats if available)
  const today = new Date().toDateString();
  const newToday = messages.filter(m => new Date(m.created_at).toDateString() === today).length;

  if (isLoading) return <div className="h-32 animate-pulse bg-card border border-border" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatCard 
        title="إجمالي الرسائل" 
        value={total} 
        icon={<Mail size={20} />} 
        trend={{ value: "12%", isPositive: true, label: "مقارنة بالأسبوع الماضي" }}
      />
      <StatCard 
        title="رسائل اليوم" 
        value={newToday} 
        icon={<MessageSquare size={20} />}
        trend={{ value: "New", isPositive: true, label: "Received today" }}
      />
      <StatCard 
        title="دعم العملاء" 
        value="نشط" 
        icon={<Mail size={20} />}
        trend={{ value: "24/7", isPositive: undefined, label: "System Status" }}
      />
    </div>
  );
};