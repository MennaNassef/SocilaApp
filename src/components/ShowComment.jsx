import React, { useContext, useState } from 'react'
import { authContext } from '../contexts/authContext'
import { Input, Button, chip } from '@heroui/react';
import { Link } from 'react-router-dom';
import { apiServices } from '../services/api';

export default function ShowComment({comment ,deleteComment ,postCreatorId ,commentsCount ,children,getPosts}) {
  const {UserData}= useContext(authContext)
  const [isInEditMode,setIsInEditMode]=useState(false)
  const[isUpdating,setIsUpdating]=useState(false)

  const [commentContent,setCommentContent]=useState(comment?.content || "")
  async function updateComment(){
    setIsUpdating(true)
    const formData=new FormData()
    formData.set("content",commentContent)
    
    const response=await apiServices.updateComment(comment?.post,comment?._id,formData)
    await getPosts()
    setIsInEditMode(false)
    setIsUpdating(false)
  }
  return (
  <div className="pt-4">
    <div className="flex gap-3 items-start">
      
      <img
        src={comment?.commentCreator?.photo}
        onError={(e) => (e.target.src = userPhoto)}
        className="w-10 h-10 rounded-full object-cover border"
        alt=""
      />

      <div className="flex-1">
        
        <div className="bg-gray-100 dark:bg-slate-700 rounded-2xl px-4 py-3 shadow-sm">
          <p className="font-semibold text-sm mb-1">
            {comment?.commentCreator?.name}
          </p>

          {isInEditMode ? (
            <div>
              <Input
                size="sm"
                variant="bordered"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => {setIsInEditMode(false);setCommentContent(comment.content)}}
                  className="text-sm text-gray-500 hover:text-black"
                >
                  Cancel
                </button>

                <Button
                  size="sm"
                  color="primary"
                  onPress={updateComment}
                  isLoading={isUpdating}
                >
                  Update
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-800 dark:text-gray-200 wrap-break-word">
              {comment?.content}
            </p>
          )}
        </div>
        <div className="flex gap-4 mt-1 text-xs text-gray-500">
          {UserData?._id === comment?.commentCreator?._id && (
            <button
              onClick={() => setIsInEditMode(true)}
              className="hover:text-blue-500 transition"
            >
              Edit
            </button>
          )}

          {(UserData?._id === comment?.commentCreator?._id ||
            UserData?._id === postCreatorId) && (
            <button
              onClick={() => deleteComment(comment._id)}
              className="hover:text-red-500 transition"
            >
              Delete
            </button>
          )}
        </div>

        {commentsCount > 1 && (
          <div className="mt-2 text-sm text-blue-500 cursor-pointer">
            {children}
          </div>
        )}
      </div>
    </div>
  </div>
)
  // return (
  //   <div className="pt-6 grid" >
  //     <div className="media flex pb-4">
  //       <a className="mr-4" href="#">
  //         <img onError={(e)=>e.target.src =userPhoto} className="rounded-full max-w-none w-12 h-12" src={comment?.commentCreator?.photo} />
  //       </a>
  //       <div className="media-body flex justify-between w-full">
  //         <div>
  //           <a className="inline-block text-base font-bold mr-2" href="#">{comment?.commentCreator?.name}</a>
  //           {
  //             isInEditMode ? comment.content && 
  //             <div className=''>
  //               <Input type="text" value={commentContent}  onChange={(e)=>setCommentContent(e.target.value)}/>
  //               <div className='flex justify-end gap-2 mt-2'>
  //                 <button onClick={()=>setIsInEditMode(false)}>Cancel</button>
  //                 <Button color='primary' onPress={()=>setIsInEditMode(false)}>Update</Button>
  //               </div>
  //             </div>
              
  //             :
  //             <p>{comment?.content}</p>
  //           }
  //         </div>
  //         <div className='flex gap-2'>
  //         {(UserData?._id ==comment?.commentCreator?._id) && <button onClick={()=>setIsInEditMode(true)}> Edit</button>}
  //         {(UserData?._id ==comment?.commentCreator?._id ||UserData?._id ==postCreatorId ) && <button onClick={()=>deleteComment(comment._id) }> Delete</button>}
  //       </div>
  //       </div>
  //     </div>
  //     {commentsCount >1 && <div className="w-full">
  //         {children}
  //       </div>}
  //   </div>
  // )
}
