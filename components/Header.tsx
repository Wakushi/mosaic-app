import { ConnectButton } from "@rainbow-me/rainbowkit";
export default function Header() {
  return (
    <div className="flex justify-between p-3 z-30 w-screen">
      <div>Mosaic</div>
      <ConnectButton
        accountStatus={{
          smallScreen: "avatar",
          largeScreen: "full",
        }}
        showBalance={{
          smallScreen: false,
          largeScreen: true,
        }}
      />
    </div>
  );
}