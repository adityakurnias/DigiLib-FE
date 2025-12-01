import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, className = '', ...props }, ref) => {
        return (
            <div className="flex flex-col gap-2">
                {label && (
                    <label className="text-sm font-semibold text-gray-800">
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    className={`px-3 py-2.5 sm:px-4 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-emerald-600 transition-colors text-sm sm:text-base ${className}`}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = 'Input';

export default Input;
