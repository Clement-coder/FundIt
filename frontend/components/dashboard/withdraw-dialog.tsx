"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface WithdrawDialogProps {
  positionId: string
  type: "target" | "fixed" | "spend-and-save"
  amount: number
  title: string
  isLocked?: boolean
  onWithdraw: (amount: number) => Promise<void>
  onClose: () => void
}

export function WithdrawDialog({ type, amount, title, isLocked, onWithdraw, onClose }: WithdrawDialogProps) {
  const [withdrawAmount, setWithdrawAmount] = useState(amount.toString())
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleWithdraw = async () => {
    setIsLoading(true)
    try {
      await onWithdraw(Number.parseFloat(withdrawAmount))
      setSuccess(true)
      setTimeout(onClose, 2000)
    } catch (error) {
      console.error("Withdraw failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            Withdrawal Successful
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-900 dark:text-green-100">
                You've successfully withdrawn {withdrawAmount} USDC from {title}
              </p>
            </div>
            <Button onClick={onClose} className="w-full">
              Done
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Withdraw from {title}</CardTitle>
        <CardDescription>Transfer funds back to your wallet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {isLocked && (
          <div className="bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg p-4 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-900 dark:text-amber-100">
              This position is currently locked and cannot be withdrawn yet.
            </p>
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">Withdrawal Amount (USDC)</label>
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="0.00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              disabled={isLocked}
              className="text-lg"
            />
            <Button variant="outline" onClick={() => setWithdrawAmount(amount.toString())} disabled={isLocked}>
              Max
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">Available: {amount.toFixed(2)} USDC</p>
        </div>

        <div className="bg-muted rounded-lg p-4">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Withdraw Amount</span>
              <span className="font-bold">{withdrawAmount} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Remaining</span>
              <span className="font-bold">{(amount - Number.parseFloat(withdrawAmount || "0")).toFixed(2)} USDC</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
            Cancel
          </Button>
          <Button
            onClick={handleWithdraw}
            disabled={!withdrawAmount || Number.parseFloat(withdrawAmount) > amount || isLocked || isLoading}
            className="flex-1"
          >
            {isLoading ? "Processing..." : "Confirm Withdrawal"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
