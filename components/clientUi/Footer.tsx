export default function Footer() {
  return (
    <footer className="bg-white text-center py-10 border-t flex flex-col gap-2">
      <p>&copy; {new Date().getFullYear()} Mosaic. All rights reserved.</p>
      <p className="text-sm">Built during Chainlink Block Magic Hackathon</p>
    </footer>
  )
}
