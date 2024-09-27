'use client';
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const router = useRouter();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(Email)) {
      return; // Exit if email is invalid
    }

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email,
          Password,
        }),
      });
      console.log("Response Status: ", response.status);
      console.log(Email);
      console.log(Password);
      console.log("Data fetching");
      const data = await response.json();
      console.log(data);
      console.log("data fetched");
      if (response.ok) {  // Check if the response is successful
        localStorage.setItem('token', data.token);
        console.log(data.token);
        alert("Login successful!"); // Use message from server if provided
        router.push('/Dashboard');  // Redirect to Dashboard on success
      } else {
        alert(data || "Login failed!"); // Show error message from server
      }
    } catch (err) {
      alert("An error occurred. Please try again later.");
    }
  };

  const validate = (email) => {
    let error = "";

    if (!email) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      error = "Invalid email address";
    }

    if (error) {
      alert(error);
      return false; 
    }

    return true; 
  };

  return (
    <React.Fragment>
      <Button color="primary" size="lg" onPress={onOpen}>
        Login
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-sm">
                    <h2 className="text-center text-2xl m-[2vw]">LOGIN FORM</h2>
                    <form className="m-[1vw]" onSubmit={handleSubmit}>
                      <div className="flex flex-col gap-7">
                        <Input 
                          type="email" 
                          label="Email" 
                          onChange={(e) => setEmail(e.target.value)} 
                          required 
                        />
                        <Input 
                          type="password" 
                          label="Password" 
                          onChange={(e) => setPassword(e.target.value)} 
                          required 
                        />
                        <Button type="submit" size="lg" color="primary">
                          Login
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default Login;
