import conf from "../conf//conf"
import { Client,Account, ID} from "appwrite"

class UserAuth{
    client = new Client();  
    account;              //these are class properties, initialised after instance
                        // is created but before constructor runs

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)      
        this.account = new Account(this.client)
    }

    async signup({email, password,name}){
        try {
            
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            )
            if (userAccount){
                return this.login({email,password})
            }

        } catch (error) {
            console.log("-------appwrite>>auth>> signUp:------ ",error);
        }
    }

    async login({email,password}){
        try {
            return await this.account.createEmailSession(
                email,
                password
            )
            
        } catch (error) {
            console.log("-------appwrite>>auth>> login:------ ",error);
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("-------appwrite>>auth>> getCurrentUser:------ ",error);
            
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("-------appwrite>>auth>> logout:------ ",error);
            
        }
    }

}



const userAuth = new UserAuth()

export default userAuth