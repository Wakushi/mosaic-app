"use client";

// React
import { useEffect, useState } from "react";
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

// Zustand store
import { useUserStore } from "@/store/useStore"; 

const checkUserRegistration = async (clientAddress: string) => {
  const response = await fetch(`/api/user/checkUserRegistration?clientAddress=${clientAddress}`);
  const data = await response.json();
  return data.isRegistered;
};

const fetchUserData = async (clientAddress: string) => {
  const response = await fetch(`/api/user?clientAddress=${clientAddress}`);
  if (!response.ok) {
    throw new Error("User not found");
  }
  const data = await response.json();
  return data;
};

export default function Header() {
  const account = useAccount();
  const [modalOpen, setModalOpen] = useState(false);

  const { isRegistered, isAdmin, userType, setIsRegistered, setIsAdmin, setUserType } = useUserStore();

  const clientAddress = account.address;

  useEffect(() => {
    async function checkAndFetchUser() {
      if (clientAddress) {
        try {
          const registered = await checkUserRegistration(clientAddress);
          setIsRegistered(registered);

          if (registered) {
            const user = await fetchUserData(clientAddress);
            setIsAdmin(user.role === "admin");
            setUserType(user.userType);
          }
        } catch (error) {
          console.error("Error checking user registration or fetching user data:", error);
          setIsRegistered(false);
        }
      }
    }

    checkAndFetchUser();
  }, [clientAddress]);

  const toggleModal = () => setModalOpen(!modalOpen);

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

              {userType === "Gallery" && (
                <Link href="/dashboard">
                  <DropdownMenuItem>
                    Dashboard
                    <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </Link>
              )}
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
