import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import ReviewCard from '../../components/ReviewCard/ReviewCard';

const HomePage = () => {
    const [reviews, setReviews] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/reviews/paginate?page=${page}&limit=3`);
            setReviews(response.data.reviews);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Failed to fetch reviews:', error.message);
        }
    }, [page]);

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/api/reviews/search?query=${searchQuery}`);
            setReviews(response.data);
        } catch (error) {
            console.error('Failed to search reviews:', error.message);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews, page]);

    return (
        <div className="max-w-screen-xl mx-auto p-4">
            <h1 className="text-3xl font-extrabold mb-6 text-blue-600">Homepage</h1>
            <form onSubmit={handleSearch} className="mb-4">
<input
    type="text"
    placeholder="Search by title or author"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="border border-blue-500 p-3 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
/>

                <button type="submit" className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-lg transition duration-200">
                    Search
                </button>
            </form>
            <div>
                {reviews.length > 0 ? (
                    reviews.map(review => (
                        <ReviewCard key={review._id} review={review} />
                    ))
                ) : (
                    <p className="text-gray-500">No reviews found.</p>
                )}
                <div className="flex justify-between mt-4">
<button
    disabled={page <= 1}
    onClick={() => setPage(page - 1)}
    className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-3 px-5 rounded-lg transition duration-200"
>

                        Previous
                    </button>
<button
    disabled={page >= totalPages}
    onClick={() => setPage(page + 1)}
    className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-5 rounded-lg transition duration-200"
>

                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
