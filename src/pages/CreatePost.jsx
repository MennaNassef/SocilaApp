
import React, { useState } from 'react'
import { apiServices } from '../services/api'
import { Spinner } from '@heroui/react';

export default function CreatePost({getPosts}) {
  const [caption ,setCaption] =useState("")
  const [image ,setImage]=useState(null)
  const [imagePreview ,setImagePreview]=useState(null)
  const [loading ,setLoading]=useState(false)
  const [showForm ,setShowForm]=useState(false)


  const handleImageChange =(e)=>{
    if(e.target.files[0]){
      setImage(e.target.files[0])
      const imgSrc=URL.createObjectURL(e.target.files[0])
      setImagePreview(imgSrc)
    }

  }
  function removeImage(){
    setImagePreview(null)
    setImage(null)
    document.getElementById("imageInput").value=null
  }
  async function handleSubmit(e){
    e.preventDefault()
    setLoading(true)
    const formData=new FormData()
    if(caption){
      formData.set("body",caption)
    }
    if(image){
      formData.set("image",image)
    }
    const response=await apiServices.createPost(formData)
    if(response.success){
      removeImage()
      setCaption("")
      setShowForm(false)
      getPosts()
    }
    setLoading(false)
  }
  
  
  return(
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      {
        !showForm ?(
          <button onClick={()=>setShowForm(true)}
          className='w-full text-left text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg px-3 py-3 transition duration-200'>
            What's on your mind ? share a post....
          </button>
        ):(
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <textarea name="" value={caption}
                onChange={(e)=>setCaption(e.target.value)} 
                placeholder="What's on your mind"
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                rows="3"></textarea>
            </div>
            {
              imagePreview &&(
                <div className="relative">
                  <img src={imagePreview} alt="Preview" 
                    className='w-full max-h-64 object-cover rounded-lg'/>
                    <button type='button'
                      onClick={removeImage} className='absolute top-2 right-2 text-white rounded-full p-2'>
                        <svg width={24} height={24} viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" data-iconid="{342916}" data-svgname="X circle">
                          <polygon fill="var(--ci-primary-color, #ffff)" points="348.071 141.302 260.308 229.065 172.545 141.302 149.917 163.929 237.681 251.692 149.917 339.456 172.545 362.083 260.308 274.32 348.071 362.083 370.699 339.456 282.935 251.692 370.699 163.929 348.071 141.302" classname="ci-primary" />
                          <path fill="var(--ci-primary-color, #000000)" d="M425.706,86.294A240,240,0,0,0,86.294,425.706,240,240,0,0,0,425.706,86.294ZM256,464C141.309,464,48,370.691,48,256S141.309,48,256,48s208,93.309,208,208S370.691,464,256,464Z" classname="ci-primary" />
                        </svg>

<span></span>
                    </button>
                </div>
              )
            }
            

            {
              <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-3'>
                  <label htmlFor="imageInput" className='cursor-pointer text-gray-600 hover:text-blue-600 transition duration-200'>
                    <input type="file" accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                    disabled={loading}
                    id="imageInput"/>

                    <div className="flex items-center space-x-2">
                      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-iconid={505400} data-svgname="Image 1">
                        <path d="M4.02693 18.329C4.18385 19.277 5.0075 20 6 20H18C19.1046 20 20 19.1046 20 18V14.1901M4.02693 18.329C4.00922 18.222 4 18.1121 4 18V6C4 4.89543 4.89543 4 6 4H18C19.1046 4 20 4.89543 20 6V14.1901M4.02693 18.329L7.84762 14.5083C8.52765 13.9133 9.52219 13.8482 10.274 14.3494L10.7832 14.6888C11.5078 15.1719 12.4619 15.1305 13.142 14.5865L15.7901 12.4679C16.4651 11.9279 17.4053 11.8856 18.1228 12.3484C18.2023 12.3997 18.2731 12.4632 18.34 12.5302L20 14.1901M11 9C11 10.1046 10.1046 11 9 11C7.89543 11 7 10.1046 7 9C7 7.89543 7.89543 7 9 7C10.1046 7 11 7.89543 11 9Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>

                      <span className='text-sm font-medium'>
                        Photo
                      </span>
                    </div>
                  </label>
                </div>

                <div className='flex items-center space-x-2'>
                  <button type='button' onClick={()=>setShowForm(false)}
                  disabled={loading}
                  className='px-4 py-2 text-gray-600 hover:text-gray-800 transition duration-200 disabled-opacity-50'>
                    Cancel
                  </button>

                  <button type='submit' disabled={loading ||(!caption.trim() && !image)}
                  className='bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled-opacity-50 duration-200'>
                    {
                      loading ?(
                        <span className='flex items-center space-x-2'>
                          <Spinner classNames={{label: "text-foreground"}} color="light" size="md"  variant="gradient" />


                          <span>
                            Posting
                          </span>
                        </span>
                      ):(
                        'Post'
                      )
                    }
                  </button>
                </div>
              </div>
            }

            
          </form>
        )
      }
    </div>
  )
}
