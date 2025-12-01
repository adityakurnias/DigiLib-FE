import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    children: ReactNode;
    fullWidth?: boolean;
    icon?: ReactNode;
}

const Button = ({
    variant = 'primary',
    children,
    fullWidth = false,
    icon,
    className = '',
    ...props
}: ButtonProps) => {
    const baseStyles = 'px-4 py-2.5 sm:px-6 sm:py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base';

    const variantStyles = {
        primary: 'bg-emerald-600 hover:bg-emerald-700 text-white',
        secondary: 'bg-white hover:bg-gray-50 text-emerald-600 border-2 border-emerald-600'
    };

    const widthStyle = fullWidth ? 'w-full' : '';

    return (
        <button
            className={`${baseStyles} ${variantStyles[variant]} ${widthStyle} ${className}`}
            {...props}
        >
            {children}
            {icon && icon}
        </button>
    );
};

export default Button;
