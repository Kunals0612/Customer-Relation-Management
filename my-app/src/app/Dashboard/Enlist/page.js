"use client"
import React, { useState } from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";

// Item_name, Item_price, Item_description, Item_category
function page() {
  const [Item_name, setItemname] = useState("");
  const [Item_price, setItemPrice] = useState("");
  const [Item_description, setItemDescription] = useState("");
  const [Item_category, setItemCategory] = useState("");
  const token = localStorage.getItem('token'); 
  //console.log(token);
  const handleSubmit = async (e) => {
    e.preventDefault();
     try{
        console.log("Sending....")
        const body = {
          Item_name,
          Item_price,
          Item_description,
          Item_category
        };
        const response = await fetch("http://localhost:3001/addItem",{
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(
            body
          )
     });
     console.log("Response",response.status);
     console.log(Item_name,
      Item_price,
      Item_description,
      Item_category);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        alert(`Error: ${errorData.message || 'Failed to add item'}`);
        return;
      }

      const data = await response.json();
      console.log('Success:', data);
      alert('Item added successfully!');

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
        <NavbarItem isActive>
          <Link color="foreground" href="/Dashboard/Enlist">
            Enlist
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/Dashboard" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/Dashboard/Engage">
            Engage
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    <div className="flex w-[20vw] flex-wrap md:flex-nowrap gap-10 ml-[40vw] mt-[7vw] flex-col">
      <Input type="text" label="Name" placeholder="Enter Item Name" onChange={(e)=>{setItemname(e.target.value)}}/>
      <Input type="number" label="Price" placeholder="Enter Price" onChange={(e)=>{setItemPrice(e.target.value)}}/>
      <Input type="text" label="Description" placeholder="Enter Description" onChange={(e)=>{setItemDescription(e.target.value)}}/>
      <Input type="text" label="category" placeholder="Enter Category" onChange={(e)=>setItemCategory(e.target.value)}/>
      <Button color="primary" onClick={handleSubmit}>
          Add
    </Button>
    </div>
    </>
  )
}

export default page