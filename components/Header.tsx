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
import Image from "next/image";

const fetchUserData = async (clientAddress: string) => {
  const response = await fetch(`/api/user?clientAddress=${clientAddress}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch user data");
  }
  return data;
};

export default function Header() {
  const account = useAccount();
  const [modalOpen, setModalOpen] = useState(false);
  const [scroll, setScroll] = useState(false);

  const {
    isRegistered,
    isAdmin,
    userType,
    setIsRegistered,
    setIsAdmin,
    setUserType,
  } = useUserStore();

  const clientAddress = account.address;

  useEffect(() => {
    async function checkUser() {
      if (clientAddress) {
        try {
          const data = await fetchUserData(clientAddress);
          setIsRegistered(data.isRegistered);

          if (data.isRegistered) {
            const user = data.user;
            setIsAdmin(user.role === "admin");
            setUserType(user.userType);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setIsRegistered(false);
        }
      }
    }

    checkUser();
  }, [clientAddress]);

  const toggleModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="flex justify-between py-3 z-30 w-screen fixed px-14 items-center bg-white bg-opacity-[0.02] shadow-sm backdrop-blur-sm">
      <Link href="/">
        <div className="w-[200px]">
          <Image
            src="/images/logo/mosaic-logo.png"
            alt="Mosaic logo"
            width={0}
            height={0}
            style={{ width: "100%", height: "100%" }}
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex gap-4">
        <Link href="/marketplace">
          <Button variant="outline">Marketplace</Button>
        </Link>
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
              <Link href={"/profil"}>
                {" "}
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>

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
    </header>
  );
}
