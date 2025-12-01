import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBooksByCategory, getImageUrl, type Book, type Category } from '../utils/api';
import SearchBar from '../components/SearchBar';

const CategoryBooks = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [books, setBooks] = useState<Book[]>([]);
    const [category, setCategory] = useState<Category | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryBooks = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await getBooksByCategory(Number(id));
                if (response.success) {
                    setBooks(response.data);
                    setCategory(response.category);
                }
            } catch (error) {
                console.error('Failed to fetch category books:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryBooks();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!category) {
        return <div className="min-h-screen flex items-center justify-center">Category not found</div>;
    }

    return (
        <div className="min-h-screen bg-white pb-20">
            {/* Green Header Background */}
            <div className="bg-emerald-600 rounded-b-[2.5rem] px-4 pt-6 pb-12 sm:px-6 md:px-8 relative z-0">
                <div className="max-w-4xl mx-auto">
                    {/* Search Bar */}
                    <div className="mb-8">
                        <SearchBar />
                    </div>

                    {/* Category Info */}
                    <div className="text-white text-center mb-8">
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{category.name}</h1>
                        <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
                            {category.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-10 relative z-10">
                {/* Books Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
                    {books.length > 0 ? (
                        books.map((book) => (
                            <div
                                key={book.id}
                                className="flex flex-col cursor-pointer group"
                                onClick={() => navigate(`/book/${book.id}`)}
                            >
                                <div className="w-full aspect-[2/3] rounded-lg overflow-hidden shadow-md mb-3 relative bg-gray-100">
                                    <img
                                        src={getImageUrl(book.coverImage)}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight mb-1">
                                    {book.title}
                                </h3>
                                <p className="text-xs text-gray-500">{book.author}</p>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500">
                            No books found in this category.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryBooks;
