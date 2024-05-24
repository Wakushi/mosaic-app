export const MW_IMAGE_BASE_URL = "https://static.masterworks.io/resize/800/"

export async function getArtistData(artistId: string): Promise<any> {
  const response = await fetch("https://pricedb.ms.masterworks.io/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "artistDetails",
      variables: {
        artistId: artistId,
      },
      query:
        "query artistDetails($artistId: String, $permalink: String, $artistName: String, $yob: Int) {\n  artist(\n    artistId: $artistId\n    permalink: $permalink\n    artistName: $artistName\n    yob: $yob\n  ) {\n    artistId\n    permalink\n    artistName\n    bio\n    fallbackBio\n    yob\n    yod\n    recordPrice\n    historicalAppreciation\n    worksCount\n    coverImageLink\n    performance {\n      year\n      totalTurnover\n      maxPrice\n      lotsUnsold\n      lotsSold\n      averagePrice\n      __typename\n    }\n    works {\n      permalink\n      workTitle\n      imageLink\n      moic\n      sales {\n        priceUSD\n        date\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}",
    }),
  })

  const { data } = await response.json()
  return data.artist
}

export async function getWorkDetails(permalink: string): Promise<any> {
  const response = await fetch("https://pricedb.ms.masterworks.io/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationName: "ArtworkForAdmin",
      variables: {
        permalink: permalink, // ex: "w:038e7b184c25ad9"
      },
      query:
        "query ArtworkForAdmin($permalink: String) {\n  artwork: work(permalink: $permalink) {\n    permalink\n    artistPermalink\n    workTitle\n    imageLink\n    irr\n    totalReturn\n    notes\n    medium\n    heightCM\n    widthCM\n    spreadsheetId\n    internalNotes\n    sales {\n      date\n      permalink\n      priceUSD\n      lowEstimateUSD\n      highEstimateUSD\n      internalNotes\n      lotNumber\n      notes\n      currency\n      workTitle\n      __typename\n    }\n    moic\n    firstSaleDate\n    lastSaleDate\n    firstSalePrice\n    lastSalePrice\n    __typename\n  }\n}",
    }),
  })

  const { data } = await response.json()
  return data.artwork
}

export async function getMasterworksData(
  artistName: string,
  title: string
): Promise<any> {
  const artist = await getArtistData(formatArtistNameMW(artistName))
  const externalWork = artist.works.find(
    (workMW: any) => workMW.workTitle === title
  )
  const { permalink } = externalWork
  const marketData = await getWorkDetails(permalink)
  return {
    title: marketData.workTitle,
    artist: artist.artistName,
    medium: marketData.medium,
    dimensions: `${marketData.heightCM} x ${marketData.widthCM} cm`,
    firstSaleDate: marketData.firstSaleDate,
    lastSaleDate: marketData.lastSaleDate,
    firstSalePrice: marketData.firstSalePrice,
    lastSalePrice: marketData.lastSalePrice,
    moic: marketData.moic,
    imageURL: `${MW_IMAGE_BASE_URL}${marketData.imageLink}`,
  }
}

export function formatArtistNameMW(artistName: string): string {
  return artistName.split(" ").join("-").toLowerCase()
}
