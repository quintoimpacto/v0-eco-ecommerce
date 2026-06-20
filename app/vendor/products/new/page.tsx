"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const CATEGORIES = ["Moda", "Electrónica", "Hogar", "Bienestar", "Alimentos", "Otro"]

export default function NewProductPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [stock, setStock] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [vendorId, setVendorId] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

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

      const { data: vendorData } = await supabase.from("vendors").select("id").eq("user_id", user.id).single()

      if (!vendorData) {
        router.push("/vendor-auth/setup")
        return
      }

      setVendorId(vendorData.id)
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!vendorId) return

    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.from("products").insert({
        vendor_id: vendorId,
        name,
        description,
        price: Number.parseFloat(price),
        stock: Number.parseInt(stock),
        category,
        image_url: imageUrl || null,
        is_active: true,
      })

      if (error) throw error

      toast({
        title: "Producto creado",
        description: "El producto ha sido creado exitosamente",
      })

      router.push("/vendor/dashboard")
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "No se pudo crear el producto",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/vendor/dashboard" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Dashboard
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Nuevo Producto</CardTitle>
            <CardDescription>Completa la información del producto para agregarlo a tu catálogo</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="leading-6">
                    Nombre del Producto *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Ej: Camiseta Orgánica"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description" className="leading-6">
                    Descripción *
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe tu producto..."
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="price" className="leading-6">
                      Precio ($) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="29.99"
                      required
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="stock" className="leading-6">
                      Stock *
                    </Label>
                    <Input
                      id="stock"
                      type="number"
                      min="0"
                      placeholder="100"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="category" className="leading-6">
                    Categoría *
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="imageUrl" className="leading-6">
                    URL de Imagen
                  </Label>
                  <Input
                    id="imageUrl"
                    type="url"
                    placeholder="https://ejemplo.com/imagen.jpg"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Opcional: URL de la imagen del producto</p>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="submit" className="flex-1" disabled={isLoading}>
                    {isLoading ? "Creando..." : "Crear Producto"}
                  </Button>
                  <Button type="button" variant="outline" asChild>
                    <Link href="/vendor/dashboard">Cancelar</Link>
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
