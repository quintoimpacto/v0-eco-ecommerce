"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { Store } from 'lucide-react'

export default function VendorSetupPage() {
  const [storeName, setStoreName] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/vendor-auth/login")
        return
      }

      setUserId(user.id)

      // Check if vendor profile already exists
      const { data: vendorData } = await supabase.from("vendors").select("id").eq("user_id", user.id).single()

      if (vendorData) {
        router.push("/vendor/dashboard")
      }
    }

    checkAuth()
  }, [router])

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return

    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error: vendorError } = await supabase.from("vendors").insert({
        user_id: userId,
        store_name: storeName,
        description: description,
        sustainability_score: 0,
        total_certifications: 0,
      })

      if (vendorError) throw vendorError

      router.push("/vendor/dashboard")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al crear el perfil de vendedor")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <Store className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Configurar Perfil de Vendedor</h1>
              <p className="text-sm text-muted-foreground">Completa la información de tu tienda</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Información de la Tienda</CardTitle>
              <CardDescription>Esta información será visible para los clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSetup}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="storeName" className="leading-6">
                      Nombre de la Tienda *
                    </Label>
                    <Input
                      id="storeName"
                      type="text"
                      placeholder="Mi Tienda Eco"
                      required
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description" className="leading-6">
                      Descripción *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe tu tienda y los productos que ofreces..."
                      required
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">Cuéntale a tus clientes sobre tu enfoque sustentable</p>
                  </div>
                  {error && <p className="text-sm text-red-500">{error}</p>}
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Creando perfil..." : "Crear Perfil de Vendedor"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
