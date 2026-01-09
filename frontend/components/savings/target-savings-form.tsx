"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

interface TargetSavingsFormProps {
  onSubmit: (data: { targetAmount: number; initialDeposit: number }) => void
  isLoading?: boolean
}

export function TargetSavingsForm({ onSubmit, isLoading }: TargetSavingsFormProps) {
  const [targetAmount, setTargetAmount] = useState("")
  const [initialDeposit, setInitialDeposit] = useState("")

  const handleSubmit = () => {
    if (targetAmount && initialDeposit) {
      onSubmit({
        targetAmount: Number.parseFloat(targetAmount),
        initialDeposit: Number.parseFloat(initialDeposit),
      })
    }
  }

  const progress =
    targetAmount && initialDeposit ? (Number.parseFloat(initialDeposit) / Number.parseFloat(targetAmount)) * 100 : 0

  return (
    <Card>
      <CardHeader>
        <CardTitle>Start Target Savings</CardTitle>
        <CardDescription>Save towards a specific goal</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Target Amount (USDC)</label>
          <Input
            type="number"
            placeholder="500"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">How much do you want to save?</p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Initial Deposit (USDC)</label>
          <Input
            type="number"
            placeholder="50"
            value={initialDeposit}
            onChange={(e) => setInitialDeposit(e.target.value)}
            className="text-lg"
          />
          <p className="text-xs text-muted-foreground">How much do you want to deposit now?</p>
        </div>

        {targetAmount && initialDeposit && (
          <div className="bg-muted rounded-lg p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-bold">{progress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all"
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              {initialDeposit} / {targetAmount} USDC
            </p>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!targetAmount || !initialDeposit || isLoading}
          size="lg"
          className="w-full"
        >
          {isLoading ? "Creating..." : "Start Target Savings"}
        </Button>
      </CardContent>
    </Card>
  )
}
