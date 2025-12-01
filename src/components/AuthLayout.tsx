import { type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

interface AuthLayoutProps {
    children: ReactNode;
    title?: string;
    showBackButton?: boolean;
}

const AuthLayout = ({ children, title, showBackButton = false }: AuthLayoutProps) => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
            <div className="w-full max-w-[95%] sm:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-emerald-600 px-6 py-8 sm:px-8 sm:py-10 md:py-12 relative">
                    {showBackButton && (
                        <button
                            onClick={() => navigate(-1)}
                            className="absolute top-4 left-4 sm:top-6 sm:left-6 text-white hover:bg-emerald-700 rounded-full p-1.5 sm:p-2 transition-colors"
                            aria-label="Go back"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    )}


                    {title && (
                        <h2 className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 text-white text-lg sm:text-xl font-semibold">
                            {title}
                        </h2>
                    )}

                    <Logo size="small" showText={true} />
                </div>

                {/* Content Section */}
                <div className="px-6 py-6 sm:px-8 sm:py-8">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
