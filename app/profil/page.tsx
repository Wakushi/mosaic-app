'use client';
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Profil() {
  const { address: clientAddress } = useAccount();
  const [nfts, setNfts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (clientAddress) {
      const options = { method: "GET", headers: { accept: "application/json" } };

      fetch(
        `https://polygon-amoy.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${clientAddress}`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setNfts(response.ownedNfts || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [clientAddress]);

  return (
    <div className="min-h-screen p-24">
      <h1>Profil</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2>Address: {clientAddress}</h2>
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nfts.map((nft, index) => (
              <div key={index} className="border p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-bold">{nft.title}</h3>
                <img
                  src={nft.media[0].gateway}
                  alt={nft.title}
                  className="w-full h-auto mt-2 rounded"
                />
              </div>
            ))}
          </div> */}
        </div>
      )}
    </div>
  );
}
