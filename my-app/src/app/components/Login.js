'use client'
import React from "react";
import { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button, ButtonGroup } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(Email)) {
      return; // Exit if email is invalid
    }

    try {
      console.log("send");
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Email:Email,
          Password: Password,
        }), 
      });
      console.log(Email);
      console.log(Password);
      const data = await response.json();
      console.log(data);

      if (response) {
        alert(data || "Login successful!");
      } else {
        alert(data || "Login failed!");
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
                    <form className="m-[1vw]">
                      <div className="flex flex-col gap-7">
                        <Input type="email" label="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <Input type="password" label="password" onChange={(e)=>setPassword(e.target.value)}/>
                        <Button size="lg"  color="primary" onClick={handleSubmit}>
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
                <Button color="primary" onPress={onClose}>
                  Submit
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
