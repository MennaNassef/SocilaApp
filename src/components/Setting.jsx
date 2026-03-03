import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { schema } from '../validation/changePassword';
import { apiServices } from '../services/api';
import { Input, Button, addToast } from '@heroui/react';

export default function Setting() {
    const [isloading ,setIsLoading] =useState(false)
      const [errorMsg,setErrorMsg]=useState("")
      const navigate =useNavigate()
          console.log(errorMsg);
        
    const { handleSubmit, register,reset, formState: { errors } } = useForm({
        resolver:zodResolver(schema)
      })
      async function ChangePassword(registerData) {
          console.log(registerData);
          console.log(errorMsg);
          
          setErrorMsg("")
          setIsLoading(true)
          try {
            const data= await apiServices.updatePassword({
            password: registerData.password,
            newPassword: registerData.newPassword
            })
            addToast({
                title: "Success",
                description: "Password Updated Successfully",
                color:"success",
            })
            navigate("/setting")
            reset()
          } catch (error) {
            if(error.response){
              setErrorMsg(error.response.data.errors);
            }else{
              setErrorMsg(error.message);
              
            }
          }finally{
            setIsLoading(false)
          }
        }
        function getInputProps(label, type ,field) {
          return {
            variant:"bordered",
            // label,
            type,
            isInvalid : !!field,
            errorMessage :field?.message
          }
        }
  return (
        <div className="bg-[#f0f2f5] flex flex-col items-center px-6 py-8 mx-auto min-h-screen">
            <div className="w-full p-6 lg:mt-8 bg-white rounded-lg shadow dark:border lg:max-w-3xl md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 ">
                <div className='flex items-center gap-3'>
                    <div className='bg-[#e7f3ff] w-10 h-10 rounded-full flex items-center justify-center'>
                        <svg fill="#1877f2" height="18px" width="18px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 485.017 485.017" xmlSpace="preserve" stroke="#1877f2"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <g> <path d="M361.205,68.899c-14.663,0-28.447,5.71-38.816,16.078c-21.402,21.403-21.402,56.228,0,77.631 c10.368,10.368,24.153,16.078,38.815,16.078s28.447-5.71,38.816-16.078c21.402-21.403,21.402-56.228,0-77.631 C389.652,74.609,375.867,68.899,361.205,68.899z M378.807,141.394c-4.702,4.702-10.953,7.292-17.603,7.292 s-12.901-2.59-17.603-7.291c-9.706-9.706-9.706-25.499,0-35.205c4.702-4.702,10.953-7.291,17.603-7.291s12.9,2.589,17.603,7.291 C388.513,115.896,388.513,131.688,378.807,141.394z" /> <path d="M441.961,43.036C414.21,15.284,377.311,0,338.064,0c-39.248,0-76.146,15.284-103.897,43.036 c-42.226,42.226-54.491,105.179-32.065,159.698L0.254,404.584l-0.165,80.268l144.562,0.165v-55.722h55.705l0-55.705h55.705v-64.492 l26.212-26.212c17.615,7.203,36.698,10.976,55.799,10.976c39.244,0,76.14-15.282,103.889-43.032 C499.25,193.541,499.25,100.325,441.961,43.036z M420.748,229.617c-22.083,22.083-51.445,34.245-82.676,34.245 c-18.133,0-36.237-4.265-52.353-12.333l-9.672-4.842l-49.986,49.985v46.918h-55.705l0,55.705h-55.705v55.688l-84.5-0.096 l0.078-37.85L238.311,208.95l-4.842-9.672c-22.572-45.087-13.767-99.351,21.911-135.029C277.466,42.163,306.83,30,338.064,30 c31.234,0,60.598,12.163,82.684,34.249C466.34,109.841,466.34,184.025,420.748,229.617z" /> </g> </g></svg>
                    </div>
                    <div>
                        <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Change Password
                        </h2>
                        <p className='text-sm text-slate-500'>Keep your account secure by using a strong password.</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(ChangePassword)} className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
                <div>
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current password</label>
                    <Input {...register('password')} {...getInputProps('password', "password",errors.password)} name="password" id="password" placeholder="Enter current password" size='lg' className=' text-gray-900 text-sm rounded-lg focus:ring-primary-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white'  />
                    {!errors.password && 
                      errorMsg ? (
                      <p className="text-sm text-red-500">
                        {errorMsg === "invalid token .. login again"
                          ? "Incorrect password"
                          : errorMsg
                          }
                      </p>
                    ) : null}
                </div>
                <div>
                    <label htmlFor="newPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
                    <Input {...register('newPassword')} {...getInputProps('newPassword', "password",errors.newPassword)}  name="newPassword" id="newPassword" placeholder="Enter new password"  size='lg' className=' text-gray-900 text-sm rounded-lg focus:ring-primary-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white'   />
                    
                    <p className='mt-1 block text-xs text-slate-500'>At least 8 characters with uppercase, lowercase, number, and special character.</p>
                </div>
                <div>
                    <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm new password</label>
                    <Input {...register('rePassword')} {...getInputProps('rePassword', "password",errors.rePassword)} name="rePassword" id="rePassword" placeholder="Re-enter new password"  size='lg' className=' text-gray-900 text-sm rounded-lg focus:ring-primary-600 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white'  />
                </div>
                <Button type="submit" isLoading={isloading} className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{isloading ? "Updating..." : "Update password"}</Button>
                </form>
            </div>
        </div>
  )
}
