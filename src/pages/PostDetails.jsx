
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { authContext } from '../contexts/authContext'
import Post from './../components/Post';
import { apiServices } from '../services/api'
import LoadingScreen from './../components/LoadingScreen';

export default function PostDetails() {
  const {userToken} =useContext(authContext)
  let {postId}=useParams()
  const [post ,setPost] =useState(null)
  const [comments ,setComments] =useState(null)

  async function getPostDetails() {
    const data= await apiServices.getPostDetails(postId)
    setComments(data.data.comments)
  }

  async function getPostById() {
    const  data  = await apiServices.getPostById(postId)
    setPost(data.data.post)
  }
  // async function deletePost() {
  //     const response =await apiServices.deletePost(post._id)
  //     if(response.success){
  //       getPostDetailsAndComment()
  //     }
  //   }

  useEffect(()=>{
    getPostDetailsAndComment()
    
  },[])
  function getPostDetailsAndComment(){
        getPostDetails()
        getPostById()
  }
  return (
    
    <div className="max-w-2xl mx-auto py-10">

      {post ==null ?<LoadingScreen/>:
        <Post post={post} comments={comments} getPosts={getPostDetailsAndComment} />
      }
    </div>
    
  )
}
