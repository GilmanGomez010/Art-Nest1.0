"use client"

import { Home, Search, Plus, MessageCircle, User } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Inicio", href: "/mobile" },
  { icon: Search, label: "Buscar", href: "/mobile/search" },
  { icon: Plus, label: "Crear", href: "/mobile/create" },
  { icon: MessageCircle, label: "Chat", href: "/mobile/community" },
  { icon: User, label: "Perfil", href: "/mobile/profile" },
]

export function MobileNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-50">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <button
              key={item.href}
              onClick={() => router.push(item.href)}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-[60px]",
                isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-accent",
              )}
            >
              <Icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
