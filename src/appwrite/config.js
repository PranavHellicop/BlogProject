import conf from "../conf/conf"
import { Client, Databases, Storage, Query, ID } from "appwrite"


class DbStore{
    client = new Client();
    databases
    storage

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({slug,userId,featuredImage,status,title,content}){
        try {
            
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,           //postID
                {
                    userId,
                    featuredImage,
                    status,
                    title,
                    content
                }
            )
        } catch (error) {
                console.log("appwrite>>config>>CREATE POST ERROR:",error);
        }   
    }

    async updatePost(slug,{featuredImage,status,title,content}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,                                     //slug here is documentId
                {
                    
                    featuredImage,
                    status,
                    title,
                    content
                }
            )
        } catch (error) {
            console.log("appwrite>>config>>UPDATE POST ERROR:",error);
            
        }
    }

    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite>>config>>DELETE POST ERROR:",error);
            
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("appwrite>>config>>GET POST ERROR:",error);
            
        }
    }

    async getAllPosts(queries= [Query.equal("status","active")]){
        try{
        return await this.databases.listDocuments(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        )
        }catch(error){
            console.log("appwrite>>config>>GET ALL POSTS ERROR:",error);

        }
    
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),                                   //FeaturedImage
                file
            )
        } catch (error) {
            console.log("appwrite>>config>>UPLOAD FILE ERROR:",error);
            
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite>>config>>DELETE FILE ERROR:",error);
            
        }
    }

    getFilePreview(fileId){
        try{

            return this.storage.getFilePreview(
                conf.appwriteBucketId,
                fileId
                )
        }catch(error){
            console.log("appwrite>>config>>GET FILE PREVIEW ERROR:",error);

        }
        
    }

    getUploadedFile(fileId){
        try {
            return this.storage.getFileView(
                conf.appwriteBucketId,
                fileId
                )
            
        } catch (error) {
            console.log("appwrite>>config>>GET FILE ERROR:",error);

        }
    }
}


const dbStore = new DbStore()

export default dbStore