"use client"
import React, {useState} from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
function page() {
  const [item_name, setItemName] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem('token'); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
       console.log("Sending...");
       const response = await fetch ("http://localhost:3001/handleCustomersByItem",{
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
         },
         body: JSON.stringify({
            item_name,
            message
         })
       });
       if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Error: ${errorData.message || 'Failed to send Emails'}`);
        return;
      }
      const data = await response.json();
      console.log('Success:', data);
      alert('Email Sent Successfull!y');
    }catch(err){
      console.log(err);
    }
  }
  return (
    <>
        <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">Linkify</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="/Dashboard/Enlist">
            Enlist
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Dashboard" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link color="foreground" href="/Dashboard/Engage">
            Engage
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <div className="flex w-[20vw] flex-wrap md:flex-nowrap gap-10 ml-[40vw] mt-[7vw] flex-col">
      <Input type="text" label="Name" placeholder="Enter Item Name" onChange={(e) => {setItemName(e.target.value)}}/>
      <Input type="text" label="Message" placeholder="Enter Message" onCanPlay={(e)=>{setMessage(e.target.value)}}/>
      <Button color="primary" onClick={handleSubmit}>
          Send Email
    </Button>
    </div>
    </>
  )
}

export default page