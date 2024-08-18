import React, {useCallback, useEffect, useState} from 'react'
import {Button , Input_field , Select, RTE} from '../index'
import { useForm } from 'react-hook-form'
import appwrite_service_obj from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import parse from "html-react-parser";


function Post_form({post}) {
    const [user_id , set_user_id] = useState(null)
    console.log("Post",post);
    const {register, handleSubmit , watch , setValue , control , getValues} = useForm({
        defaultValues: {
            title : post?.title || "", 
            slug : post?.$id || "", 
            content : post?.content || "", 
            status : post?.status || "active", 
        }
    }) 

    console.log("Content value : ", getValues("content"));
    console.log("Def value : ", getValues("content.props.children"));

    const navigate = useNavigate()
    const user_data = useSelector(state => state.auth.user_data)
    console.log("User data", user_data)

    const submit = async(data) => {
        if(post){
            //updating doc
            const uploaded_file = data.featured_image[0] ? await appwrite_service_obj.upload_file(data.featured_image[0]) : null

            if(uploaded_file){
                await appwrite_service_obj.delete_file(post.featured_image)
            }

            const db_post = await appwrite_service_obj.update_post(post.$id , {...data  , featured_image : uploaded_file ? uploaded_file.$id : post.featured_image  })

            navigate(`/post/${db_post?.$id}`)

        }
        else{
            //creating doc
            const uploaded_file = await appwrite_service_obj.upload_file(data.featured_image[0])

            try {
                data.featured_image = uploaded_file.$id
                const db_post = await appwrite_service_obj.create_post({...data, owner_id : user_data.$id, posted_by : user_data.name })
                navigate(`/post/${db_post?.$id}`)
            } catch (error) {
                console.log("Error creating db post : " , error)
                navigate('/')
            }
        }
    }

    const slug_transform = useCallback((value) => {
        if(value && typeof value === 'string'){
            return value.toLowerCase().replace(/\s/g , '-')
        }
        else{
            return ""
        }
    }, [])

    useEffect(() => {                       //any changed field will go into name
        const subscription = watch((value , {name}) => {
            //as soon as title changes, run this, anything in useForm changes, it will be watched and will come into {name}
            if(name === 'title'){
                setValue('slug' , slug_transform(value.title , {shouldValidate : true}))
            }
        }) 

        return () => {
            subscription.unsubscribe()
        }
        
    } , [watch , setValue , slug_transform])

  return (
<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
    <div className="w-full md:w-2/3 px-2 mb-4 md:mb-0">
        <Input_field
            label="Title :"
            placeholder="Title"
            className="mb-4"
            {...register("title", { required: true })}
        />
        <Input_field                        
            label="Slug :"
            placeholder="Slug"
            className="mb-4"
            {...register("slug", { required: true })}
            onInput={(e) => {   
                setValue("slug", slug_transform(e.currentTarget.value), {shouldValidate: true });
            }}
        />
        <RTE 
            name="content" 
            control={control} 
            label="Content :" 
            default_value={ getValues("content") } 
        />
    </div>
    <div className="w-full md:w-1/3 px-2">
        <Input_field
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("featured_image", { required: !post })}
        />
        {post && (
            <div className="w-full mb-4">
                <img
                    src={appwrite_service_obj.get_file_preview(post.featured_image)}
                    alt={post.title}
                    className="rounded-lg w-full h-auto"
                />
            </div>
        )}
        <Select
            options={["active", "inactive"]}
            label="Status"
            className="mb-4"
            {...register("status", { required: true })}
        />
        <Button 
            type="submit" 
            bg_color={post ? "bg-green-500" : undefined} 
            className="w-full"
        >
            {post ? "Update" : "Submit"}
        </Button>
    </div>
</form>

  )
}

export default Post_form