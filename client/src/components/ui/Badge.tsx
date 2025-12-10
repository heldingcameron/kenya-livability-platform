import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface BadgeProps {
    children: ReactNode;
    variant?: 'stable' | 'caution' | 'critical' | 'neutral' | 'primary';
    size?: 'sm' | 'md' | 'lg';
    icon?: LucideIcon;
}

export const Badge = ({ children, variant = 'neutral', size = 'md', icon: Icon }: BadgeProps) => {
    const variantClasses = {
        stable: 'bg-stable/10 text-stable-dark border-stable/20',
        caution: 'bg-caution/10 text-caution-dark border-caution/20',
        critical: 'bg-critical/10 text-critical-dark border-critical/20',
        neutral: 'bg-slate-100 text-slate-700 border-slate-200',
        primary: 'bg-primary-50 text-primary-700 border-primary-200',
    };

    const sizeClasses = {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-2.5 py-1',
        lg: 'text-base px-3 py-1.5',
    };

    const iconSizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    return (
        <span
            className={`
                inline-flex items-center gap-1.5 rounded-full border font-medium
                ${variantClasses[variant]}
                ${sizeClasses[size]}
            `}
        >
            {Icon && <Icon className={iconSizeClasses[size]} />}
            {children}
        </span>
    );
};
