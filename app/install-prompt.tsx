"use client"

import { useState, useEffect } from "react"
import { Download, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)

      // Check if user has dismissed before
      const dismissed = localStorage.getItem("art_nest_install_dismissed")
      if (!dismissed) {
        setShowPrompt(true)
      }
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowPrompt(false)
    }

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("[v0] User accepted the install prompt")
    }

    setDeferredPrompt(null)
    setShowPrompt(false)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem("art_nest_install_dismissed", "true")
  }

  if (!showPrompt) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 md:left-auto md:right-4 md:w-96">
      <div className="bg-card border-2 border-primary rounded-2xl shadow-2xl p-4 animate-in slide-in-from-bottom-5">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-primary/10">
            <Download className="h-5 w-5 text-primary" />
          </div>

          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Instala ART NEST</h3>
            <p className="text-xs text-muted-foreground mb-3">
              Instala la app en tu teléfono para acceso rápido y funcionalidad offline
            </p>

            <div className="flex gap-2">
              <Button size="sm" onClick={handleInstall} className="flex-1">
                Instalar
              </Button>
              <Button size="sm" variant="ghost" onClick={handleDismiss}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
