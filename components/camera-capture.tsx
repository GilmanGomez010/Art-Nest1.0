"use client"

import { useState, useRef } from "react"
import { Camera, X, RotateCw, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CameraCaptureProps {
  onCapture: (imageData: string) => void
  onClose: () => void
}

export function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [facingMode, setFacingMode] = useState<"user" | "environment">("environment")
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode },
        audio: false,
      })
      setStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      alert("No se pudo acceder a la cámara. Por favor verifica los permisos.")
    }
  }

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL("image/jpeg", 0.8)
        setCapturedImage(imageData)
        stopCamera()
      }
    }
  }

  const switchCamera = () => {
    stopCamera()
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"))
    setTimeout(startCamera, 100)
  }

  const retakePhoto = () => {
    setCapturedImage(null)
    startCamera()
  }

  const confirmPhoto = () => {
    if (capturedImage) {
      onCapture(capturedImage)
      stopCamera()
      onClose()
    }
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  // Start camera on mount
  useState(() => {
    startCamera()
    return () => stopCamera()
  })

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative h-full w-full">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/50 to-transparent">
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:bg-white/20">
            <X className="h-6 w-6" />
          </Button>
          {!capturedImage && (
            <Button variant="ghost" size="icon" onClick={switchCamera} className="text-white hover:bg-white/20">
              <RotateCw className="h-6 w-6" />
            </Button>
          )}
        </div>

        {/* Camera view or captured image */}
        {capturedImage ? (
          <img src={capturedImage || "/placeholder.svg"} alt="Captured" className="h-full w-full object-cover" />
        ) : (
          <>
            <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center justify-center gap-8 p-8 bg-gradient-to-t from-black/50 to-transparent">
          {capturedImage ? (
            <>
              <Button
                size="lg"
                variant="outline"
                onClick={retakePhoto}
                className="rounded-full bg-white/20 text-white border-white/50 hover:bg-white/30"
              >
                Volver a tomar
              </Button>
              <Button
                size="lg"
                onClick={confirmPhoto}
                className="rounded-full bg-primary text-white hover:bg-primary/90"
              >
                <Check className="h-5 w-5 mr-2" />
                Usar foto
              </Button>
            </>
          ) : (
            <Button
              size="icon"
              onClick={capturePhoto}
              className="h-20 w-20 rounded-full bg-white hover:bg-white/90 border-4 border-white/50"
            >
              <Camera className="h-8 w-8 text-black" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
