'use Client'

import { useEffect } from "react";
import { useRouter } from 'next/navigation';

function withAuth(WrappedComponent) {
  return (props) => {
    const router = useRouter();

    useEffect(()=>{

       const token = localStorage.getItem('token');

       if(!token){
           router.replace('/err404');
       }
    },[]);

    if (typeof window !== "undefined" && !localStorage.getItem('jwtToken')) {
        return null; // Avoid flashing the protected component
    }
    return <WrappedComponent {...props} />;
  }   
}

export default withAuth