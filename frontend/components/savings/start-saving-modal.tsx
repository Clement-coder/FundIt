"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Target, Lock, Zap } from "lucide-react"

interface StartSavingModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectType: (type: "target" | "fixed" | "spend-and-save") => void
}

const savingTypes = [
  {
    id: "target",
    title: "Target Savings",
    description: "Save towards a specific goal with progress tracking",
    icon: Target,
    benefits: ["Progress tracking", "Flexible deposits", "Milestone sharing"],
  },
  {
    id: "fixed",
    title: "Fixed Savings",
    description: "Lock funds for a set duration",
    icon: Lock,
    benefits: ["Time-locked security", "Predictable unlock", "Commitment-based"],
  },
  {
    id: "spend-and-save",
    title: "Spend & Save",
    description: "Automatically save on every transaction",
    icon: Zap,
    benefits: ["Set and forget", "Percentage or fixed", "Full control"],
  },
]

export function StartSavingModal({ isOpen, onClose, onSelectType }: StartSavingModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-background border-b border-border p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Start New Saving</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-6 grid md:grid-cols-3 gap-4">
          {savingTypes.map((type) => {
            const Icon = type.icon
            return (
              <button
                key={type.id}
                onClick={() => onSelectType(type.id as "target" | "fixed" | "spend-and-save")}
                className="group relative"
              >
                <Card className="h-full p-6 hover:shadow-lg transition-all hover:border-primary cursor-pointer">
                  <div className="flex flex-col h-full gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    <div className="text-left">
                      <h3 className="font-bold text-lg">{type.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                    </div>

                    <div className="flex-1" />

                    <div className="space-y-2 pt-4 border-t border-border">
                      {type.benefits.map((benefit) => (
                        <div key={benefit} className="flex items-center gap-2 text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>

                    <Button className="w-full mt-4">Choose</Button>
                  </div>
                </Card>
              </button>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
