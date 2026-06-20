"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"

export default function VendorLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Starting vendor login process")
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      console.log("[v0] Attempting sign in with email:", email)
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log("[v0] Sign in response:", { data, error: signInError })

      if (signInError) {
        console.error("[v0] Sign in error:", signInError)
        throw signInError
      }

      if (!data.user) {
        console.error("[v0] No user data returned")
        throw new Error("No se pudo obtener información del usuario")
      }

      console.log("[v0] User signed in successfully, ID:", data.user.id)

      console.log("[v0] Checking for vendor profile...")
      const { data: vendorData, error: vendorError } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", data.user.id)
        .maybeSingle()

      console.log("[v0] Vendor query response:", { vendorData, vendorError })

      if (vendorError) {
        console.error("[v0] Vendor query error:", vendorError)
        throw new Error(`Error al verificar perfil de vendedor: ${vendorError.message}`)
      }

      if (!vendorData) {
        console.log("[v0] No vendor profile found, redirecting to setup")
        window.location.href = "/vendor-auth/setup"
        return
      }

      console.log("[v0] Vendor profile found, redirecting to dashboard")
      window.location.href = "/vendor/dashboard"
    } catch (error: unknown) {
      console.error("[v0] Login error:", error)
      setError(error instanceof Error ? error.message : "Error al iniciar sesión")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Button variant="ghost" asChild className="absolute top-4 left-4">
        <Link href="/marketplace" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver
        </Link>
      </Button>

      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Iniciar Sesión como Vendedor</CardTitle>
            <CardDescription>Ingresa tus credenciales para acceder a tu panel de vendedor</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email" className="leading-6">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="vendedor@ejemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    title="Por favor ingresa un email válido. Ejemplo: vendedor@ejemplo.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="leading-6">
                    Contraseña
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link href="/vendor-auth/register" className="underline underline-offset-4 text-foreground">
                  Registrarse
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
