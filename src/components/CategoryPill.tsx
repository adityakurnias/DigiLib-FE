interface CategoryPillProps {
    label: string;
    active?: boolean;
    onClick?: () => void;
}

const CategoryPill = ({ label, active = false, onClick }: CategoryPillProps) => {
    return (
        <button
            onClick={onClick}
            className={`
        px-6 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap
        ${active
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-500 text-white hover:bg-emerald-600'
                }
      `}
        >
            {label}
        </button>
    );
};

export default CategoryPill;
