"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Slider } from "@/components/ui/slider"

interface SpendSaveConfigProps {
  onSubmit: (data: {
    type: "percentage" | "fixed"
    value: number
    minThreshold: number
    dailyCap: number
    monthlyCap: number
  }) => void
  isLoading?: boolean
}

export function SpendSaveConfig({ onSubmit, isLoading }: SpendSaveConfigProps) {
  const [type, setType] = useState<"percentage" | "fixed">("percentage")
  const [value, setValue] = useState("10")
  const [minThreshold, setMinThreshold] = useState("10")
  const [dailyCap, setDailyCap] = useState("50")
  const [monthlyCap, setMonthlyCap] = useState("500")

  const handleSubmit = () => {
    onSubmit({
      type,
      value: Number.parseFloat(value),
      minThreshold: Number.parseFloat(minThreshold),
      dailyCap: Number.parseFloat(dailyCap),
      monthlyCap: Number.parseFloat(monthlyCap),
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configure Spend & Save</CardTitle>
        <CardDescription>Set up your automatic savings rules</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Tabs value={type} onValueChange={(v) => setType(v as "percentage" | "fixed")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="percentage">Percentage Based</TabsTrigger>
            <TabsTrigger value="fixed">Fixed Amount</TabsTrigger>
          </TabsList>

          <TabsContent value="percentage" className="space-y-4 mt-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Save Percentage</label>
                <span className="text-2xl font-bold text-accent">{value}%</span>
              </div>
              <Slider
                value={[Number.parseFloat(value)]}
                onValueChange={(v) => setValue(v[0].toString())}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">If you spend 100 USDC → Auto-save {value} USDC</p>
            </div>
          </TabsContent>

          <TabsContent value="fixed" className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Fixed Save Amount (USDC)</label>
              <Input
                type="number"
                placeholder="5"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="text-lg"
              />
              <p className="text-xs text-muted-foreground">Save {value} USDC on every qualifying transaction</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="space-y-2 pt-4 border-t border-border">
          <label className="text-sm font-medium">Minimum Spend Threshold (USDC)</label>
          <Input
            type="number"
            placeholder="10"
            value={minThreshold}
            onChange={(e) => setMinThreshold(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Only trigger on spends above this amount</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Daily Cap (USDC)</label>
            <Input type="number" placeholder="50" value={dailyCap} onChange={(e) => setDailyCap(e.target.value)} />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Monthly Cap (USDC)</label>
            <Input type="number" placeholder="500" value={monthlyCap} onChange={(e) => setMonthlyCap(e.target.value)} />
          </div>
        </div>

        <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-sm text-blue-900 dark:text-blue-100">
            ✨ <strong>Preview:</strong> You'll auto-save {type === "percentage" ? `${value}%` : `${value} USDC`} on
            every spend above {minThreshold} USDC, with a {dailyCap} USDC daily cap.
          </p>
        </div>

        <Button onClick={handleSubmit} disabled={isLoading} size="lg" className="w-full">
          {isLoading ? "Enabling..." : "Enable Spend & Save"}
        </Button>
      </CardContent>
    </Card>
  )
}
