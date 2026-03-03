import { addToast, Alert, Button, Input,  } from '@heroui/react'
import { useForm } from 'react-hook-form';
import { useContext, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './../validation/loginSchema';
import { Link } from 'react-router-dom';
import { authContext } from '../contexts/authContext';
import { apiServices } from '../services/api';
export default function SignIn()  {
  
  const [isloading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  const {setUserToken}=useContext(authContext)
  const { handleSubmit, register, formState: { errors }, watch } = useForm({
    resolver: zodResolver(schema)
  })

  async function signIn(loginData) {
    setIsLoading(true)
    setErrorMsg("")
    try { 
      const data= await apiServices.signIn(loginData)
      console.log(data.data.token);
      
      localStorage.token=data.data.token
      setUserToken(data.data.token)
      addToast({
        description: "Welcome Back!",
        color: "success",
      })
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.errors);
      } else {
        setErrorMsg(error.message);
      }
    } finally {
      setIsLoading(false)
    }



  }
  function getInputProps(label, type, field) {
    return {
      variant: "bordered",
      label,
      type,
      isInvalid: !!field,
      errorMessage: field?.message
    }
  }
  return (
    <form onSubmit={handleSubmit(signIn  )}>
      <div className='grid gap-4'>
        <div className='grid gap-2 text-center'>
          <h1 className="text-3xl font-bold ">Login</h1>
          <p className="">Don't have an account?<Link to={"/signUp"} className='text-red-700'> Sign up</Link> </p>
        </div>

        <Input {...register('email')} {...getInputProps('Email', 'email', errors.email)} />

        <Input {...register('password')} {...getInputProps('Password', "password", errors.password)} />


        <Button isLoading={isloading} color='primary' type='submit'> Sign in </Button>
        
        {errorMsg && <Alert hideIcon color="danger" title={errorMsg} variant="faded" classNames={{ base: "py-0 capitalis text-center" }} />}
      </div>
    </form>
  )
}
