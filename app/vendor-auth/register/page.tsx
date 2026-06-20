"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { ArrowLeft } from 'lucide-react'

export default function VendorRegisterPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/vendor-auth/setup`,
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        // Create profile
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: email,
          full_name: fullName,
          role: "vendor",
        })

        if (profileError) throw profileError

        // Redirect to vendor setup
        router.push("/vendor-auth/setup")
      }
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al registrarse")
    } finally {
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
            <CardTitle className="text-2xl">Registro de Vendedor</CardTitle>
            <CardDescription>Crea tu cuenta para comenzar a vender productos sustentables</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="fullName" className="leading-6">
                    Nombre Completo
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Tu nombre"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
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
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Mínimo 6 caracteres</p>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Registrando..." : "Crear Cuenta"}
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link href="/vendor-auth/login" className="underline underline-offset-4 text-foreground">
                  Iniciar Sesión
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
