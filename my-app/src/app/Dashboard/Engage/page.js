import React from 'react'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";
function page() {
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
      <Input type="text" label="Name" placeholder="Enter Item Name"/>
      <Input type="text" label="Message" placeholder="Enter Message"/>
      <Button color="primary">
          Send Email
    </Button>
    </div>
    </>
  )
}

export default page