"use client"

import { useState } from "react"
import { X, ZoomIn, Heart, MessageCircle, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Publication } from "@/lib/models/publication"

interface ImageGalleryProps {
  publications: Publication[]
  onLike?: (id: string) => void
  onComment?: (id: string) => void
  columns?: number
}

export default function ImageGallery({ publications, onLike, onComment, columns = 2 }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<Publication | null>(null)

  return (
    <>
      <div
        className={`grid gap-4 ${
          columns === 2 ? "grid-cols-2" : columns === 3 ? "grid-cols-3" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="group relative aspect-square rounded-xl overflow-hidden bg-muted cursor-pointer"
            onClick={() => setSelectedImage(pub)}
          >
            <img src={pub.imageUrl || "/placeholder.svg"} alt={pub.title} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">{pub.title}</h3>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {pub.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {pub.comments}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {pub.views}
                  </span>
                </div>
              </div>

              <div className="absolute top-4 right-4">
                <Button size="icon" variant="secondary" className="rounded-full">
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <Button
              size="icon"
              variant="ghost"
              className="absolute -top-12 right-0 text-white hover:bg-white/10"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="bg-background rounded-xl overflow-hidden">
              <img
                src={selectedImage.imageUrl || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full max-h-[70vh] object-contain bg-muted"
              />

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                    <p className="text-muted-foreground">{selectedImage.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={selectedImage.userAvatar || "/placeholder.svg"}
                    alt={selectedImage.userName}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{selectedImage.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedImage.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t">
                  <Button variant="outline" size="sm" onClick={() => onLike?.(selectedImage.id)} className="flex-1">
                    <Heart className="h-4 w-4 mr-2" />
                    {selectedImage.likes} Me gusta
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => onComment?.(selectedImage.id)} className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {selectedImage.comments} Comentarios
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
