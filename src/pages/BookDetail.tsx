import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookDetail, getImageUrl, type Book } from '../utils/api';
import SearchBar from '../components/SearchBar';
import Button from '../components/Button';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) return;
            try {
                const response = await getBookDetail(Number(id));
                if (response.success) {
                    setBook(response.data);
                }
            } catch (error) {
                console.error('Failed to fetch book detail:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!book) {
        return <div className="min-h-screen flex items-center justify-center">Book not found</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Green Header Background - Full height for this page style */}
            <div className="bg-emerald-600 min-h-[60vh] rounded-b-[2.5rem] px-4 pt-6 pb-12 sm:px-6 md:px-8 relative">
                <div className="max-w-4xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <SearchBar />
                    </div>

                    {/* Hero Section */}
                    <div className="flex flex-col sm:flex-row gap-8 items-start mb-8">
                        {/* Book Cover */}
                        <div className="w-40 sm:w-48 md:w-56 flex-shrink-0 rounded-lg overflow-hidden shadow-lg mx-auto sm:mx-0">
                            <img
                                src={getImageUrl(book.coverImage)}
                                alt={book.title}
                                className="w-full h-auto object-cover aspect-[2/3]"
                            />
                        </div>

                        {/* Book Info */}
                        <div className="flex-1 text-white w-full">
                            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-center sm:text-left">{book.title}</h1>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-8">
                                <span className="bg-emerald-500/50 px-3 py-1 rounded-md text-sm font-medium">
                                    {book.categoryName}
                                </span>
                                <span className="bg-emerald-500/50 px-3 py-1 rounded-md text-sm font-medium">
                                    {book.year}
                                </span>
                                <span className="bg-emerald-500/50 px-3 py-1 rounded-md text-sm font-medium">
                                    Stock: {book.available}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    className="bg-emerald-500 hover:bg-emerald-400 text-white w-full"
                                >
                                    Read
                                </Button>
                                <div className="flex gap-3">
                                    <Button
                                        className="bg-emerald-500 hover:bg-emerald-400 text-white flex-1"
                                    >
                                        Add to List
                                    </Button>
                                    <Button
                                        className="bg-emerald-800/50 hover:bg-emerald-800/70 text-white flex-1"
                                    >
                                        Borrow
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="text-white">
                        <p className="text-sm sm:text-base leading-relaxed">
                            {book.description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;
