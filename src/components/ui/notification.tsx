"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, Info, X } from "lucide-react";
import { cn } from "../../core/utils/cn";

export type NotificationType = 'success' | 'error' | 'info';

export interface NotificationProps {
  id: number;
  message: string;
  type: NotificationType;
  onDismiss: (id: number) => void;
  duration?: number;
}

const notificationConfig = {
  success: { icon: CheckCircle, iconColor: "text-[#005f73]", progressColor: "bg-[#005f73]" },
  error: { icon: AlertTriangle, iconColor: "text-destructive", progressColor: "bg-destructive" },
  info: { icon: Info, iconColor: "text-[#264653]", progressColor: "bg-[#264653]" },
  warning: { icon: AlertTriangle, iconColor: "text-[#fca311]", progressColor: "bg-[#fca311]" },
};

export const NotificationToast = ({ id, message, type, onDismiss, duration = 5000 }: NotificationProps) => {
  const { icon: Icon, iconColor, progressColor } = notificationConfig[type];

  // Auto-dismiss after the specified duration
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, onDismiss, duration]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="relative w-full max-w-sm overflow-hidden  border border-gray-300 bg-white p-2 shadow-lg backdrop-blur-md text-gray-800"
    >
      <div className="flex items-center gap-3">
        <Icon className={cn("w-5 h-5 shrink-0", iconColor)} />
        <p className="text-sm font-medium flex-grow">{message}</p>
        <button 
          onClick={() => onDismiss(id)} 
          className="p-1.5  text-destructive bg-destructive/20 hover:bg-destructive/30 cursor-pointer transition-colors shrink-0"
        >
          <X size={16} />
        </button>
      </div>

      {/* Animated Progress Bar */}
      <motion.div
        key={id} // Re-trigger animation on new notification
        className={cn("absolute bottom-0 left-0 h-0.5", progressColor)}
        initial={{ width: "100%" }}
        animate={{ width: "0%" }}
        transition={{ duration: duration / 1000, ease: "linear" }}
      />
    </motion.div>
  );
};