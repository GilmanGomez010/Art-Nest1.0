"use client"

import { useEffect } from "react"
import { CheckCircle, AlertCircle, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export type ToastType = "success" | "error" | "info"

export function showToast(type: ToastType, title: string, description?: string) {
  const event = new CustomEvent("show-toast", {
    detail: { type, title, description },
  })
  window.dispatchEvent(event)
}

export function ToastNotification() {
  const { toast } = useToast()

  useEffect(() => {
    const handleToast = (e: Event) => {
      const { type, title, description } = (e as CustomEvent).detail

      const icons = {
        success: CheckCircle,
        error: AlertCircle,
        info: Info,
      }

      const Icon = icons[type as ToastType]

      toast({
        title: (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            {title}
          </div>
        ),
        description,
        variant: type === "error" ? "destructive" : "default",
      })
    }

    window.addEventListener("show-toast", handleToast)
    return () => window.removeEventListener("show-toast", handleToast)
  }, [toast])

  return null
}
