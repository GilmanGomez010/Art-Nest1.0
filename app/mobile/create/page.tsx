"use client"

import { MobileLayout } from "@/components/mobile-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Upload, X, Plus, Tag, Globe, Users, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import ImageUpload from "@/components/image-upload"
import ApiService from "@/lib/services/api-service"
import type { Publication } from "@/lib/models/publication"

const categories = [
  { value: "Naranja", label: "Naranja", color: "#FF6B35" },
  { value: "Cielo", label: "Cielo", color: "#4A90E2" },
  { value: "Juegos", label: "Juegos", color: "#9B59B6" },
  { value: "Animal", label: "Animal", color: "#E67E22" },
  { value: "Digital", label: "Digital", color: "#3498DB" },
  { value: "Pixel", label: "Pixel", color: "#E74C3C" },
]

const suggestedTags = ["digital", "arte", "creativo", "diseño", "ilustración", "color", "abstracto", "moderno"]

export default function MobileCreatePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [isPublic, setIsPublic] = useState(true)
  const [allowComments, setAllowComments] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()
  const { user } = useAuth()
  const apiService = ApiService.getInstance()

  const handleImageSelect = (file: File, previewUrl: string) => {
    setSelectedFile(file)
    setSelectedImage(previewUrl)
  }

  const handleImageRemove = () => {
    setSelectedFile(null)
    setSelectedImage(null)
  }

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag) && tags.length < 10) {
      setTags([...tags, tag])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handlePublish = async () => {
    if (!selectedImage || !title || !category || !user) return

    setIsUploading(true)

    try {
      const newPublication: Omit<Publication, "id" | "createdAt" | "updatedAt"> = {
        title,
        description,
        imageUrl: selectedImage,
        imageFile: selectedFile || undefined,
        category,
        tags,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar || "/artist-profile.png",
        likes: 0,
        views: 0,
        comments: 0,
        isPublic,
      }

      await apiService.createPublication(newPublication)

      setShowSuccess(true)
      setTimeout(() => {
        router.push("/mobile/profile")
      }, 1500)
    } catch (error) {
      console.error("[v0] Error creating publication:", error)
      alert("Error al publicar. Por favor intenta de nuevo.")
    } finally {
      setIsUploading(false)
    }
  }

  if (showSuccess) {
    return (
      <MobileLayout title="Nueva publicación" showNav={false}>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-500" />
              </div>
            </div>
            <h2 className="text-2xl font-bold">¡Publicado con éxito!</h2>
            <p className="text-muted-foreground">Tu obra ha sido compartida con la comunidad</p>
          </div>
        </div>
      </MobileLayout>
    )
  }

  return (
    <MobileLayout title="Nueva publicación" showNav={false}>
      <div className="p-4 space-y-6 pb-8">
        <Card className="p-6">
          <div className="space-y-4">
            <Label className="text-base font-semibold">Subir imagen</Label>
            <ImageUpload
              onImageSelect={handleImageSelect}
              onImageRemove={handleImageRemove}
              currentImage={selectedImage || undefined}
            />
          </div>
        </Card>

        {/* Publication Details */}
        <Card className="p-6 space-y-4">
          <Label className="text-base font-semibold">Detalles de la publicación</Label>

          <div className="space-y-2">
            <Label htmlFor="title">Título *</Label>
            <Input
              id="title"
              placeholder="Describe tu publicación"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              placeholder="Cuéntanos sobre tu obra de arte..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label>Categoría *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Selecciona una categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Tags Section */}
        <Card className="p-6 space-y-4">
          <Label className="text-base font-semibold flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Etiquetas
          </Label>

          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Agregar etiqueta"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTag(newTag)}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => addTag(newTag)}
                disabled={!newTag || tags.length >= 10}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                    onClick={() => removeTag(tag)}
                  >
                    {tag}
                    <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm text-muted-foreground">Etiquetas sugeridas:</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTags
                  .filter((tag) => !tags.includes(tag))
                  .slice(0, 6)
                  .map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => addTag(tag)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6 space-y-4">
          <Label className="text-base font-semibold">Configuración de privacidad</Label>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Publicación pública</Label>
                  <p className="text-xs text-muted-foreground">Visible para todos los usuarios</p>
                </div>
              </div>
              <Switch checked={isPublic} onCheckedChange={setIsPublic} />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground" />
                <div>
                  <Label className="text-sm font-medium">Permitir comentarios</Label>
                  <p className="text-xs text-muted-foreground">Los usuarios pueden comentar</p>
                </div>
              </div>
              <Switch checked={allowComments} onCheckedChange={setAllowComments} />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            className="flex-1 bg-transparent"
            onClick={() => router.back()}
            disabled={isUploading}
          >
            Cancelar
          </Button>
          <Button
            className="flex-1"
            onClick={handlePublish}
            disabled={!selectedImage || !title || !category || isUploading}
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Publicando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Publicar
              </div>
            )}
          </Button>
        </div>
      </div>
    </MobileLayout>
  )
}
