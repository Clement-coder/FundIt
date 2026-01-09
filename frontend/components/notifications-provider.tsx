"use client"

import { createContext, type ReactNode, useContext } from "react"
import { useNotifications, type Notification } from "@/lib/hooks/use-notifications"

interface NotificationsContextType {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, "id" | "timestamp">) => Notification
  removeNotification: (id: string) => void
  notifySuccess: (title: string, message: string) => Notification
  notifyError: (title: string, message: string) => Notification
  notifyInfo: (title: string, message: string) => Notification
  notifyWarning: (title: string, message: string) => Notification
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined)

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const notifications = useNotifications()

  return (
    <NotificationsContext.Provider value={notifications as NotificationsContextType}>
      {children}
    </NotificationsContext.Provider>
  )
}

export function useNotificationsContext() {
  const context = useContext(NotificationsContext)
  if (!context) {
    throw new Error("useNotificationsContext must be used within NotificationsProvider")
  }
  return context
}
