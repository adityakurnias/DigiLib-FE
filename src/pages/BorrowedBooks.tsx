import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getSelfBorrowed,
    getBookDetail,
    getImageUrl,
    returnBorrow,
    type BorrowItem,
    type Book
} from "../utils/api";
import SearchBar from "../components/SearchBar";

const BorrowedBooks = () => {
    const navigate = useNavigate();
    const [borrowed, setBorrowed] = useState<(BorrowItem & { book?: Book })[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    const [confirmPopup, setConfirmPopup] = useState<{
        borrowId: number | null;
        title: string | null;
    }>({
        borrowId: null,
        title: null
    });

    const [returning, setReturning] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const res = await getSelfBorrowed();

                const withBooks = await Promise.all(
                    res.data.map(async (i) => {
                        const detail = await getBookDetail(i.bookId);
                        return {
                            ...i,
                            book: detail.success ? detail.data : undefined,
                        };
                    })
                );

                setBorrowed(withBooks);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const filtered = borrowed.filter((item) =>
        item.book?.title.toLowerCase().includes(search.toLowerCase())
    );

    const handleReturn = async () => {
        if (!confirmPopup.borrowId) return;

        try {
            setReturning(true);
            await returnBorrow(confirmPopup.borrowId);

            // refresh list di memory
            setBorrowed((prev) =>
                prev.map((i) =>
                    i.id === confirmPopup.borrowId
                        ? { ...i, status: "returned", returnDate: new Date().toISOString() }
                        : i
                )
            );
        } catch (e) {
            console.error(e);
        } finally {
            setReturning(false);
            setConfirmPopup({ borrowId: null, title: null });
        }
    };

    return (
        <div className="min-h-screen bg-white pb-20">

            {/* HEADER */}
            <div className="bg-emerald-600 rounded-b-2xl px-4 pt-6 pb-6 sm:px-6 md:px-8">
                <div className="max-w-4xl mx-auto">
                    <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />

                    {/* POPUP KONFIRMASI */}
                    {confirmPopup.borrowId && (
                        <div className="mt-3 bg-white shadow-lg p-4 rounded-xl border border-emerald-200">
                            <p className="text-gray-800 text-sm">
                                Kembalikan buku: <b>{confirmPopup.title}</b>?
                            </p>

                            <div className="flex justify-end gap-3 mt-3">
                                <button
                                    className="px-4 py-1 text-sm bg-gray-200 rounded-lg"
                                    onClick={() =>
                                        setConfirmPopup({ borrowId: null, title: null })
                                    }
                                >
                                    Batal
                                </button>

                                <button
                                    className="px-4 py-1 text-sm bg-emerald-600 text-white rounded-lg"
                                    onClick={handleReturn}
                                    disabled={returning}
                                >
                                    {returning ? "Processing..." : "Return"}
                                </button>
                            </div>
                        </div>
                    )}

                    <h1 className="text-3xl font-bold text-white mt-6">Borrowed Books</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 mt-10 sm:px-6 md:px-8">

                {loading && (
                    <div className="text-center text-gray-500 py-20">Loading...</div>
                )}

                {!loading && filtered.length === 0 && (
                    <div className="text-center text-gray-500 py-20">
                        Tidak ada buku dipinjam
                    </div>
                )}

                <div className="space-y-4">
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 items-center p-3 rounded-xl border 
                            border-emerald-100 hover:bg-emerald-50 transition"
                        >
                            {/* COVER */}
                            <div
                                className="w-16 h-24 rounded overflow-hidden bg-gray-200 cursor-pointer"
                                onClick={() => navigate(`/book/${item.bookId}`)}
                            >
                                <img
                                    src={getImageUrl(item.book?.coverImage ?? "")}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* INFO */}
                            <div className="flex-1 cursor-pointer" onClick={() => navigate(`/book/${item.bookId}`)}>
                                <h3 className="text-gray-900 font-semibold text-lg">
                                    {item.book?.title}
                                </h3>

                                <p className="text-gray-600 text-sm">
                                    Borrowed:{" "}
                                    {new Date(item.createdAt).toLocaleDateString("id-ID", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </p>

                                <span
                                    className={`mt-2 inline-block text-xs px-3 py-1 rounded-md ${item.status === "pending"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : item.status === "borrowed"
                                            ? "bg-emerald-100 text-emerald-700"
                                            : item.status === "returned"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {item.status.toUpperCase()}
                                </span>
                            </div>

                            {item.status === "borrowed" && (
                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
                                    onClick={() =>
                                        setConfirmPopup({
                                            borrowId: item.id,
                                            title: item.book?.title ?? "",
                                        })
                                    }
                                >
                                    Return
                                </button>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default BorrowedBooks;
