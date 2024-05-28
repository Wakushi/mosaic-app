'use client'
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Loader from "@/components/clientUi/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DWORK_SHARES_ADDRESS } from "@/lib/contract";
import Image from "next/image";
import ListShareDialog from "@/components/listShareButton";

const IMAGE_FALLBACK =
  "https://theredwindows.net/wp-content/themes/koji/assets/images/default-fallback-image.png";

const fetchShareData = async (tokenId: string) => {
  const response = await fetch(`/api/shares?id=${tokenId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch share data");
  }
  return response.json();
};

export default function Profil() {
  const { address: clientAddress } = useAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sharesData, setSharesData] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialogTokenId, setOpenDialogTokenId] = useState<number | null>(null);

  useEffect(() => {
    if (clientAddress) {
      const options = { method: "GET", headers: { accept: "application/json" } };

      fetch(
        `https://polygon-amoy.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${clientAddress}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          const filteredNfts = response.ownedNfts.filter(
            (nft: any) => nft.contract.address.toLowerCase() === DWORK_SHARES_ADDRESS.toLowerCase()
          );
          setNfts(filteredNfts);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [clientAddress]);

  useEffect(() => {
    if (nfts.length > 0) {
      const fetchAllSharesData = async () => {
        const sharesPromises = nfts.map((nft) =>
          fetchShareData(nft.tokenId)
            .then((data) => ({ ...data, tokenId: nft.tokenId }))
            .catch((err) => {
              console.error(err);
              return null;
            })
        );

        const sharesResults = await Promise.all(sharesPromises);
        setSharesData(sharesResults.filter((data) => data !== null));
      };

      fetchAllSharesData();
    }
  }, [nfts]);

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const filteredSharesData = sharesData.filter((share) =>
    share.tokenizationRequest.certificate.artist
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-gray-300">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-20">
      <div className="self-start w-full py-10 px-24">
        <h1 className="text-4xl self-start mb-10">Profil</h1>
        <div className="w-full px-4">
          <Input
            type="text"
            placeholder="Search by artist"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded-md mb-4 w-1/4"
          />
        </div>
        <div className="grid grid-cols-3 gap-10 mt-4 justify-around">
          {filteredSharesData.map((share) => (
            <div
              key={share.tokenId}
              className="border border-slate-100 flex flex-col gap-2 justify-center p-4 rounded-md shadow-md items-center bg-white max-h-[350px]"
            >
              <div className="flex-1 w-full h-[200px]">
                <Image
                  src={share.masterworksData.imageURL || IMAGE_FALLBACK}
                  alt="work"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="flex flex-col gap-1 justify-center items-center flex-1">
                <h2>{share.tokenizationRequest.certificate.work}</h2>
                <p>{share.tokenizationRequest.certificate.artist}</p>
                <p>${share.workShare.sharePriceUsd}</p>
                <Button className="w-full" onClick={() => setOpenDialogTokenId(share.tokenId)}>
                  List share
                </Button>
              </div>
              {openDialogTokenId === share.tokenId && (
                <ListShareDialog
                  sharesTokenId={share.tokenId}
                  open={true}
                  setOpen={() => setOpenDialogTokenId(null)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

