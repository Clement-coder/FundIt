"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, TrendingUp } from "lucide-react"

interface SavingsCardProps {
  type: "target" | "fixed" | "spend-and-save"
  title: string
  amount: number
  targetAmount?: number
  duration?: string
  unlockDate?: string
  isCompleted?: boolean
}

export function SavingsCard({
  type,
  title,
  amount,
  targetAmount,
  duration,
  unlockDate,
  isCompleted,
}: SavingsCardProps) {
  const progress = targetAmount ? (amount / targetAmount) * 100 : 0

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
        <div className="flex-1">
          <CardTitle className="text-lg">{title}</CardTitle>
          <CardDescription className="text-xs mt-1">
            {type === "target" && "Target Savings"}
            {type === "fixed" && `${duration} lock`}
            {type === "spend-and-save" && "Auto-save active"}
          </CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="text-3xl font-bold text-primary">{amount.toFixed(2)} USDC</div>

        {type === "target" && targetAmount && (
          <>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">{progress.toFixed(0)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {amount} / {targetAmount} USDC
              </p>
            </div>
            {isCompleted ? (
              <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <p className="text-sm font-medium text-green-700 dark:text-green-300">🎉 Target Reached!</p>
              </div>
            ) : (
              <Button className="w-full gap-2 bg-transparent" variant="outline">
                <TrendingUp className="h-4 w-4" />
                Add More
              </Button>
            )}
          </>
        )}

        {type === "fixed" && unlockDate && (
          <div className="space-y-3">
            <div className="bg-muted rounded-lg p-3">
              <p className="text-xs text-muted-foreground">Unlock Date</p>
              <p className="font-semibold text-sm">{unlockDate}</p>
            </div>
            <Button className="w-full bg-transparent" variant="outline" disabled>
              Locked
            </Button>
          </div>
        )}

        {type === "spend-and-save" && (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted rounded-lg p-2">
                <p className="text-xs text-muted-foreground">This Month</p>
                <p className="font-semibold">$45.50</p>
              </div>
              <div className="bg-muted rounded-lg p-2">
                <p className="text-xs text-muted-foreground">Transactions</p>
                <p className="font-semibold">12</p>
              </div>
            </div>
            <Button className="w-full" variant="default">
              Manage Settings
            </Button>
          </div>
        )}

        <Button className="w-full" variant={isCompleted ? "default" : "outline"}>
          {isCompleted ? "Withdraw" : "View Details"}
        </Button>
      </CardContent>
    </Card>
  )
}
