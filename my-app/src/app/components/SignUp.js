import React from "react";
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
function SignUp() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
                        <Input type="text" label="Name" />
                        <Input type="text" label="Shop Name" />
                        <Input type="text" label="Phone No"/>
                        <Input type="email" label="Email"/>
                        <Input type="password" label="Password"/>
                        <Input type="password" label="Confirm Password"/>
                        <Button size="lg" color="primary">
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
