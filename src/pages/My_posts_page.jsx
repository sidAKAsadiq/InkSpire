import React, { useEffect, useState } from 'react'
import appwrite_service_obj from '../appwrite/config'
import { Link } from 'react-router-dom';
import { Post_card } from '../components';
import {Container} from '../components';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { add_to_searched_docs } from '../store/search_slice';


function My_posts_page() {
    const [current_user_posts,set_current_user_posts] = useState([])
    const [loading_state , set_loading_state] = useState(true)

    console.log("Lodings satat", loading_state);
    
    const dispatch = useDispatch()

    //let current_user_posts = [];
    useEffect(() => {
         set_loading_state(true)
         appwrite_service_obj.get_current_user_posts()
         .then((posts) =>{ set_current_user_posts(posts.documents)
             set_loading_state(false) }) 
         console.log("Curr",current_user_posts);
        } , [])
        
        const searched_posts = useSelector(state => state.search.searched_docs)
        const search_loader = useSelector(state => state.search.search_loader)        


  return (
    <>
      <div className="min-h-screen py-8 bg-gray-50">
            <Container>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-800">My Posts</h1>
                    <p className="text-gray-600 mt-4">See your activity</p>
                </div>

                {loading_state ? <Loader/> : null}

                {search_loader ? <Loader/> : null}
                        
                        {searched_posts.length !== 0 ?
                               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                               {searched_posts.map((each_post) => (
                                   <Post_card {...each_post} posted_by="" key={each_post.$id} />
                               ))}
                           </div>                 
                            :(
                           current_user_posts.length === 0 ? (
                           <div className=" relative bottom-10 min-h-screen flex flex-col justify-center items-center bg-gray-50">
                                     <h2 className="text-2xl font-bold text-gray-800 mb-4">
                                            No posts found
                                    </h2>
                                    <Link
                                        to='/add-post'
                                        className='text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-6 py-2 rounded-lg shadow-md'
                                    >
                                        Add your first article!
                                    </Link>
                                </div>
                           ) : (
                               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                   {current_user_posts.map((each_post) => (
                                       <Post_card {...each_post} key={each_post.$id} />
                                   ))}
                               </div>
                           ))}
                       </Container>
        </div>    
    </>
  )
}

export default My_posts_page