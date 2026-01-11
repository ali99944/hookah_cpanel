'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info } from 'lucide-react';
import { Button } from './button';

// --- TYPES ---
interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string;
}

interface ActionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  isLoading?: boolean;
}

// --- 1. BASE DIALOG COMPONENT ---
export function Dialog({ isOpen, onClose, title, children, width = 'max-w-md' }: DialogProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-900/20 backdrop-blur-sm h-screen"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`relative w-full ${width} bg-white border border-neutral-200 shadow-none rounded-none flex flex-col`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-100">
              <h3 className="text-lg font-bold text-neutral-900">{title}</h3>
              <button 
                onClick={onClose}
                className="cursor-pointer p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors rounded-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// --- 2. CONFIRM DIALOG (General Purpose) ---
export function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, isLoading }: ActionDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-primary/15 text-primary flex items-center justify-center shrink-0">
            <Info size={24} />
          </div>
          <div className="text-neutral-600 text-sm leading-relaxed">
            {description}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-neutral-100">
          <Button 
            onClick={onClose}
            disabled={isLoading}
            variant='ghost'
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Confirm'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

// --- 3. DANGER DIALOG (Destructive Actions) ---
export function DangerDialog({ isOpen, onClose, onConfirm, title, description, isLoading }: ActionDialogProps) {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={title}>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-destructive/15 text-destructive flex items-center justify-center shrink-0">
            <AlertTriangle size={24} />
          </div>
          <div className="text-neutral-600 text-sm leading-relaxed">
            {description}
          </div>
        </div>
        
        <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-neutral-100">
          <Button 
            onClick={onClose}
            disabled={isLoading}
            variant='ghost'
            
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={isLoading}
            variant='danger'
          >
            {isLoading ? 'Deleting...' : 'Delete Immediately'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}