import { type Book, getImageUrl } from '../utils/api';

interface BookCardProps {
    book: Book;
    onClick?: () => void;
}

const BookCard = ({ book, onClick }: BookCardProps) => {
    return (
        <div
            className="flex flex-col w-28 sm:w-32 md:w-40 flex-shrink-0 cursor-pointer group"
            onClick={onClick}
        >
            <div className="w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md mb-2 relative">
                <img
                    src={getImageUrl(book.coverImage)}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
                {book.title}
            </h3>
        </div>
    );
};

export default BookCard;
