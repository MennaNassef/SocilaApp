import React, { useContext, useState } from 'react'
import commentIcon from "/src/assets/comment-icon.svg"
import userPhoto from "/src/assets/account.png"
import { Link, useNavigate } from 'react-router-dom';
import CreateCommentInput from './CreateCommentInput';
import { apiServices } from '../services/api';
import { authContext } from './../contexts/authContext';
import ShowComment from './ShowComment';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button
} from "@heroui/react";
export default function Post({post,comments ,getPosts}) {

  const creatorId=post?.user?._id
  const {UserData}= useContext(authContext)
  const navigate=useNavigate()
  async function addComment(formData) {
    const response= await apiServices.createComment(post._id ,formData)
    console.log(response);
    
    if(response.success){
      await getPosts()
      
    }
  }
  async function deletePost() {
    const response =await apiServices.deletePost(post._id)
    if(comments){
      console.log("jhh");
      
      navigate("/")
    }
    else{
      getPosts()
    }
  }
  async function deleteComment(commentId) {
    const response =await apiServices.deleteComment(post._id,commentId)
    if(response.success){
      getPosts()
    }
  }

    const [isInEditMode,setIsInEditMode]=useState(false)
    const[isUpdating,setIsUpdating]=useState(false)
  console.log(post);
  
    const [PostContent,setPostContent]=useState(post?.body || "")
const [isMenuOpen, setIsMenuOpen] = useState(false);
  async function updatePost(){
    setIsUpdating(true)
        const formData=new FormData()
        formData.set("body",PostContent)
        const response=await apiServices.updatePost(post?._id,formData)
        await getPosts()
        setIsInEditMode(false)
        setIsUpdating(false)

  }
  const [selectedColor, setSelectedColor] = React.useState("default");
  const DropdownContent =() => (
    <Dropdown>
      <DropdownTrigger>
        <Button
  isIconOnly
  variant="light"
  radius="full"
  className="
    w-9 h-9
    text-gray-400
    hover:text-gray-700
    hover:bg-gray-100
    dark:hover:bg-gray-800
    transition-all duration-200
  "
>
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <circle cx="12" cy="5" r="1.6" />
    <circle cx="12" cy="12" r="1.6" />
    <circle cx="12" cy="19" r="1.6" />
  </svg>
</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dropdown Variants" color={selectedColor} variant={"solid"}>
        <DropdownItem key="edit" onPress={() => setIsInEditMode(true)}>Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" onPress={deletePost} color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
  return (
    <article className="mb-4 break-inside p-6 rounded-xl bg-gray-100 shadow dark:bg-slate-800 flex flex-col bg-clip-border w-full">
        
        <div className="flex pb-6 items-center justify-between">
          <div className="flex">
            <a className="inline-block mr-4" href="#">
              <img className="rounded-full max-w-none w-12 h-12 object-cover" src={post.user?.photo} onError={(e)=>e.target.src =userPhoto}/>
            </a>
            <div className="flex flex-col">
              <div>
                <a className="inline-block text-lg font-bold dark:text-white" href="#">{post.user?.name}</a>
              </div>
              <div className="text-slate-500 dark:text-slate-300">
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          {/* {creatorId==UserData?._id && <button onClick={() => setIsInEditMode(true)} className='text-black'>Edit</button>}
          {creatorId==UserData?._id && <button onClick={deletePost} className='text-black'>Delete</button>} */}
          {creatorId == UserData?._id && (
            <DropdownContent color={selectedColor} variant={"solid"} />
          )}
        </div>


        {post.body&& 
        isInEditMode ? (
          <div>
            <textarea name=""
              value={PostContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind"
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
              rows="3"></textarea>
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => {setIsInEditMode(false);setPostContent(post.body)}}
                className="text-sm text-gray-500 hover:text-black"
              >
                Cancel
              </button>

              <Button
                size="sm"
                color="primary"
                onPress={updatePost}
                isLoading={isUpdating}
              >
                Update
              </Button>
            </div>
        </div>
          ):(
          <h2 className="text-xl font-medium dark:text-white break-all">
            {post.body}
          </h2>)
        }
        {post.image&&<div className="py-4 m-auto">
          <img className="max-w-full rounded-bl-lg" src={post.image} />
        </div>}

        
        <div className="py-4 flex gap-4">
          <span className="inline-flex items-center">
            <span className="mr-2">
              <svg className="fill-rose-600 dark:fill-rose-400" style={{width: 24, height: 24}} viewBox="0 0 24 24">
                <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z">
                </path>
              </svg>
            </span>
            <span className="text-lg font-bold">{post.likesCount}</span>
          </span>
          <span className="inline-flex items-center" >
            <span className="mr-2">
              <img src={commentIcon} alt="" className="w-5 "/>
            </span>
            <span className="text-lg font-bold">{post.commentsCount}</span>
          </span>
          
        </div>
  
        <CreateCommentInput addComment={addComment}/>
        
        {comments?comments.map((comment)=><ShowComment comment={comment} deleteComment={deleteComment} postCreatorId={post.user._id} getPosts={getPosts}/>)
          :
          post.topComment && post.topComment&&
          <ShowComment comment={post.topComment} deleteComment={deleteComment} postCreatorId={post.user._id} commentsCount={post.commentsCount} getPosts={getPosts}>
            <Link to={"/posts/" +post._id} className="py-3 px-4 w-full block bg-slate-300 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75">
              Show more comments
              </Link>
          </ShowComment>
        }
        
          
      </article>
  )
}
