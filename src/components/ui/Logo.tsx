import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  const sizeMap = {
    sm: { img: 'w-8 h-8', textTitle: 'text-sm', textSub: 'text-[9px]' },
    md: { img: 'w-11 h-11', textTitle: 'text-lg', textSub: 'text-[10px]' },
    lg: { img: 'w-16 h-16', textTitle: 'text-2xl', textSub: 'text-xs' },
    xl: { img: 'w-24 h-24', textTitle: 'text-3xl', textSub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex-shrink-0 group">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#0084ff] to-[#ff5e00] opacity-30 blur-sm group-hover:opacity-75 transition duration-500" />
        <img
          src="/assets/arena/logo/arena-logo.png"
          alt="Arena Barbearia Logo"
          className={`relative object-contain rounded-full shadow-md ${currentSize.img}`}
          width={90}
          height={90}
          loading="eager"
        />
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-black tracking-wider text-white ${currentSize.textTitle}`}>
              ARENA
            </span>
            <span className={`font-display font-black tracking-wider text-gradient-blue ${currentSize.textTitle}`}>
              BARBEARIA
            </span>
          </div>
          <span className={`font-sans font-semibold tracking-[0.22em] text-slate-400 uppercase mt-0.5 ${currentSize.textSub}`}>
            SPORT CLUB
          </span>
        </div>
      )}
    </div>
  );
};
