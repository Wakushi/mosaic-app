"use client";
import { useState } from "react";
import Link from "next/link";

import { ConnectButton } from "@rainbow-me/rainbowkit";

import { Button } from "./ui/button";

import { Modal } from "@/components/clientUi/modal";
import { ProfileForm } from "./profile-form";
export default function Header() {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  return (
    <div className="flex justify-between p-3 z-30 w-screen border-b fixed">
      <Link href="/">
        <div>Mosaic</div>
      </Link>
      <div className="flex gap-4">
        <Button onClick={toggleModal}>Complete your register</Button>
        <Modal isOpen={modalOpen} close={toggleModal}>
          <ProfileForm />
        </Modal>
        <ConnectButton
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "avatar",
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: false,
          }}
          chainStatus="none"
        />
      </div>
    </div>
  );
}
