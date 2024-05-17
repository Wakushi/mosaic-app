import { ArtworkData } from "@/types/artwork";

export const pinJSONToIPFS = async (json: ArtworkData) => {
  const JWT = process.env.NEXT_PUBLIC_PINATA_JWT;

  const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
  const data = new FormData();
  data.append("file", blob, json.title + ".json");

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: data,
  });
  const resData = await res.json();
  return resData;
};
