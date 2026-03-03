
import{ createContext ,useEffect,useState} from 'react';
import { apiServices } from '../services/api';

export const authContext =createContext(0)
export default function AuthContextProvider({children}) {
    const [isLoading ,setIsLoading]=useState(false)
    const [UserData ,setUserData]=useState(null)
    const [userToken ,setUserToken]=useState(localStorage.getItem("token"))
    console.log(UserData);
    
    useEffect(()=>{
        if(userToken !=null){
            apiServices.setToken(userToken)
            getLoggedUserData()
        }
    },[userToken])
    async function getLoggedUserData() {
        setIsLoading(true)
        try{
            const data =await apiServices.getLoggedUserData()
            setUserData(data.data.user)
            console.log(data.data.user.name);
            
        }catch(error){
            if(error.status==401){
                localStorage.removeItem("token")
                setUserToken(null)
            }
            
        } finally{
            setIsLoading(false)
        }
    }
    
    return <authContext.Provider value={{userToken,setUserToken ,isLoading ,UserData ,setUserData}}>
        {children}
    </authContext.Provider>
}
