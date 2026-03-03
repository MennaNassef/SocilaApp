import { addToast, Alert, Button, Input, Select, SelectItem } from '@heroui/react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema } from './../validation/registerSchema';
import { Link } from 'react-router-dom';
import { apiServices } from './../services/api';
export default function SignUp() {


  const [isloading ,setIsLoading] =useState(false)
  const [errorMsg,setErrorMsg]=useState("")
  const navigate =useNavigate()
   
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver:zodResolver(schema)
  })

  async function signUp(registerData) {
    setErrorMsg("")
    setIsLoading(true)
    
    try {
      const data= await apiServices.signUn(registerData)
      console.log(data);
      addToast({
          title: "Success",
          description: "Account Created Successfully",
          color:"success",
      })
      navigate("/signIn")
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
      label,
      type,
      isInvalid : !!field,
      errorMessage :field?.message
    }
  }

  

  return (
    <form onSubmit={handleSubmit(signUp)}>
      <div className='grid gap-4'>
        <div className='grid gap-2 text-center'>
          <h1 className="text-3xl font-bold ">Create account</h1>
          <p className="">Already have an account?<Link to={"/signIn"} className='text-red-700'> Sign in</Link> </p>
        </div>

        <Input {...register('name')} {...getInputProps('Full Name', 'text',errors.name)} />

        <Input {...register('email')} {...getInputProps('Email', 'email',errors.email)} />

        <Input {...register('password')} {...getInputProps('Password', "password",errors.password)} />

        <Input {...register('rePassword')} {...getInputProps('Confirm Password', "password",errors.rePassword)}/>

        <Input {...register('dateOfBirth')} {...getInputProps('Birth of Date', 'date',errors.dateOfBirth)} />

        <Select {...register('gender')} {...getInputProps('Gender',undefined,errors.gender)}>
          <SelectItem key="male">Male</SelectItem>
          <SelectItem key="female">Female</SelectItem>
        </Select>

        <Button isLoading={isloading} color='primary' type='submit'> Create Account </Button>
        
        {errorMsg &&<Alert hideIcon color="danger" title={errorMsg} variant="faded" classNames={{base:"py-0 capitalis text-center"}}/>}
      </div>
    </form>
  )
}
