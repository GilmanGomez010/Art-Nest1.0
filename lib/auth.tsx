"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterData) => Promise<{ success: boolean; error?: string }>
  requestPasswordReset: (email: string) => Promise<{ success: boolean; error?: string }>
  resetPassword: (email: string, code: string, newPassword: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  isLoading: boolean
}

interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [resetCodes, setResetCodes] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    const savedUser = localStorage.getItem("art-nest-user")
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
      } catch (error) {
        console.error("Error parsing saved user data:", error)
        localStorage.removeItem("art-nest-user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (email === "demo@artnest.com" && password === "demo123") {
        const userData: User = {
          id: "1",
          email: email,
          firstName: "Demo",
          lastName: "User",
          createdAt: new Date(),
        }

        setUser(userData)
        localStorage.setItem("art-nest-user", JSON.stringify(userData))
        return { success: true }
      }

      if (email && password.length >= 6) {
        const userData: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: email,
          firstName: email.split("@")[0],
          lastName: "Artist",
          createdAt: new Date(),
        }

        setUser(userData)
        localStorage.setItem("art-nest-user", JSON.stringify(userData))
        return { success: true }
      }

      return { success: false, error: "Credenciales inválidas" }
    } catch (error) {
      return { success: false, error: "Error de conexión" }
    }
  }

  const register = async (userData: RegisterData): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      if (userData.email && userData.password.length >= 6) {
        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          createdAt: new Date(),
        }

        setUser(newUser)
        localStorage.setItem("art-nest-user", JSON.stringify(newUser))
        return { success: true }
      }

      return { success: false, error: "Datos inválidos" }
    } catch (error) {
      return { success: false, error: "Error de conexión" }
    }
  }

  const requestPasswordReset = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      if (!email || !email.includes("@")) {
        return { success: false, error: "Email inválido" }
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString()

      const newResetCodes = new Map(resetCodes)
      newResetCodes.set(email, code)
      setResetCodes(newResetCodes)

      console.log(`[v0] Código de verificación para ${email}: ${code}`)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Error al enviar el código" }
    }
  }

  const resetPassword = async (
    email: string,
    code: string,
    newPassword: string,
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const savedCode = resetCodes.get(email)
      if (code !== "123456" && code !== savedCode) {
        return { success: false, error: "Código de verificación inválido" }
      }

      if (newPassword.length < 6) {
        return { success: false, error: "La contraseña debe tener al menos 6 caracteres" }
      }

      console.log(`[v0] Contraseña actualizada para ${email}`)

      const newResetCodes = new Map(resetCodes)
      newResetCodes.delete(email)
      setResetCodes(newResetCodes)

      return { success: true }
    } catch (error) {
      return { success: false, error: "Error al restablecer la contraseña" }
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("art-nest-user")
  }

  return (
    <AuthContext.Provider value={{ user, login, register, requestPasswordReset, resetPassword, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
