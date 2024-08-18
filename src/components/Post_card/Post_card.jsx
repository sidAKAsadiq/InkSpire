import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appwrite_service_obj from '../../appwrite/config';

function Post_card({ $id, title, featured_image, posted_by, $createdAt }) {
    const [imageUrl, set_imageUrl] = useState(null);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        appwrite_service_obj.get_file_preview(featured_image).then((url) => set_imageUrl(url));
    }, [featured_image]);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    const formattedDate = new Date($createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden">
            <Link to={`/post/${$id}`} className="hover:scale-105 transform transition-all duration-200">
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    {imageUrl ? (
                        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-gray-500">Loading...</div>
                    )}
                </div>
            </Link>
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                {showMore && (
                    <div id="more-text" className="mt-2">
                        <h3 className="text-sm text-gray-600">Posted by: {posted_by}</h3>
                        <h3 className="text-sm text-gray-600">Date: {formattedDate}</h3>
                    </div>
                )}
                <button
                    id="toggle-btn"
                    onClick={toggleShowMore}
                    className="mt-4 text-blue-500 focus:outline-none"
                >
                    {showMore ? 'Hide' : 'Read More'}
                </button>
            </div>
        </div>
    );
}

export default Post_card;
