import React from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  iconType?: 'arrow' | 'calendar';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  showIcon = true,
  iconType = 'calendar',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-display font-bold uppercase tracking-wider rounded-xl transition-all duration-300 active:scale-95 select-none overflow-hidden group cursor-pointer';

  const sizeClasses = {
    sm: 'text-xs px-4 py-2.5 gap-2',
    md: 'text-sm px-6 py-3.5 gap-2.5',
    lg: 'text-base px-8 py-4 gap-3',
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#ff5e00] to-[#ff6b1a] text-white hover:from-[#ff6b1a] hover:to-[#ff8438] hover:shadow-[0_0_25px_rgba(255,94,0,0.5)] border border-[#ff8438]/30 hover:scale-[1.025]',
    secondary: 'bg-[#111722] text-white hover:bg-[#1a2334] border border-white/10 hover:border-[#0084ff]/50 hover:shadow-[0_0_20px_rgba(0,132,255,0.3)]',
    outline: 'bg-transparent text-white border border-white/20 hover:border-[#ff5e00] hover:text-[#ff5e00] hover:bg-[#ff5e00]/10',
    ghost: 'bg-transparent text-slate-300 hover:text-white hover:bg-white/5',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {iconType === 'calendar' && showIcon && (
          <Calendar className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
        )}
        <span>{children}</span>
        {iconType === 'arrow' && showIcon && (
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        )}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out" />
      )}
    </button>
  );
};
