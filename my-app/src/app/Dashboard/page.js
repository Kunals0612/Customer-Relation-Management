'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import withAuth from "../hoc/withAuth";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
// Customer_name, Customer_ph_no, Customer_email, Item_id, Quantity, Price
function Page() {
  const [user, setUser] = useState({name: ' ', email: ' '});
  const [Customer_name, setName] = useState("");
  const [Customer_email, setEmail] = useState("");
  const [Customer_ph_no, setPhone] = useState("");
  const [Item_id, setItemid] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Price, setAmount] = useState("");
  const token = localStorage.getItem('token'); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      console.log("Sending.....")
      const response = await fetch("http://localhost:3001/addCustomer",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
           Customer_name,
           Customer_email,
           Customer_ph_no,
           Item_id,
           Quantity,
           Price
        }),
      });
      console.log("Response: ", response.status);
      console.log( Customer_name,
        Customer_email,
        Customer_ph_no,
        Item_id,
        Quantity,
        Price)
      
    }catch(err){
       console.log(err);
    }
  }
  useEffect(()=>{
      const token = localStorage.getItem('token');
      console.log(token);
      if(token){
          const decodeToken = jwtDecode(token);
          console.log(decodeToken);
          setUser({
            name: decodeToken.username,
            email: decodeToken.useremail,
          });
      }
  },[])
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
        <NavbarItem isActive>
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
    <h1 className="text-[2vw] ml-[41vw] mt-[5vh]">Welcome to <span className="text-blue-500">{user.name}</span></h1>
    <div className="flex w-[20vw] flex-wrap md:flex-nowrap gap-10 ml-[40vw] mt-[3vw] flex-col">
      <Input type="text" label="Name" placeholder="Enter the Name" onChange={ (e) => {setName(e.target.value)}}/>
      <Input type="email" label="Email" placeholder="Enter the Email" onChange={ (e) => {setEmail(e.target.value)}}/>
      <Input type="text" label="Phone no" placeholder="Enter Phone no" onChange={(e)=>{setPhone(e.target.value)}}/>
      <Input type="text" label="Item Id" placeholder="Enter Item Id" onChange={(e)=>{setItemid(e.target.value)}}/>
      <Input type="number" label="Quantity" placeholder="Enter Quantity" onChange={(e)=>{setQuantity(e.target.value)}}/>
      <Input type="number" label="Amount" placeholder="Enter Purchase Amount" onChange={(e)=>{setAmount(e.target.value)}}/>
      <Button color="primary" onClick={handleSubmit}>
          Add
      </Button>
    </div>
    </>

  );
}
export default withAuth(Page);