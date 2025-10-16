"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Upload, X, ImageIcon, Loader2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import ImageService from "@/lib/services/image-service"
import { CameraCapture } from "./camera-capture"

interface ImageUploadProps {
  onImageSelect: (file: File, previewUrl: string) => void
  onImageRemove: () => void
  currentImage?: string
  maxSize?: number
  className?: string
}

export default function ImageUpload({
  onImageSelect,
  onImageRemove,
  currentImage,
  maxSize = 5,
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showCamera, setShowCamera] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageService = ImageService.getInstance()

  const processImage = useCallback(
    async (file: File) => {
      setError(null)
      setIsProcessing(true)

      // Validate image
      const validation = imageService.validateImage(file)
      if (!validation.valid) {
        setError(validation.error || "Imagen no válida")
        setIsProcessing(false)
        return
      }

      try {
        // Compress image
        const compressedFile = await imageService.compressImage(file)

        // Create preview
        const result = await imageService.uploadImage(compressedFile)

        if (result.success && result.url) {
          setPreview(result.url)
          onImageSelect(compressedFile, result.url)
        } else {
          setError(result.error || "Error al procesar la imagen")
        }
      } catch (err) {
        setError("Error al procesar la imagen")
        console.error("[v0] Error processing image:", err)
      } finally {
        setIsProcessing(false)
      }
    },
    [imageService, onImageSelect],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImage(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files?.[0]
    if (file) {
      processImage(file)
    }
  }

  const handleRemove = () => {
    setPreview(null)
    setError(null)
    onImageRemove()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleCameraCapture = async (imageData: string) => {
    setIsProcessing(true)
    try {
      // Convert base64 to File
      const response = await fetch(imageData)
      const blob = await response.blob()
      const file = new File([blob], `camera-${Date.now()}.jpg`, { type: "image/jpeg" })

      await processImage(file)
    } catch (err) {
      setError("Error al procesar la foto")
      console.error("[v0] Error processing camera capture:", err)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className={`w-full ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {showCamera && <CameraCapture onCapture={handleCameraCapture} onClose={() => setShowCamera(false)} />}

      {!preview ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50"}
            ${isProcessing ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <div className="flex flex-col items-center gap-4">
            {isProcessing ? (
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            ) : (
              <div className="p-4 rounded-full bg-primary/10">
                <Upload className="h-8 w-8 text-primary" />
              </div>
            )}

            <div className="space-y-2">
              <p className="text-lg font-medium">
                {isProcessing ? "Procesando imagen..." : isDragging ? "Suelta la imagen aquí" : "Sube tu obra de arte"}
              </p>
              <p className="text-sm text-muted-foreground">Arrastra y suelta o haz clic para seleccionar</p>
              <p className="text-xs text-muted-foreground">JPG, PNG, GIF o WebP (máx. {maxSize}MB)</p>
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" size="sm" disabled={isProcessing}>
                <ImageIcon className="h-4 w-4 mr-2" />
                Seleccionar imagen
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={isProcessing}
                onClick={(e) => {
                  e.stopPropagation()
                  setShowCamera(true)
                }}
              >
                <Camera className="h-4 w-4 mr-2" />
                Tomar foto
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative rounded-xl overflow-hidden border-2 border-border group">
          <img
            src={preview || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-auto max-h-[400px] object-contain bg-muted"
          />

          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
            <Button type="button" variant="secondary" size="sm" onClick={handleClick}>
              <Upload className="h-4 w-4 mr-2" />
              Cambiar
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={(e) => {
                e.stopPropagation()
                setShowCamera(true)
              }}
            >
              <Camera className="h-4 w-4 mr-2" />
              Cámara
            </Button>
            <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
              <X className="h-4 w-4 mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
