"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"

interface SpendSaveActivity {
  id: string
  date: string
  spent: number
  saved: number
  emoji: string
  category: string
}

const mockSpendActivities: SpendSaveActivity[] = [
  {
    id: "1",
    date: "Jan 8",
    spent: 50,
    saved: 5,
    emoji: "☕",
    category: "Coffee",
  },
  {
    id: "2",
    date: "Jan 7",
    spent: 120,
    saved: 12,
    emoji: "🛒",
    category: "Shopping",
  },
  {
    id: "3",
    date: "Jan 6",
    spent: 30,
    saved: 3,
    emoji: "🍕",
    category: "Food",
  },
  {
    id: "4",
    date: "Jan 5",
    spent: 85,
    saved: 8.5,
    emoji: "🚗",
    category: "Transport",
  },
]

export function SpendSaveActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Zap className="h-5 w-5 text-accent" />
          Auto-Save Activity
        </CardTitle>
        <CardDescription>Recent spend & save transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mockSpendActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between pb-3 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{activity.emoji}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.category}</p>
                  <p className="text-xs text-muted-foreground">Spent {activity.spent} USDC</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-accent">+{activity.saved.toFixed(2)} USDC</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
