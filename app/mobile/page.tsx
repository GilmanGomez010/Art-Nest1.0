"use client"

import { MobileLayout } from "@/components/mobile-layout"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import ApiService from "@/lib/services/api-service"
import type { Publication } from "@/lib/models/publication"
import ImageGallery from "@/components/image-gallery"

export default function MobileHomePage() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const apiService = ApiService.getInstance()

  useEffect(() => {
    loadPublications()
  }, [])

  const loadPublications = async () => {
    setIsLoading(true)
    try {
      const data = await apiService.getAllPublications()
      setPublications(data)
    } catch (error) {
      console.error("[v0] Error loading publications:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLike = async (id: string) => {
    try {
      const updated = await apiService.likePublication(id)
      if (updated) {
        setPublications((prev) => prev.map((pub) => (pub.id === id ? updated : pub)))
      }
    } catch (error) {
      console.error("[v0] Error liking publication:", error)
    }
  }

  if (isLoading) {
    return (
      <MobileLayout title="Destacado">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout title="Destacado">
      <div className="p-4 space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-foreground">ArtNest</h2>
          <p className="text-muted-foreground">Descubre arte increíble</p>
        </div>

        <ImageGallery publications={publications} onLike={handleLike} columns={2} />

        {/* Stats Section */}
        <Card className="p-4">
          <h3 className="font-semibold mb-3 text-foreground">Estadísticas de la comunidad</h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{publications.length}</div>
              <div className="text-xs text-muted-foreground">Publicaciones</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {publications.reduce((sum, pub) => sum + pub.likes, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Likes totales</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">
                {publications.reduce((sum, pub) => sum + pub.views, 0)}
              </div>
              <div className="text-xs text-muted-foreground">Vistas</div>
            </div>
          </div>
        </Card>
      </div>
    </MobileLayout>
  )
}
