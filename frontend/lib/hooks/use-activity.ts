"use client"

import { useState, useCallback, useEffect } from "react"

export interface Activity {
  id: string
  type: "deposit" | "withdraw" | "spend-save" | "vault-created" | "config-updated"
  title: string
  description: string
  amount?: number
  timestamp: Date
  txHash: string
  status: "pending" | "confirmed" | "failed"
  metadata?: Record<string, unknown>
}

// Hook for managing activity tracking
export function useActivity() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Load activities from localStorage or indexer
  useEffect(() => {
    const loadActivities = async () => {
      setIsLoading(true)
      try {
        // In production, this would fetch from The Graph or a custom indexer
        // For now, load from localStorage
        const stored = localStorage.getItem("fundkit_activities")
        if (stored) {
          const parsed = JSON.parse(stored)
          setActivities(
            parsed.map((a: any) => ({
              ...a,
              timestamp: new Date(a.timestamp),
            })),
          )
        }
      } catch (error) {
        console.error("[v0] Failed to load activities:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadActivities()
  }, [])

  // Save activity to local storage
  const addActivity = useCallback((activity: Omit<Activity, "id">) => {
    const newActivity: Activity = {
      ...activity,
      id: `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    }

    setActivities((prev) => [newActivity, ...prev])

    // Save to localStorage
    try {
      const current = localStorage.getItem("fundkit_activities") || "[]"
      const parsed = JSON.parse(current)
      localStorage.setItem("fundkit_activities", JSON.stringify([newActivity, ...parsed]))
    } catch (error) {
      console.error("[v0] Failed to save activity:", error)
    }

    return newActivity
  }, [])

  // Track a deposit
  const trackDeposit = useCallback(
    (amount: number, savingsType: string, txHash: string) => {
      return addActivity({
        type: "deposit",
        title: `Deposited ${amount} USDC`,
        description: `Added ${amount} USDC to ${savingsType} savings`,
        amount,
        timestamp: new Date(),
        txHash,
        status: "pending",
        metadata: { savingsType },
      })
    },
    [addActivity],
  )

  // Track a withdrawal
  const trackWithdraw = useCallback(
    (amount: number, savingsType: string, txHash: string) => {
      return addActivity({
        type: "withdraw",
        title: `Withdrew ${amount} USDC`,
        description: `Withdrew ${amount} USDC from ${savingsType}`,
        amount,
        timestamp: new Date(),
        txHash,
        status: "pending",
        metadata: { savingsType },
      })
    },
    [addActivity],
  )

  // Track a spend & save event
  const trackSpendAndSave = useCallback(
    (spent: number, saved: number, category: string, txHash: string) => {
      return addActivity({
        type: "spend-save",
        title: `Auto-saved ${saved} USDC`,
        description: `You spent ${spent} USDC on ${category} → automatically saved ${saved} USDC`,
        amount: saved,
        timestamp: new Date(),
        txHash,
        status: "pending",
        metadata: { spent, category, savePercentage: ((saved / spent) * 100).toFixed(1) },
      })
    },
    [addActivity],
  )

  // Track vault creation
  const trackVaultCreated = useCallback(
    (vaultAddress: string, txHash: string) => {
      return addActivity({
        type: "vault-created",
        title: "Vault Created",
        description: `Your FUNDit vault has been created and is ready to use`,
        timestamp: new Date(),
        txHash,
        status: "pending",
        metadata: { vaultAddress },
      })
    },
    [addActivity],
  )

  // Track config updates
  const trackConfigUpdate = useCallback(
    (configType: string, changes: Record<string, unknown>, txHash: string) => {
      return addActivity({
        type: "config-updated",
        title: `${configType} Updated`,
        description: `Your Spend & Save settings have been updated`,
        timestamp: new Date(),
        txHash,
        status: "pending",
        metadata: { configType, changes },
      })
    },
    [addActivity],
  )

  // Update activity status after confirmation
  const confirmActivity = useCallback((activityId: string) => {
    setActivities((prev) =>
      prev.map((activity) => (activity.id === activityId ? { ...activity, status: "confirmed" } : activity)),
    )
  }, [])

  // Get recent activities
  const getRecentActivities = useCallback(
    (limit = 10) => {
      return activities.slice(0, limit)
    },
    [activities],
  )

  // Get activities by type
  const getActivitiesByType = useCallback(
    (type: Activity["type"]) => {
      return activities.filter((activity) => activity.type === type)
    },
    [activities],
  )

  return {
    // State
    activities,
    isLoading,
    // Functions
    addActivity,
    trackDeposit,
    trackWithdraw,
    trackSpendAndSave,
    trackVaultCreated,
    trackConfigUpdate,
    confirmActivity,
    getRecentActivities,
    getActivitiesByType,
  }
}
