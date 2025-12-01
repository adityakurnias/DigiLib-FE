import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import Button from '../components/Button';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
            <div className="w-full max-w-[95%] sm:max-w-md bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
                {/* Header Section */}
                <div className="bg-emerald-600 px-6 py-8 sm:px-8 sm:py-10 md:py-12">
                    <Logo size="large" showText={true} />
                </div>

                {/* Content Section */}
                <div className="px-6 py-8 sm:px-8 sm:py-10 md:py-12 flex flex-col items-center">
                    {/* Large Book Icon */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-6 sm:mb-8 text-emerald-600">
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-full h-full"
                        >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                            <path d="M12 6v12" />
                            <path d="M8 9h8" />
                            <path d="M8 12h8" />
                        </svg>
                    </div>

                    {/* Welcome Text */}
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                        Welcome to DigiLib
                    </h2>
                    <p className="text-sm sm:text-base text-gray-600 text-center mb-2">
                        Your modern digital library platform
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 sm:mb-8 px-4">
                        Explore thousands of book, manage your collection and connect with readers worldwide
                    </p>

                    {/* Action Buttons */}
                    <div className="w-full space-y-3">
                        <Button
                            variant="primary"
                            fullWidth
                            onClick={() => navigate('/login')}
                            icon={
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                                    />
                                </svg>
                            }
                        >
                            Sign In
                        </Button>
                        <Button
                            variant="secondary"
                            fullWidth
                            onClick={() => navigate('/register')}
                        >
                            Create Account
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
