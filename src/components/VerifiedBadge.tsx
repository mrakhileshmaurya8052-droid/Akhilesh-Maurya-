import React from 'react';
import { Check } from 'lucide-react';

interface VerifiedBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  withText?: boolean;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({ 
  size = 'md', 
  className = '',
  withText = false 
}) => {
  const sizeMap = {
    sm: 'w-3.5 h-3.5 text-[9px]',
    md: 'w-4.5 h-4.5 text-[11px]',
    lg: 'w-5.5 h-5.5 text-[13px]'
  };

  const iconSizeMap = {
    sm: 9,
    md: 12,
    lg: 14
  };

  return (
    <span 
      className={`inline-flex items-center gap-1.5 ${className}`}
      title="UC LIVE Verified Official"
    >
      <span 
        className={`inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-500 via-yellow-400 to-amber-300 text-black font-extrabold shadow-[0_0_12px_rgba(250,204,21,0.85)] ring-1 ring-yellow-200/60 ${sizeMap[size]}`}
      >
        <Check strokeWidth={3.8} size={iconSizeMap[size]} />
      </span>
      {withText && (
        <span className="text-yellow-400 font-bold text-xs tracking-wider uppercase drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]">
          VERIFIED
        </span>
      )}
    </span>
  );
};
