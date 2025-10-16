"use client"

import { useAuth } from "@/lib/auth"
import { Badge } from "@/components/ui/badge"
import { Grid3X3, Bookmark, Award, MapPin, Calendar, Share, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MobileProfilePage() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("saved")

  return (
    <div className="min-h-screen bg-[#FAF7F5] pb-20">
      {/* Header con avatar y stats */}
      <div className="bg-[#FAF7F5] px-4 pt-6 pb-4">
        <div className="flex justify-end gap-2 mb-6">
          <button className="w-10 h-10 rounded-full hover:bg-[#E8E3DF] flex items-center justify-center transition-colors">
            <Share className="h-5 w-5 text-[#6B6560]" />
          </button>
          <button className="w-10 h-10 rounded-full hover:bg-[#E8E3DF] flex items-center justify-center transition-colors">
            <Settings className="h-5 w-5 text-[#6B6560]" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center space-y-4">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden bg-[#E8E3DF]">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/female-artist-avatar-qXsrNKnjUJtloAKWdv9SYz6suWw4XG.jpg"
              alt="José"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Nombre y badges */}
          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#3D3935]">José</h1>
            <div className="flex items-center gap-2 justify-center">
              <Badge className="bg-[#F0EDEB] text-[#6B6560] border-0 rounded-full px-3 py-1">Diseño</Badge>
              <span className="text-sm text-[#9B8B80]">pixel</span>
            </div>
          </div>

          {/* Ubicación y fecha */}
          <div className="flex items-center gap-4 text-sm text-[#9B8B80]">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Madrid, España</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Se unió en 2023</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-8 pt-2">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3D3935]">0</div>
              <div className="text-xs text-[#9B8B80]">Obras</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3D3935]">1.2K</div>
              <div className="text-xs text-[#9B8B80]">Seguidores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3D3935]">456</div>
              <div className="text-xs text-[#9B8B80]">Siguiendo</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#3D3935]">0</div>
              <div className="text-xs text-[#9B8B80]">Gustos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-4 pt-4">
        <div className="flex gap-2 bg-[#F0EDEB] p-1 rounded-full mb-6">
          <button
            onClick={() => setActiveTab("works")}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-1 ${
              activeTab === "works" ? "bg-white text-[#3D3935] shadow-sm" : "text-[#9B8B80] hover:text-[#3D3935]"
            }`}
          >
            <Grid3X3 className="h-4 w-4" />
            Mis trabajos
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-1 ${
              activeTab === "saved" ? "bg-white text-[#3D3935] shadow-sm" : "text-[#9B8B80] hover:text-[#3D3935]"
            }`}
          >
            <Bookmark className="h-4 w-4" />
            Guardados
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`flex-1 px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-1 ${
              activeTab === "achievements" ? "bg-white text-[#3D3935] shadow-sm" : "text-[#9B8B80] hover:text-[#3D3935]"
            }`}
          >
            <Award className="h-4 w-4" />
            Logros
          </button>
        </div>

        {/* Contenido de Guardados (estado vacío) */}
        {activeTab === "saved" && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-[#F0EDEB] flex items-center justify-center mb-4">
              <Bookmark className="h-10 w-10 text-[#9B8B80]" />
            </div>
            <h3 className="text-lg font-semibold text-[#3D3935] mb-2">No hay obras guardadas</h3>
            <p className="text-sm text-[#9B8B80] max-w-xs">Guarda obras que te inspiren para verlas más tarde</p>
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
          <button className="flex flex-col items-center gap-1 text-[#E89B8F] transition-colors">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xs font-medium">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )
}
