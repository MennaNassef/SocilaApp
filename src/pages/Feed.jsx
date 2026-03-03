
import Post from './../components/Post';
import { apiServices } from "../services/api";
import LoadingScreen from "../components/LoadingScreen";
import CreatePost from './CreatePost';
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";


export default function Feed() {
  const {data:posts =[] ,isLoading ,refetch ,isFetching} =useQuery({
    queryKey:['posts'],
    queryFn:()=>apiServices.getPosts(),
    select:(data)=>data.data.posts,
    refetchOnMount:true,
    refetchOnReconnect:false,
    refetchOnWindowFocus:false,
    refetchIntervalInBackground:false,
    retry:3,
    staleTime:0
    // retryDelay:5000
  })
  
  return (
    <div className="max-w-xl mx-auto py-5 grid gap-6">
      {isFetching && !isLoading && <div className="px-4 py-3 bg-white shadow rounded-4xl w-fit absolute start-1/2 -translate-x-1/2">
          <Spinner size="md" color="primary"/>
        </div>}
      <CreatePost getPosts={refetch}/>
      {
        isLoading ? <LoadingScreen/>:
        posts.map((post)=>
          <Post post={post} getPosts={refetch}/>)
      }
        </div>
  )


}
