import conf from "../conf/conf.js";
import { Client , Databases, Storage, Query , ID } from "appwrite";
import auth_service_obj from "./auth.js";

export class Service{
    client = new Client();
    databases;
    bucket; //also called storage

    constructor(){
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    //CRUD operation on articles!

    async create_post({title, slug, content, featured_image, status, owner_id, posted_by}){
        try {
            return await this.databases.createDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,   //treating slug as id, can also be done by ID.unique()
                {
                   title,
                   content,
                   featured_image,
                   status,
                   owner_id,
                   posted_by,
                }
            )
        } catch (error) {
            console.log("Error in creating post : ", error)
        }
    }

    async update_post(slug, {title, content, featured_image, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug,
                {
                   title,
                   content,
                   featured_image,
                   status,
                }
            )
        } catch (error) {
            console.log("Error in updating post : ", error)
        }
    }

    async delete_post(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                slug
            )
            return true
        } catch (error) {
            console.log("Error in deleting post : ", error)
            return false
        }
    }

    async get_a_post(slug){
        try {
           return await this.databases.getDocument(
               conf.appwrite_database_id,
               conf.appwrite_collection_id,
               slug
           )
       } catch (error) {
           console.log("Error in getting a post : ", error)
           return false
       }        
    }

    async get_all_active_posts(queries = [Query.equal("status" , "active"), Query.orderDesc("$updatedAt")]){
        try {
            return await this.databases.listDocuments(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                queries
            )
        } catch (error) {
            console.log("Error in getting all active posts : ", error)
            return false
        }        
     }

     async get_searched_posts(search_value){
        console.log("in get search val : ", search_value)
        try {
            const result =  await this.databases.listDocuments(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                [
                    Query.equal("status" , "active"),
                    Query.or([
                        Query.contains("title" , search_value),
                        Query.contains("content" , search_value),
                    ]),
                    Query.orderDesc("$updatedAt")   
                ]
            )    
            console.log(result);
            return result        
        } catch (error) {
            console.log("Error in getting searched posts : ", error)
            return false            
        }
     }

     async get_current_user_posts(){
         const current_user = await auth_service_obj.get_current_user()
         console.log("in here : " , current_user.$id);
        try {
            const result = await this.databases.listDocuments(
                conf.appwrite_database_id,
                conf.appwrite_collection_id,
                [
                    Query.equal("owner_id" , current_user.$id),
                    Query.orderDesc("$updatedAt"),
                ]
            )
            console.log(result);
            return result
        } catch (error) {
            console.log("Error in getting current user posts : ", error)
            return false               
        }

     }

     //File upload services - later to be included in sepearte file
     async upload_file(file){
        try {
            return await this.bucket.createFile(
                conf.appwrite_bucket_id,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log("Error in uploading file : ", error)
            return false            
        }
     }
    
     async delete_file(file_id){
        try {
             await this.bucket.deleteFile(
                conf.appwrite_bucket_id,
                file_id
            )
            return true
        } catch (error) {
            console.log("Error in deleting file : ", error)
            return false            
        }
     }

     async get_file_preview(file_id){
        console.log("In file preview!");
        const filePreviewUrl = await this.bucket.getFilePreview(conf.appwrite_bucket_id, file_id);
        console.log("PIC URL: ", filePreviewUrl.toString());
    
        return filePreviewUrl.toString();
     }
     
}


const service_obj = new Service()

export default service_obj