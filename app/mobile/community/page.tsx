"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, Grid3X3, Users, Layers, Bell, Settings, TrendingUp } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

const communities = [
  {
    id: "digital",
    name: "Digital",
    description: "Arte digital y diseño",
    members: 2847,
    artworks: 12456,
    trending: true,
    color1: "#5B8FD9",
    color2: "#5B8FD9",
  },
  {
    id: "pixel",
    name: "Pixel",
    description: "Arte pixel y retro gaming",
    members: 1523,
    artworks: 5678,
    trending: false,
    color1: "#D97B6B",
    color2: "#D97B6B",
  },
  {
    id: "pixelb",
    name: "Pixel B",
    description: "Pixel art avanzado",
    members: 892,
    artworks: 3421,
    trending: true,
    color1: "#9B7FD9",
    color2: "#9B7FD9",
  },
]

export default function MobileCommunityPage() {
  const [activeTab, setActiveTab] = useState("categories")

  return (
    <div className="min-h-screen bg-[#FAF7F5] pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#FAF7F5] border-b border-[#E8E3DF] px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#E8E3DF] flex items-center justify-center">
              <span className="text-lg font-medium text-[#E89B8F]">U</span>
            </div>
            <h1 className="text-xl font-semibold text-[#3D3935]">Comunidad</h1>
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
      </div>

      <div className="p-4 space-y-4">
        {/* Link Ir al inicio */}
        <Link href="/mobile" className="text-sm text-[#E89B8F] underline">
          Ir al inicio
        </Link>

        {/* Tabs */}
        <div className="flex gap-2 bg-[#F0EDEB] p-1 rounded-full">
          <button
            onClick={() => setActiveTab("categories")}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "categories" ? "bg-white text-[#3D3935] shadow-sm" : "text-[#9B8B80] hover:text-[#3D3935]"
            }`}
          >
            Categorías
          </button>
          <button
            onClick={() => setActiveTab("discussions")}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "discussions" ? "bg-white text-[#3D3935] shadow-sm" : "text-[#9B8B80] hover:text-[#3D3935]"
            }`}
          >
            Discusiones
          </button>
          <button
            onClick={() => setActiveTab("artists")}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeTab === "artists" ? "bg-white text-[#3D3935] shadow-sm" : "text-[#9B8B80] hover:text-[#3D3935]"
            }`}
          >
            Artistas
          </button>
        </div>

        {/* Comunidades */}
        {activeTab === "categories" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#3D3935]">Comunidades</h2>
              <Badge className="bg-[#F0EDEB] text-[#6B6560] border-0 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            </div>

            <div className="space-y-3">
              {communities.map((community) => (
                <Card key={community.id} className="p-4 border-[#E8E3DF] bg-white hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    {/* Iconos de la comunidad */}
                    <div className="flex gap-2 flex-shrink-0">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: community.color1 }}
                      >
                        <Zap className="h-7 w-7 text-white" />
                      </div>
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: community.color2 }}
                      >
                        <Grid3X3 className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    {/* Info de la comunidad */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-[#3D3935]">{community.name}</h3>
                        {community.trending && (
                          <Badge className="bg-[#E89B8F] text-white border-0 text-xs px-2 py-0 h-5">Hot</Badge>
                        )}
                      </div>
                      <p className="text-sm text-[#9B8B80] mb-2">{community.description}</p>

                      <div className="flex items-center gap-4 text-xs text-[#9B8B80]">
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          <span>{community.members.toLocaleString()} miembros</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Layers className="h-3 w-3" />
                          <span>{community.artworks.toLocaleString()} obras</span>
                        </div>
                      </div>
                    </div>

                    {/* Botón Unirse */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-shrink-0 rounded-full border-[#E8E3DF] text-[#6B6560] hover:bg-[#F0EDEB] hover:text-[#3D3935] bg-transparent"
                    >
                      Unirse
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navegación inferior */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#E8E3DF] px-6 py-3">
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
          <button className="flex flex-col items-center gap-1 text-[#9B8B80] hover:text-[#3D3935] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <span className="text-xs">Buscar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#9B8B80] hover:text-[#3D3935] transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xs">Crear</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-[#E89B8F] transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-xs font-medium">Chat</span>
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
