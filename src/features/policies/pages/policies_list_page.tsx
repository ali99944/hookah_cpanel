import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { usePolicies } from '../hooks/use_policies';
import { PolicyListCard } from '../components/policy_list_card';

export const PoliciesListPage: React.FC = () => {
  const { data: policies = [], isLoading } = usePolicies();

  return (
    <div className="space-y-6 pb-20" dir="rtl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary tracking-tight font-cairo">السياسات والأحكام</h1>
          <p className="text-sm text-text-muted">إدارة صفحات الشروط، الخصوصية، والاسترجاع.</p>
        </div>
        <div className="p-2 bg-secondary/5 border border-border rounded-none">
           <ShieldCheck className="text-primary" />
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {[1,2,3].map(i => <div key={i} className="h-40 bg-card animate-pulse border border-border" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {policies.map((policy) => (
            <PolicyListCard key={policy.key} policy={policy} />
          ))}
        </div>
      )}
    </div>
  );
};