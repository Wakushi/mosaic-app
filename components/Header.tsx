"use client"
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import { Modal } from "@/components/clientUi/modal";
import { ProfileForm } from "./newClient-form";
export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  return (
    <div className="flex justify-between p-3 z-30 w-screen">
      <div>Mosaic</div>
      <div className="flex gap-4">
        <Button onClick={toggleModal}>Complete your register</Button>
        <Modal isOpen={modalOpen} close={toggleModal}>
        <ProfileForm/> 
      </Modal>
        <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: false,
        }}
      />
      </div>
      
    </div>
  );
}