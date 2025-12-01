interface LogoProps {
  size?: 'small' | 'large';
  showText?: boolean;
}

const Logo = ({ size = 'large', showText = true }: LogoProps) => {
  const iconSize = size === 'large' ? 'w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16' : 'w-10 h-10 sm:w-12 sm:h-12';
  const textSize = size === 'large' ? 'text-3xl sm:text-4xl md:text-5xl' : 'text-2xl sm:text-3xl';

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-3 md:gap-4">
      {/* Book Icon */}
      <div className={`${iconSize} flex items-center justify-center`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-full h-full text-white"
        >
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
          <line x1="12" y1="6" x2="12" y2="18" />
        </svg>
      </div>

      {/* DigiLib Text */}
      {showText && (
        <h1 className={`${textSize} font-bold text-white`}>
          DigiLib
        </h1>
      )}
    </div>
  );
};

export default Logo;
