import React, {useCallback, useEffect} from 'react'
import {Button , Input_field , Select, RTE} from '../index'
import { useForm } from 'react-hook-form'
import appwrite_service_obj from '../../appwrite/config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Post_form({post}) {
    const {register, handleSubmit , watch , setValue , control , getValues} = useForm({
        defaultValues: {
            title : post?.title || "", 
            slug : post?.slug || "", 
            content : post?.content || "", 
            status : post?.status || "active", 
        }
    }) 

    const navigate = useNavigate()
    const user_data = useSelector(state => state.user_data)

    const submit = async(data) => {
        if(post){
            //updating doc
            const uploaded_file = data.image[0] ? await appwrite_service_obj.upload_file(data.image[0]) : null

            if(uploaded_file){
                await appwrite_service_obj.delete_file(post.featured_image)
            }

            const db_post = await appwrite_service_obj.update_post(post.$id , {...data  , featured_image : uploaded_file ? uploaded_file.$id : post.featured_image  })

            navigate(`/post/${db_post.$id}`)

        }
        else{
            //creating doc
            const uploaded_file = data.image[0] ? await appwrite_service_obj.upload_file(data.image[0])  : null

            try {
                data.featured_image = uploaded_file.$id
                const db_post = await appwrite_service_obj.create_post({...data, owner_id : user_data.$id })
            } catch (error) {
                console.log("Error creating db post : " , error)
                navigate('/')
            }
            navigate(`/post/${db_post.$id}`)
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
            <div className="w-2/3 px-2">
                <Input_field
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
            {/* I think SLUG value should be auto-generated as we enter the  title i.e. we call slug transform on onInput in title field and use value = slug in slug's input field */}
                <Input_field                        
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {   //to handle case if user tries to type in input field
                        setValue("slug", slug_transform(e.currentTarget.value), {shouldValidate: true });
                    }}
                />
                <RTE 
                name="content" 
                control={control} 
                label="Content :" 
                defaultValue={ getValues("content") } />
            </div>
            <div className="w-1/3 px-2">
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
                            className="rounded-lg"
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
                bgColor={post ? "bg-green-500" : undefined} className="w-full">

                    {post ? "Update" : "Submit"}
 
                </Button>
            </div>
        </form>
  )
}

export default Post_form