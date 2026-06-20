"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { Package, Plus, Edit, Trash2, Eye, EyeOff, Store, BarChart3, LogOut } from 'lucide-react'
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  description: string
  price: number
  stock: number
  category: string
  is_active: boolean
  image_url: string | null
  created_at: string
}

interface Vendor {
  id: string
  store_name: string
  description: string
  sustainability_score: number
  total_certifications: number
}

export default function VendorDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [vendor, setVendor] = useState<Vendor | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const loadDashboard = async () => {
      const supabase = createClient()

      // Check auth
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/vendor-auth/login")
        return
      }

      // Get vendor profile
      const { data: vendorData, error: vendorError } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", user.id)
        .single()

      if (vendorError || !vendorData) {
        router.push("/vendor-auth/setup")
        return
      }

      setVendor(vendorData)

      // Get products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .eq("vendor_id", vendorData.id)
        .order("created_at", { ascending: false })

      if (productsError) {
        toast({
          title: "Error",
          description: "No se pudieron cargar los productos",
          variant: "destructive",
        })
      } else {
        setProducts(productsData || [])
      }

      setIsLoading(false)
    }

    loadDashboard()
  }, [router, toast])

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/marketplace")
  }

  const handleToggleActive = async (productId: string, currentState: boolean) => {
    const supabase = createClient()

    const { error } = await supabase
      .from("products")
      .update({ is_active: !currentState })
      .eq("id", productId)

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo actualizar el producto",
        variant: "destructive",
      })
    } else {
      setProducts(
        products.map((p) => (p.id === productId ? { ...p, is_active: !currentState } : p))
      )
      toast({
        title: "Producto actualizado",
        description: `El producto ahora está ${!currentState ? "activo" : "inactivo"}`,
      })
    }
  }

  const handleDelete = async (productId: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este producto?")) return

    const supabase = createClient()

    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto",
        variant: "destructive",
      })
    } else {
      setProducts(products.filter((p) => p.id !== productId))
      toast({
        title: "Producto eliminado",
        description: "El producto ha sido eliminado exitosamente",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Store className="h-6 w-6 text-primary" />
              <div>
                <h1 className="text-xl font-bold">{vendor?.store_name}</h1>
                <p className="text-sm text-muted-foreground">Panel de Vendedor</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" asChild>
                <Link href="/vendor/metrics">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Métricas
                </Link>
              </Button>
              <Button variant="ghost" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Productos</CardDescription>
              <CardTitle className="text-3xl">{products.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Productos Activos</CardDescription>
              <CardTitle className="text-3xl">{products.filter((p) => p.is_active).length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Puntuación Sustentabilidad</CardDescription>
              <CardTitle className="text-3xl">{vendor?.sustainability_score || 0}</CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Mis Productos</CardTitle>
                <CardDescription>Gestiona tu catálogo de productos</CardDescription>
              </div>
              <Button asChild>
                <Link href="/vendor/products/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Nuevo Producto
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No tienes productos</h3>
                <p className="text-muted-foreground mb-4">Comienza agregando tu primer producto</p>
                <Button asChild>
                  <Link href="/vendor/products/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Crear Producto
                  </Link>
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Producto</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id} className="hover:bg-gray-300">
                      <TableCell>
                        <div className="font-medium">{product.name}</div>
                      </TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>${product.price.toFixed(2)}</TableCell>
                      <TableCell>{product.stock}</TableCell>
                      <TableCell>
                        <Badge variant={product.is_active ? "default" : "secondary"}>
                          {product.is_active ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleToggleActive(product.id, product.is_active)}
                            title={product.is_active ? "Desactivar" : "Activar"}
                          >
                            {product.is_active ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </Button>
                          <Button variant="ghost" size="icon" asChild>
                            <Link href={`/vendor/products/${product.id}/edit`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
