import React from 'react';

const ReviewCard = ({ review }) => {
    const { title, author, reviewText, rating, user } = review;

    return (
        <div className="border border-gray-300 rounded-lg shadow-md p-4 mb-4 bg-gray-50 hover:shadow-lg transition-shadow duration-200">
            <h2 className="text-2xl font-bold mb-3 text-blue-600">{title}</h2>
            <p className="text-gray-800"><strong>Author:</strong> {author}</p>
            <p className="text-gray-800"><strong>Review:</strong> {reviewText}</p>
            <p className="text-yellow-500 text-lg">{'⭐'.repeat(rating)}</p>
            <p className="text-gray-800"><strong>Reviewed by:</strong> {user.username}</p>
        </div>
    );
};

export default ReviewCard;
