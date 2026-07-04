import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react';

type StatusVariant = 'error' | 'success' | 'info';

interface StatusMessageProps {
  variant: StatusVariant;
  message: string;
  className?: string;
}

const styles: Record<StatusVariant, { container: string; icon: React.ReactNode }> = {
  error: {
    container: 'bg-red-500/10 border-red-500/20 text-red-600',
    icon: <AlertCircle size={18} aria-hidden="true" />,
  },
  success: {
    container: 'bg-green-500/10 border-green-500/20 text-green-600',
    icon: <CheckCircle size={18} aria-hidden="true" />,
  },
  info: {
    container: 'bg-electric/10 border-electric/20 text-electric',
    icon: <Info size={18} aria-hidden="true" />,
  },
};

const StatusMessage = ({ variant, message, className = '' }: StatusMessageProps) => {
  const { container, icon } = styles[variant];
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      aria-live="polite"
      className={`flex items-center gap-3 p-4 border rounded-xl text-sm ${container} ${className}`}
    >
      {icon}
      <span>{message}</span>
    </div>
  );
};

export default StatusMessage;
