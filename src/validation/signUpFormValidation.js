
import { calculateAge } from './../helpers/date';

const emailRegex=/(?:[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+(?:\.[a-z0-9!#$%&'*+\x2f=?^_`\x7b-\x7d~\x2d]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9\x2d]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9\x2d]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
const passwordRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export  function getFormValidation(watch){

    return {
        name:{
            required:{value:true , message:'Name is required'},
            minLength:{value:2 ,message:'Name must be at least two characters'},
            maxLength:{value:50 ,message:'Name must be at most 50 characters'},
            pattern:{value:/^[A-Z][a-zA-Z '.-]*[A-Za-z][^-]$/ ,message:'Enter valid Name'}
        },
        email:{
            required:{value:true , message:'Email is required'},
            pattern:{value:emailRegex,message:"enter valid email"}
        },
        password:{
            required:{value:true , message:'Password is required'},
            pattern:{value:passwordRegex ,message:'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:'}
        },
        repassword:{
            required:{value:true , message:'Password is required'},
            validate:(value) =>value ==watch("password") || "Password and confirm password must be the same"
        },
        dateOfBirth:{
            required:{value:true,message:'Birth Date is required'},
            validate:(date)=>{
                return calculateAge(date) >=18 ||"Age must be more than or equal to 18"
            }
        },
        gender:{
            required:{value:true,message:'Gender is required'},
            validate:(gender)=>gender =="male" || gender=="female" || "gender must be one of(male,female)"
        }
    }
}
