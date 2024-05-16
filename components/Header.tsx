"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Button } from "./ui/button";
import { Modal } from "@/components/clientUi/modal";
import { ProfileForm } from "./profile-form";
import { useAccount } from "wagmi";

const checkUserRegistration = async (clientAddress: string) => {
  const response = await fetch(
    `/api/checkUserRegistration?clientAddress=${clientAddress}`
  );
  const data = await response.json();
  return data.isRegistered;
};

export default function Header() {
  const account = useAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);
  const clientAddress = account.address;
  useEffect(() => {
    async function fetchUserRegistration() {
      if (clientAddress) {
        try {
          const registered = await checkUserRegistration(clientAddress);
          setIsRegistered(registered);
        } catch (error) {
          console.error("Error checking user registration:", error);
        }
      }
    }

    fetchUserRegistration();
  }, [clientAddress]);

  const toggleModal = () => setModalOpen(!modalOpen);

  return (
    <div className="flex justify-between py-3 z-30 w-screen fixed px-14 items-center">
      <Link href="/">
        <div>Mosaic</div>
      </Link>
      <div className="flex gap-4">
        {isRegistered === false && (
          <Button onClick={toggleModal}>Complete your register</Button>
        )}
        {isRegistered === true && (
          <Link href="/dashboard">
            <Button>Go to Dashboard</Button>
          </Link>
        )}
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
