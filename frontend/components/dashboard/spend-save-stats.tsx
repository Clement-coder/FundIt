"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

interface SpendSaveStatsProps {
  weekAmount: number
  monthAmount: number
  totalAmount: number
  transactionCount: number
}

export function SpendSaveStats({ weekAmount, monthAmount, totalAmount, transactionCount }: SpendSaveStatsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-accent" />
          Spend & Save Stats
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted rounded-lg p-3">
            <p className="text-xs text-muted-foreground">This Week</p>
            <p className="text-2xl font-bold text-accent mt-1">${weekAmount.toFixed(2)}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <p className="text-xs text-muted-foreground">This Month</p>
            <p className="text-2xl font-bold text-accent mt-1">${monthAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Total Saved</p>
            <p className="font-bold text-lg">${totalAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Transactions</p>
            <p className="font-bold text-lg">{transactionCount}</p>
          </div>
        </div>

        <Button className="w-full" variant="default" size="sm">
          View Activity
        </Button>
      </CardContent>
    </Card>
  )
}
