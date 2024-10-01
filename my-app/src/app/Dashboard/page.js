'use client'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
import withAuth from "../hoc/withAuth";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
function Page() {
  const [user, setUser] = useState({name: ' ', email: ' '});
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
      <Input type="text" label="Name" placeholder="Enter the Name"/>
      <Input type="email" label="Email" placeholder="Enter the Email"/>
      <Input type="text" label="Phone no" placeholder="Enter Phone no"/>
      <Input type="text" label="Item Id" placeholder="Enter Item Id"/>
      <Input type="number" label="Quantity" placeholder="Enter Quantity"/>
      <Input type="number" label="Amount" placeholder="Enter Purchase Amount"/>
      <Button color="primary">
          Add
    </Button>
    </div>
    </>

  );
}
export default withAuth(Page);