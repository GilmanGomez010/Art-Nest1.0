"use client"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Gamepad2, Palette, Cloud, Zap, Bell, Settings } from "lucide-react"
import { useState } from "react"

const searchCategories = [
  {
    id: "Naranja",
    name: "Naranja",
    color: "#FF8C69",
    bgColor: "#FFF0EB",
    icon: Palette,
  },
  {
    id: "Cielo",
    name: "Cielo",
    color: "#7BA3D9",
    bgColor: "#EBF3FF",
    icon: Cloud,
  },
  {
    id: "Juegos",
    name: "Juegos",
    color: "#9B8FD9",
    bgColor: "#F0EDFF",
    icon: Gamepad2,
  },
  {
    id: "Animal",
    name: "Animal",
    color: "#E89B5F",
    bgColor: "#FFF4E8",
    icon: Zap,
  },
]

const trendingTags = ["digital", "arte", "ilustración", "diseño", "abstracto", "color", "moderno", "creativo"]

export default function MobileSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-[#FAF7F5]">
      {/* Header personalizado */}
      <div className="sticky top-0 z-10 bg-[#FAF7F5] border-b border-[#E8E3DF] px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8E3DF] flex items-center justify-center">
              <span className="text-lg">←</span>
            </div>
            <h1 className="text-xl font-semibold text-[#3D3935]">Búsqueda</h1>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full hover:bg-[#E8E3DF] flex items-center justify-center transition-colors">
              <Bell className="h-5 w-5 text-[#6B6560]" />
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-[#E8E3DF] flex items-center justify-center transition-colors">
              <Settings className="h-5 w-5 text-[#6B6560]" />
            </button>
          </div>
        </div>

        {/* Search Input con fondo lavanda */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#9B8FD9]" />
          <Input
            placeholder="Buscar arte, artistas, etiquetas..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 pr-4 h-14 rounded-full bg-[#E8E3F5] border-0 text-[#6B6560] placeholder:text-[#9B8FD9]/60 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Buscar por categoría */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#3D3935]">Buscar por categoría</h3>
          <div className="grid grid-cols-2 gap-3">
            {searchCategories.map((category) => {
              const Icon = category.icon
              return (
                <Card
                  key={category.id}
                  className="p-4 cursor-pointer transition-all duration-200 hover:shadow-md border-[#E8E3DF] bg-white"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: category.bgColor }}
                    >
                      <Icon className="h-6 w-6" style={{ color: category.color }} />
                    </div>
                    <span className="font-medium text-[#3D3935]">{category.name}</span>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Etiquetas populares */}
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-[#3D3935]">Etiquetas populares</h3>
          <div className="flex flex-wrap gap-2">
            {trendingTags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-[#E8E3DF] transition-colors px-4 py-2 rounded-full bg-[#F0EDEB] text-[#6B6560] border-0 font-normal"
                onClick={() => setSearchQuery(tag)}
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Navegación inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E3DF] px-6 py-3 safe-area-inset-bottom">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <button className="flex flex-col items-center gap-1 text-[#9B8B80] hover:text-[#3D3935] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="text-xs">Inicio</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#E89B8F] transition-colors">
            <Search className="w-6 h-6" />
            <span className="text-xs font-medium">Buscar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#9B8B80] hover:text-[#3D3935] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs">Crear</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#9B8B80] hover:text-[#3D3935] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span className="text-xs">Charlar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#9B8B80] hover:text-[#3D3935] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )
}
