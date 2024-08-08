import React from 'react'
import service_obj from '../../appwrite/config'
import {Link} from 'react-router-dom'

function Post_card({
        $id,
        title,
        featured_image
}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'   >
                <img src={service_obj.get_file_preview(featured_image)} alt={title} />
            </div>
                <h2 className='text-xl font-bold '  >{title}</h2>
        </div>
    </Link>
)
}

export default Post_card