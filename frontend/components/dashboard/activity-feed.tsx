"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: string
  date: string
  type: "spend" | "deposit" | "withdraw"
  amount: number
  description: string
  emoji?: string
}

const mockActivities: Activity[] = [
  {
    id: "1",
    date: "Jan 8",
    type: "spend",
    amount: 5,
    description: "Spent 50 USDC → Saved 5 USDC",
    emoji: "☕",
  },
  {
    id: "2",
    date: "Jan 7",
    type: "spend",
    amount: 12,
    description: "Spent 120 USDC → Saved 12 USDC",
    emoji: "🛒",
  },
  {
    id: "3",
    date: "Jan 6",
    type: "spend",
    amount: 3,
    description: "Spent 30 USDC → Saved 3 USDC",
    emoji: "🍕",
  },
  {
    id: "4",
    date: "Jan 5",
    type: "deposit",
    amount: 100,
    description: "Manual deposit to Target Savings",
  },
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between pb-4 border-b border-border last:border-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div className="text-2xl">{activity.emoji || "💰"}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{activity.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-primary">+${activity.amount.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
