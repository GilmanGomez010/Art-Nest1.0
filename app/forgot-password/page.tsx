"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const { requestPasswordReset } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const result = await requestPasswordReset(email)

    if (result.success) {
      setSuccess(true)
      // Redirigir a la página de reset después de 3 segundos
      setTimeout(() => {
        router.push(`/reset-password?email=${encodeURIComponent(email)}`)
      }, 3000)
    } else {
      setError(result.error || "Error al enviar el código")
    }

    setIsLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-6">
        <Card className="w-full max-w-md glass-effect shadow-xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold">Código Enviado</h2>
              <p className="text-muted-foreground">
                Hemos enviado un código de verificación a <strong>{email}</strong>
              </p>
              <p className="text-sm text-muted-foreground">Redirigiendo a la página de restablecimiento...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full art-gradient animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-24 h-24 rounded-full bg-accent/20 animate-bounce"></div>
      </div>

      <div className="w-full max-w-md p-6 space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 mb-4">
              <Image src="/art-nest-logo.png" alt="ART NEST Logo" fill className="object-contain" priority />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-balance">Recuperar Contraseña</h1>
            <p className="text-muted-foreground text-pretty">
              Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña
            </p>
          </div>
        </div>

        <Card className="glass-effect shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">¿Olvidaste tu contraseña?</CardTitle>
            <CardDescription className="text-center">No te preocupes, te ayudaremos a recuperarla</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-md">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-11 pl-10"
                  />
                </div>
              </div>

              <Button type="submit" className="w-full h-11 text-base font-medium" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin"></div>
                    Enviando código...
                  </div>
                ) : (
                  "Enviar Código de Verificación"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio de sesión
              </Link>
            </div>

            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <p className="text-xs text-muted-foreground text-center">
                <strong>Demo:</strong> Usa cualquier email válido para recibir un código de prueba
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-xs text-muted-foreground">
          <p>© 2025 ART NEST. Donde la creatividad encuentra su hogar.</p>
        </div>
      </div>
    </div>
  )
}
