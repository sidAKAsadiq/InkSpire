import conf from "../conf/conf.js";
import { Client , Databases, Storage, Query , ID } from "appwrite";

class Service{
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

    async create_post({title, slug, content, featured_image, status, owner_id}){
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
                   owner_id
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

    async get_all_active_posts(queries = [Query.equal("status" , "active")]){
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
        return this.bucket.getFilePreview(
            conf.appwrite_bucket_id,
            file_id
        )
     }
     
}


const service_obj = new Service()

export default service_obj