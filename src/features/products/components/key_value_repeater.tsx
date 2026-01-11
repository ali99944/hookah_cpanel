import React from 'react';
import { useFieldArray, type Control, type UseFormRegister } from 'react-hook-form';
import { Plus, Trash2 } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import { TextArea } from '../../../components/ui/textarea';

interface KeyValueRepeaterProps {
  control: Control<any>;
  register: UseFormRegister<any>;
  name: string; // 'attributes' or 'features'
  label: string;
  keyLabel?: string;
  valueLabel?: string;
  isTextAreaValue?: boolean;
  errors?: any;
}

export const KeyValueRepeater: React.FC<KeyValueRepeaterProps> = ({
  control,
  register,
  name,
  label,
  keyLabel = "العنوان",
  valueLabel = "القيمة",
  isTextAreaValue = false,
  errors
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-2">
        <h4 className="text-sm font-bold text-text-primary uppercase tracking-wide">{label}</h4>
        <Button 
          type="button" 
          variant="secondary" 
          size="sm" 
          onClick={() => append({ key: '', value: '' })}
          leftIcon={<Plus size={14} />}
        >
          إضافة حقل
        </Button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-start gap-3 bg-secondary/5 p-3 border border-border">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-1">
                 <Input 
                   placeholder={keyLabel} 
                   {...register(`${name}.${index}.key` as const)}
                   error={errors?.[index]?.key?.message}
                 />
              </div>
              <div className="md:col-span-2">
                {isTextAreaValue ? (
                   <TextArea 
                    placeholder={valueLabel} 
                    className="min-h-[42px]"
                    {...register(`${name}.${index}.value` as const)}
                    error={errors?.[index]?.value?.message}
                   />
                ) : (
                   <Input 
                    placeholder={valueLabel} 
                    {...register(`${name}.${index}.value` as const)}
                    error={errors?.[index]?.value?.message}
                   />
                )}
              </div>
            </div>
            <Button 
              type="button" 
              variant="danger" 
              size="icon" 
              onClick={() => remove(index)}
              className="mt-0.5"
            >
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-xs text-text-muted text-center py-4 bg-background border border-dashed border-border">
            لا توجد عناصر مضافة. اضغط "إضافة حقل" للبدء.
          </p>
        )}
      </div>
    </div>
  );
};