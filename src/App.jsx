import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Feed from './pages/Feed';
import MainLayout from './Layout/MainLayout';
import AuthLayout from './Layout/AuthLayout';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import ProtectedAuthRoute from './protectedRoutes/ProtectedAuthRoute';
import { CounterContextProvider } from './contexts/counterContext';
import AuthContextProvider from './contexts/authContext';
import PostDetails from './pages/PostDetails';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Setting from './components/Setting';
const router = createBrowserRouter([
    {
      path: '', element: <MainLayout />, children: [
        { path:'SocilaApp' , element: <ProtectedRoute><Feed/> </ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Profile/> </ProtectedRoute> },
        { path: 'setting', element: <ProtectedRoute><Setting/> </ProtectedRoute> },
        { path: 'posts/:postId', element: <ProtectedRoute><PostDetails/> </ProtectedRoute> },
        { path: '*', element: <NotFound /> },
      ]
    }, 
    {
      path:'', element: <AuthLayout />, children: [
        { path: 'signin', element:<ProtectedAuthRoute><SignIn /></ProtectedAuthRoute>  },
        { path: 'signup', element:<ProtectedAuthRoute><SignUp /> </ProtectedAuthRoute> },
      ]
    }
  ])

const queryClient =new QueryClient()

function App() {
  
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools/>
        <AuthContextProvider>
        <CounterContextProvider>
          <HeroUIProvider>
            <ToastProvider />
            <RouterProvider router={router} />
          </HeroUIProvider>
        </CounterContextProvider>
      </AuthContextProvider>
      
    </QueryClientProvider>
    
    
    </>
  )
}

export default App
