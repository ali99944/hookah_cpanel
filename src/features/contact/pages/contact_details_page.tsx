import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowRight, Trash2, Mail, Calendar, User, Reply } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { DangerDialog } from '../../../components/ui/dialog';
import { useDeleteMessage } from '../hooks/use-contacts';
import { useContactStore } from '../state/contact.store';

export const ContactDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // URL param available but not used for fetching
  
  // 1. Get Data from Store
  const message = useContactStore((state) => state.selectedMessage);
  
  const [showDelete, setShowDelete] = React.useState(false);
  const deleteMutation = useDeleteMessage(+id! as number | null, () => navigate('/contact'));

  // 2. Handle Page Refresh (Store wipe)
  // If user refreshes, store is null. We must redirect back because we don't fetch single msg via API.
  useEffect(() => {
    if (!message) {
      navigate('/contact', { replace: true });
    }
  }, [message, navigate]);

  if (!message) return null; // Or a loading spinner while redirecting

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      
      {/* HEADER */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/contact-requests')}>
             <ArrowRight size={20} />
          </Button>
          <div>
             <h1 className="text-2xl font-bold text-text-primary font-cairo">قراءة الرسالة</h1>
             <p className="text-sm text-text-muted">تفاصيل الاستفسار # {message.id}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button 
            leftIcon={<Reply size={16}/>} 
            onClick={() => window.location.href = `mailto:${message.email}?subject=Re: ${message.subject}`}
          >
            رد عبر البريد
          </Button>
          <Button variant="danger" size="icon" onClick={() => setShowDelete(true)}>
             <Trash2 size={16}/>
          </Button>
        </div>
      </div>

      {/* MESSAGE CARD */}
      <div className="bg-white border border-border overflow-hidden">
        
        {/* Sender Info */}
        <div className="bg-secondary/5 p-6 border-b border-border flex flex-col md:flex-row justify-between gap-4">
          <div className="flex items-start gap-4">
             <div className="w-12 h-12 bg-white border border-border flex items-center justify-center rounded-full text-text-muted">
                <User size={24} />
             </div>
             <div>
               <h3 className="text-lg font-bold text-text-primary">{message.name}</h3>
               <div className="flex items-center gap-2 text-text-muted text-sm mt-1">
                 <Mail size={14} /> {message.email}
               </div>
             </div>
          </div>
          
          <div className="flex flex-col items-end justify-center text-sm text-text-muted">
            <div className="flex items-center gap-2">
               <Calendar size={14} />
               {new Date(message.created_at).toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <span className="font-mono text-xs mt-1">
              {new Date(message.created_at).toLocaleTimeString('ar-EG')}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 min-h-[300px]">
          <h2 className="text-xl font-bold text-text-primary mb-6 border-b border-border/50 pb-2">
            الموضوع: {message.subject}
          </h2>
          <div className="text-text-primary leading-loose whitespace-pre-wrap font-medium">
            {message.message}
          </div>
        </div>

      </div>

      {/* DELETE DIALOG */}
      <DangerDialog 
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        onConfirm={() => deleteMutation.mutate(message.id)}
        title="حذف الرسالة؟"
        description="هل أنت متأكد من حذف هذه الرسالة نهائياً؟"
        isLoading={deleteMutation.isPending}
      />

    </div>
  );
};