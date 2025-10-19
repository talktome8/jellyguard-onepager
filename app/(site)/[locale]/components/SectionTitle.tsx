'use client';

interface SectionTitleProps {
  kicker?: string;
  title: string;
  subtitle?: string;
  showUnderline?: boolean;
  centered?: boolean;
  light?: boolean; // For dark backgrounds
  icon?: 'shield' | 'wave' | 'globe' | 'check' | 'leaf'; // Minimal line icons
}

export default function SectionTitle({
  kicker,
  title,
  subtitle,
  showUnderline = true,
  centered = false,
  light = false,
  icon,
}: SectionTitleProps) {
  // Minimal line icon SVGs
  const renderIcon = () => {
    if (!icon) return null;
    
    const iconClass = "w-12 h-12 text-coral mb-4";
    const commonProps = {
      className: iconClass,
      strokeWidth: 1.5,
      stroke: "currentColor",
      fill: "none",
      viewBox: "0 0 24 24"
    };

    switch (icon) {
      case 'shield':
        return (
          <svg {...commonProps}>
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case 'wave':
        return (
          <svg {...commonProps}>
            <path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" />
            <path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0" />
          </svg>
        );
      case 'globe':
        return (
          <svg {...commonProps}>
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
        );
      case 'check':
        return (
          <svg {...commonProps}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'leaf':
        return (
          <svg {...commonProps}>
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`mb-12 ${centered ? 'text-center mx-auto' : ''}`}>
      {icon && <div className={centered ? 'flex justify-center' : ''}>{renderIcon()}</div>}
      {kicker && (
        <div className={`kicker ${light ? 'text-teal-200' : ''}`}>{kicker}</div>
      )}
      <h2 className={`section-title ${light ? 'text-white' : ''}`}>
        {title}
      </h2>
      {showUnderline && (
        <div className={`w-16 h-1 bg-coral rounded-full mt-4 ${centered ? 'mx-auto' : ''}`} />
      )}
      {subtitle && (
        <p className={`section-subtitle mt-6 ${light ? 'text-white/90' : ''}`}>{subtitle}</p>
      )}
    </div>
  );
}
