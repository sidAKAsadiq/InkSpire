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

    async create_account ({name, email, password}) {
        try {
            const user_account = await this.account.create(ID.unique(), name, email, password)
        } catch (error) {
            throw error
        }

        if(!user_account){
            return user_account
        } 
        //now call another acc!
        this.login({email,password})

    }

    async login ({email , password}){
        try {
            const user_login  = await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error
        }

        return user_login

    }

    async get_current_user () {
        try {
            await this.account.get()    
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