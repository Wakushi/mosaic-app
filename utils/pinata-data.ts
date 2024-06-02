const JWT = process.env.NEXT_PUBLIC_PINATA_JWT

export const pinJSONToIPFS = async (json: any, filename: string) => {
  const blob = new Blob([JSON.stringify(json)], { type: "application/json" })
  const data = new FormData()
  data.append("file", blob, `${filename}.json`)

  const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${JWT}`,
    },
    body: data,
  })
  const resData = await res.json()
  return resData
}

export const pinFileToIPFS = async (imageBuffer: Buffer, filename: string) => {
  try {
    const blob = new Blob([imageBuffer], { type: "image/png" })
    const data = new FormData()
    data.append("file", blob, `${filename}.png`)

    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JWT}`,
      },
      body: data,
    })

    if (!res.ok) {
      throw new Error("Failed to pin file to IPFS")
    }

    const resData = await res.json()
    return resData
  } catch (error) {
    console.error("Error pinning file to IPFS:", error)
    throw error
  }
}
