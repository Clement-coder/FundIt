"use client"

import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useState } from "react"

export function WalletButton() {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")

  const handleConnect = async () => {
    // Simulated wallet connection
    setConnected(true)
    setAddress("0x1234...5678")
  }

  return (
    <Button onClick={handleConnect} variant={connected ? "outline" : "default"} className="gap-2">
      <Wallet className="h-4 w-4" />
      {connected ? address : "Connect Wallet"}
    </Button>
  )
}
