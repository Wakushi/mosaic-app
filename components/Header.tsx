"use client";
// React
import { useState, useEffect } from "react";
import Link from "next/link";

// Wagmi
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

// Components
import { Modal } from "@/components/clientUi/modal";
import { ProfileForm } from "./profile-form";

// Shadcn
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "./ui/dropdown-menu";

const checkUserRegistration = async (clientAddress: string) => {
  const response = await fetch(
    `/api/user/checkUserRegistration?clientAddress=${clientAddress}`
  );
  const data = await response.json();
  return data.isRegistered;
};

const checkUserRole = async (clientAddress: string) => {
  const response = await fetch(
    `/api/user/checkUserRole?clientAddress=${clientAddress}`
  );
  const data = await response.json();
  return data.isAdmin;
};

export default function Header() {
  const account = useAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
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

  useEffect(() => {
    const fetchUserRole = async () => {
      if (account?.address) {
        const adminStatus = await checkUserRole(account.address);
        setIsAdmin(adminStatus);
      }
    };

    fetchUserRole();
  }, [account?.address]);
  return (
    <div className="flex justify-between py-3 z-30 w-screen fixed px-14 items-center">
      <Link href="/">
        <div>Mosaic</div>
      </Link>
      <div className="flex gap-4">
        {isRegistered === false && (
          <>
            <Button onClick={toggleModal}>Complete your register</Button>
            <Modal isOpen={modalOpen} close={toggleModal}>
              <ProfileForm />
            </Modal>
          </>
        )}
        {isRegistered === true && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Menu</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <Link href="/dashboard">
                <DropdownMenuItem>
                  Dashboard
                  <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              {isAdmin && (
                <Link href="/admin">
                  <DropdownMenuItem>
                    Admin
                    <DropdownMenuShortcut>⌘A</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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
