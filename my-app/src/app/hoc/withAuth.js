  'use client'

  import { useEffect, useState } from "react";
  import { useRouter } from 'next/navigation';

  function withAuth(WrappedComponent) {
    return (props) => {
      const router = useRouter();
      const [loading, setLoading] = useState(true); // Loading state to prevent rendering prematurely

      useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
          router.push('/Loginfirst'); // Redirect if no token is present
        } else {
          setLoading(false); // Stop loading if token exists, allowing Dashboard to render
        }
      }, [router]);

      if (loading) {
        // Render nothing while checking the token to avoid flashing
        return null;
      }

      // Render the wrapped component only after authentication check
      return <WrappedComponent {...props} />;
    }
  }

  export default withAuth;
