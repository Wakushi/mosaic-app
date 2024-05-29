import React, { ReactNode } from "react"

interface ModalProps {
  isOpen: boolean
  close: () => void
  children: ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, close, children }) => {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      className="min-h-[100vh]"
    >
      <div
        style={{
          position: "relative",
          padding: "2.5rem 1.5rem",
          background: "white",
          borderRadius: "8px",
          maxWidth: "500px",
          width: "100%",
        }}
      >
        <button
          onClick={close}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          Close
        </button>
        {children}
      </div>
    </div>
  )
}
