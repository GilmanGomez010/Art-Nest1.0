"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LogOut,
  Palette,
  Brush,
  ImageIcon,
  Users,
  Heart,
  MessageCircle,
  Share2,
  Plus,
  Settings,
  Bell,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { AuthGuard } from "@/components/auth-guard"

function DashboardContent() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("gallery")

  const handleLogout = () => {
    logout()
  }

  const artworks = [
    {
      id: 1,
      title: "Sunset Dreams",
      image: "/abstract-sunset.png",
      likes: 24,
      comments: 8,
      category: "Pintura",
    },
    {
      id: 2,
      title: "Urban Sketches",
      image: "/urban-city-sketch.jpg",
      likes: 18,
      comments: 5,
      category: "Dibujo",
    },
    {
      id: 3,
      title: "Digital Harmony",
      image: "/digital-art-colorful.jpg",
      likes: 32,
      comments: 12,
      category: "Digital",
    },
    {
      id: 4,
      title: "Nature's Palette",
      image: "/nature-landscape-painting.png",
      likes: 45,
      comments: 15,
      category: "Pintura",
    },
  ]

  const stats = [
    { label: "Obras", value: "12", icon: ImageIcon },
    { label: "Seguidores", value: "248", icon: Users },
    { label: "Me gusta", value: "1.2k", icon: Heart },
    { label: "Comentarios", value: "89", icon: MessageCircle },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative w-10 h-10">
                <Image src="/art-nest-logo.png" alt="ART NEST" fill className="object-contain" />
              </div>
              <h1 className="text-2xl font-bold">
                <span className="text-primary">ART NEST</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Profile Section */}
        <div className="mb-8">
          <Card className="glass-effect">
            <CardContent className="p-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/artist-profile.png" />
                  <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                    {user?.firstName?.[0]}
                    {user?.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h2 className="text-3xl font-bold">
                      {user?.firstName} {user?.lastName}
                    </h2>
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      <Palette className="w-3 h-3 mr-1" />
                      Artista
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Bienvenido a tu espacio creativo en ART NEST. Aquí puedes gestionar tus obras, conectar con otros
                    artistas y hacer crecer tu comunidad.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center p-3 rounded-lg bg-muted/50">
                        <stat.icon className="w-5 h-5 mx-auto mb-1 text-primary" />
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-sm text-muted-foreground">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="gallery">Mi Galería</TabsTrigger>
            <TabsTrigger value="community">Comunidad</TabsTrigger>
            <TabsTrigger value="tools">Herramientas</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-semibold">Mis Obras</h3>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Subir Obra
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artworks.map((artwork) => (
                <Card key={artwork.id} className="group hover:shadow-lg transition-all duration-300">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg">
                    <Image
                      src={artwork.image || "/placeholder.svg"}
                      alt={artwork.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold truncate">{artwork.title}</h4>
                      <Badge variant="outline" className="text-xs">
                        {artwork.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {artwork.likes}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {artwork.comments}
                      </div>
                      <Button variant="ghost" size="sm" className="ml-auto p-1">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Comunidad ART NEST
                </CardTitle>
                <CardDescription>Conecta con otros artistas, comparte ideas y encuentra inspiración</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Users className="w-6 h-6" />
                    Explorar Artistas
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <MessageCircle className="w-6 h-6" />
                    Foros de Arte
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Palette className="w-6 h-6" />
                    Desafíos Creativos
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
                    <Share2 className="w-6 h-6" />
                    Colaboraciones
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <Card className="glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brush className="w-5 h-5" />
                  Herramientas Creativas
                </CardTitle>
                <CardDescription>Recursos y herramientas para potenciar tu creatividad</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Palette className="w-8 h-8" />
                    <span>Paleta de Colores</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <ImageIcon className="w-8 h-8" />
                    <span>Editor de Imágenes</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2 bg-transparent">
                    <Brush className="w-8 h-8" />
                    <span>Pinceles Digitales</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <AuthGuard requireAuth={true}>
      <DashboardContent />
    </AuthGuard>
  )
}
