"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Lock } from "lucide-react"

interface FixedSavingsFormProps {
  onSubmit: (data: { amount: number; duration: number }) => void
  isLoading?: boolean
}

export function FixedSavingsForm({ onSubmit, isLoading }: FixedSavingsFormProps) {
  const [amount, setAmount] = useState("")
  const [duration, setDuration] = useState("30")

  const handleSubmit = () => {
    if (amount && duration) {
      onSubmit({
        amount: Number.parseFloat(amount),
        duration: Number.parseInt(duration),
      })
    }
  }

  // Calculate unlock date
  const unlockDate = new Date()
  unlockDate.setDate(unlockDate.getDate() + Number.parseInt(duration))
  const unlockDateStr = unlockDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Start Fixed Savings
        </CardTitle>
        <CardDescription>Lock funds for a set duration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Amount (USDC)</label>
          <Input
            type="number"
            placeholder="100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">Amount to lock</p>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-medium">Lock Duration</label>
          <RadioGroup value={duration} onValueChange={setDuration}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted cursor-pointer">
              <RadioGroupItem value="30" id="duration-30" />
              <Label htmlFor="duration-30" className="flex-1 cursor-pointer">
                <div className="font-medium">30 Days</div>
                <div className="text-xs text-muted-foreground">
                  Unlock {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted cursor-pointer">
              <RadioGroupItem value="60" id="duration-60" />
              <Label htmlFor="duration-60" className="flex-1 cursor-pointer">
                <div className="font-medium">60 Days</div>
                <div className="text-xs text-muted-foreground">
                  Unlock {new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted cursor-pointer">
              <RadioGroupItem value="90" id="duration-90" />
              <Label htmlFor="duration-90" className="flex-1 cursor-pointer">
                <div className="font-medium">90 Days</div>
                <div className="text-xs text-muted-foreground">
                  Unlock {new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {amount && (
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount to Lock</span>
                <span className="font-bold">{amount} USDC</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Duration</span>
                <span className="font-bold">{duration} days</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Unlock Date</span>
                <span className="font-bold">{unlockDateStr}</span>
              </div>
            </div>
          </div>
        )}

        <Button onClick={handleSubmit} disabled={!amount || !duration || isLoading} size="lg" className="w-full">
          {isLoading ? "Creating..." : "Start Fixed Savings"}
        </Button>
      </CardContent>
    </Card>
  )
}
