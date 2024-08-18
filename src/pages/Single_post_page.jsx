import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwrite_service_obj from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Single_post_page() {
    const [post, set_post] = useState(null);
    const [imageUrl, set_imageUrl] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwrite_service_obj.get_a_post(slug).then((post) => {
                if (post) { 
                    set_post(post);
                } else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const formattedDate = new Date(post?.$createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const user_data = useSelector((state) => state.auth.user_data);
    const is_author = post && user_data ? post.owner_id === user_data.$id : false;

    const delete_post = () => {
        appwrite_service_obj.delete_post(post.$id).then((status) => {
            if (status) {
                appwrite_service_obj.delete_file(post.featured_image);
                navigate("/");
            }
        });
    };

    useEffect(() => {
        if (post?.featured_image) {
            appwrite_service_obj.get_file_preview(post.featured_image)
                .then((url) => set_imageUrl(url));
        }
    }, [post]);

    return post ? (
        <div className="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16">
            <div 
                className="bg-cover bg-center text-center overflow-hidden outline-double relative h-64 sm:h-96 md:h-128"
                style={{ backgroundImage: `url(${imageUrl})` }}
                title="Post background image"
            >
                {is_author && (
                    <div className="absolute right-4 top-4 flex space-x-2">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bg_color="bg-green-500">
                                Edit
                            </Button>
                        </Link>
                        <Button bg_color="bg-red-500" onClick={delete_post}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="max-w-3xl mx-auto">
                <div className="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal shadow-lg">
                    <div className="bg-white p-5 sm:p-10 relative -mt-16">
                        <div className="text-gray-600 text-sm mb-4">
                            <span className="block">Posted by: <span className="font-medium text-gray-800">{post.posted_by}</span></span>
                            <span className="block">Date: <span className="font-medium text-gray-800">{formattedDate}</span></span>
                        </div>
                        <h1 className="text-gray-900 font-bold text-2xl sm:text-3xl mb-2">{post.title}</h1>
                        <p className="text-base leading-8 my-5">
                            {parse(post.content)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
