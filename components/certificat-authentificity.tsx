import React from "react"

interface CertificateAuthentificityProps {
  title: string
  artist: string
}

const CertificateAuthentificity: React.FC<CertificateAuthentificityProps> = ({
  title,
  artist,
}) => {
  return (
    <div
      style={{
        width: "800px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #000",
        padding: "20px",
        fontFamily: "Roboto",
        color: "#fff",
        backgroundColor: "#000",
      }}
    >
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Certificate of Authenticity
      </h1>
      <p style={{ fontSize: "20px" }}>Title: {title}</p>
      <p style={{ fontSize: "20px" }}>Artist: {artist}</p>
    </div>
  )
}

export default CertificateAuthentificity
