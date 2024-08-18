import conf from "../conf/conf.js";
import { Client , Account , ID } from "appwrite";

class Auth_service{
    client = new Client()
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwrite_url)
            .setProject(conf.appwrite_project_id)
        this.account = new Account(this.client)
    }

    async create_account ({email, password, name}) {
        try {
            const user_account = await this.account.create(ID.unique(), email, password, name)
            if(user_account){
                return  this.login({email,password})
            }
            else{
                return user_account
            }
        } catch (error) {
            throw error
        }   

    }

    async login ({email , password}){
        try {
             
             return await this.account.createEmailPasswordSession(email, password)  
        } catch (error) {
            throw error
        }


    }

    async get_current_user () {
        try {
            return await this.account.get()    
        } catch (error) {
            console.log("Error in getting current user : ", error)
        }
        return null;
    }

    async logout () {
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Error in logging out current user : ", error)
        }
    }
}

const auth_service_obj = new Auth_service()

export default auth_service_obj