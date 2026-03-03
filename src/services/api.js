import axios from 'axios';

class ApiServices{
    token =localStorage.getItem("token")
    
    setToken(token){
        this.token=token
    }
    async signIn(loginData){
        const {data }=await axios.post(import.meta.env.VITE_BASE_URL +"/users/signin",loginData) 
        return data
    }
    async signUn(registerData){
        const {data }=await axios.post(import.meta.env.VITE_BASE_URL +"/users/signup",registerData)
        return data
    }
    async getPosts(){
        const {data} =await axios.get(import.meta.env.VITE_BASE_URL +"/posts",{
        headers:{
            Authorization: `Bearer ${this.token}`
        }
        })
        return data
    }
    async getPostDetails(postId){
        const {data}= await axios.get(import.meta.env.VITE_BASE_URL+`/posts/${postId}/comments?page=1&limit=10` ,{
        headers:{
            Authorization: `Bearer ${this.token}`
        }
        })
        return data
    }
    async getPostById(postId){
        const { data } = await axios.get(import.meta.env.VITE_BASE_URL +`/posts/${postId}`,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async getLoggedUserData(){
        const { data } = await axios.get(import.meta.env.VITE_BASE_URL +"/users/profile-data",
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }

    async createPost(formData){
        const { data } = await axios.post(import.meta.env.VITE_BASE_URL +"/posts",formData,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async createComment(postId,formData){
        const { data } = await axios.post(import.meta.env.VITE_BASE_URL +"/posts/" +postId + "/comments",formData,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async deletePost(postId){
        const { data } = await axios.delete(import.meta.env.VITE_BASE_URL +`/posts/${postId}`,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async deleteComment(postId,commentId){
        const { data } = await axios.delete(import.meta.env.VITE_BASE_URL +`/posts/${postId}` +"/comments/"+commentId,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async updateComment(postId,commentId ,formData){
        const { data } = await axios.put(import.meta.env.VITE_BASE_URL +`/posts/${postId}` +"/comments/"+commentId,formData,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async updatePost(postId ,formData){
        const { data } = await axios.put(import.meta.env.VITE_BASE_URL +`/posts/${postId}`,formData,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async updatePassword(registerData){
        const { data } = await axios.patch(import.meta.env.VITE_BASE_URL +`/users/change-password` ,registerData,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    async uploadProfileImage(formData){
        const { data } = await axios.put(import.meta.env.VITE_BASE_URL +`/users/upload-photo` ,formData,
        {
            headers: {
            Authorization: `Bearer ${this.token}`
            }
        })
        return data
    }
    
}

export const apiServices =new ApiServices()