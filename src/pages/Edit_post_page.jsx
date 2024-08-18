import React,{useState, useEffect} from 'react'
import appwrite_service_obj from '../appwrite/config'
import auth_service_obj from '../appwrite/auth'
import { Post_form, Container } from '../components/index'
import { useParams , useNavigate } from 'react-router-dom'
import { Query } from 'appwrite'

function Edit_post_page() {
    //const [all_current_user_active_posts,set_all_current_user_active_posts ] = useState([])
    //const [current_user_id, set_current_user_id] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()
    const [post,set_post] = useState(null)

    // useEffect(() => {
    //     const current_user = auth_service_obj.get_current_user().then((userdata) => (set_current_user_id(userdata.$id)))
    //     const posts = appwrite_service_obj.get_all_active_posts([Query.and(
    //         Query.equal("owner_id", current_user_id),
    //         Query.equal("status", "active"),   
    //     )
    //     ])
    //     .then((posts) => (set_all_current_user_active_posts(posts.documents)))
    // }, [slug , navigate])   

    useEffect(() => {
        if(slug){
            appwrite_service_obj.get_a_post(slug).then((post) => (
                set_post(post)
            ))
        }
        else{
            navigate('/')
        }
    } , [slug,navigate])


  return post ? (
    <div  className='py-8'  >
        <Container>
           <Post_form post = {post} /> 
        </Container>
    </div>
  ) : null
}

export default Edit_post_page