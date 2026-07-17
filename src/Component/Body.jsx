import React from 'react'
import { createBrowserRouter } from 'react-router-dom';

import Browse from './Browse';
import Login from "./Login"
import { RouterProvider } from 'react-router-dom';
import{auth} from "../utils/firebase";
import { useDispatch } from 'react-redux';
import{addUser} from "../utils/userSlice"

const Body = () => {
  const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element:<Login/>,
        },{
        path: "/browse",
        element:<Browse/>,
    }]);
    useEffect(() =>{
      onAuthStateChanged(auth,(user) =>{
        if(user){
          const {uid,email,displayName} = user;
          dispatch(addUser({uid:uid,email:email,displayName:displayName}));
         
        }else{
         dispatch(removeUser());
         
        }
      })
    },[])
  return (
    <div>
    
      
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
