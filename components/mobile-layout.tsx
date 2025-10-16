"use client"

import { cn } from "@/lib/utils"

import type React from "react"

import { useAuth } from "@/lib/auth"
import { MobileNav } from "./mobile-nav"
import { AuthGuard } from "./auth-guard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileLayoutProps {
  children: React.ReactNode
  title?: string
  showHeader?: boolean
  showNav?: boolean
}

export function MobileLayout({ children, title = "ArtNest", showHeader = true, showNav = true }: MobileLayoutProps) {
  const { user } = useAuth()

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-background">
        {showHeader && (
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
            <div className="flex items-center justify-between p-4 max-w-md mx-auto">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-lg font-semibold text-foreground">{title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
        )}

        <main
          className={cn(
            "max-w-md mx-auto",
            showNav && "pb-20", // Space for bottom navigation
            showHeader && "pt-0",
          )}
        >
          {children}
        </main>

        {showNav && <MobileNav />}
      </div>
    </AuthGuard>
  )
}
