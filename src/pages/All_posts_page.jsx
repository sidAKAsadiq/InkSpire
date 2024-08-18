import React, { useState, useEffect } from 'react';
import appwrite_service_obj from '../appwrite/config';
import { Container, Post_card } from '../components/index';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';
import Pagination from '../components/Pagination';


function All_posts_page() {
    const [all_posts, set_all_posts] = useState([]);
    const [posts_per_page , set_posts_per_page] = useState(8)
    const [current_page , set_current_page] = useState(1)

    useEffect(() => {
        appwrite_service_obj.get_all_active_posts().then((posts) => set_all_posts(posts.documents));
    }, []);

    
    let searched_posts = useSelector(state => state.search.searched_docs)
    let search_loader = useSelector(state => state.search.search_loader)
    console.log(searched_posts);

    //Pagination working
    let index_of_last_post_of_current_page = posts_per_page * current_page
    let index_of_first_post_of_current_page = index_of_last_post_of_current_page - posts_per_page
    let paginated_posts = all_posts?.slice(index_of_first_post_of_current_page , index_of_last_post_of_current_page)
    console.log(paginated_posts);
    console.log(index_of_last_post_of_current_page);
    console.log(index_of_first_post_of_current_page);
    console.log(current_page);


    const paginate = (each_page_number) => {
        console.log("epn",each_page_number);
        set_current_page(each_page_number)
    }
    
    
    return (
        <div className="min-h-screen py-8 bg-gray-50">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">All Posts</h1>
                    <p className="text-gray-600 mt-4">Discover all the posts shared by the community.</p>
                </div>

            {search_loader ? <Loader/> : null}
                        

             {searched_posts.length !== 0 ?
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {searched_posts.map((each_post) => (
                        <Post_card {...each_post} key={each_post.$id} />
                    ))}
                </div>                 
                 :(
                     paginated_posts.length === 0 ? (
                    <Loader/>
                    // <div className="w-full text-center">
                    //     <h2 className="text-2xl font-semibold text-gray-500">No posts yet!</h2>
                    // </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {paginated_posts.map((each_post) => (
                            <Post_card {...each_post} key={each_post.$id} />
                        ))}
                    </div>
                ))}
                <Pagination total_num_of_posts={all_posts.length} posts_per_page = {posts_per_page} paginate = {paginate} />
            </Container>
            {search_loader = []}
        </div>
    );
}

export default All_posts_page;
