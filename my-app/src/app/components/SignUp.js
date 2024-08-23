"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

function SignUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [Name, setName] = useState(null);
  const [Shop_name, setShop_name] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [Email, setEmail] = useState(null);
  const [Password, setPassword] = useState(null);
  const [confirmPass, setConfirmPass] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(Email)) {
      return; // Exit if email is invalid
    }

    try {
      const response = await fetch("http://localhost:3001/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: Name,
          Shop_name: Shop_name,
          Phone: Phone,
          Email: Email,
          Password: Password,
        }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        alert(data || "Signup successful!");
      } else {
        alert(data || "Signup failed!");
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
        SignUp
      </Button>
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <div className="flex items-center justify-center">
                  <div className="w-full max-w-sm">
                    <h2 className="text-center text-2xl m-[2vw]">SIGN UP</h2>
                    <form className="m-[1vw]">
                      <div className="flex flex-col gap-7">
                        <Input
                          type="text"
                          label="Name"
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                          type="text"
                          label="Shop Name"
                          onChange={(e) => setShop_name(e.target.value)}
                        />
                        <Input
                          type="text"
                          label="Phone No"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <Input
                          type="email"
                          label="Email"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                          type="password"
                          label="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <Input
                          type="password"
                          label="Confirm Password"
                          onChange={(e) => setConfirmPass(e.target.value)}
                        />
                        <Button
                          size="lg"
                          color="primary"
                          onClick={handleSubmit}
                        >
                          SignUp
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

export default SignUp;
