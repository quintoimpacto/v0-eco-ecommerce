"use client"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from "react"
import { ArrowLeft, DollarSign, ShoppingCart, TrendingUp, Package } from 'lucide-react'

interface MetricsData {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  topProducts: Array<{
    name: string
    orders: number
    revenue: number
  }>
  recentOrders: Array<{
    id: string
    customer_name: string
    product_name: string
    quantity: number
    total_price: number
    created_at: string
    status: string
  }>
}

export default function VendorMetricsPage() {
  const [metrics, setMetrics] = useState<MetricsData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadMetrics = async () => {
      const supabase = createClient()

      // Check auth
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/vendor-auth/login")
        return
      }

      // Get vendor
      const { data: vendorData } = await supabase
        .from("vendors")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (!vendorData) {
        router.push("/vendor-auth/setup")
        return
      }

      // Get all orders with product details
      const { data: ordersData } = await supabase
        .from("orders")
        .select(`
          *,
          products (name)
        `)
        .eq("vendor_id", vendorData.id)
        .order("created_at", { ascending: false })

      if (ordersData) {
        // Calculate metrics
        const totalRevenue = ordersData.reduce((sum, order) => sum + Number(order.total_price), 0)
        const totalOrders = ordersData.length
        const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

        // Group by product for top products
        const productStats = ordersData.reduce(
          (acc, order) => {
            const productName = (order.products as any)?.name || "Producto Desconocido"
            if (!acc[productName]) {
              acc[productName] = { name: productName, orders: 0, revenue: 0 }
            }
            acc[productName].orders += 1
            acc[productName].revenue += Number(order.total_price)
            return acc
          },
          {} as Record<string, { name: string; orders: number; revenue: number }>
        )

        const topProducts = Object.values(productStats)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)

        // Recent orders
        const recentOrders = ordersData.slice(0, 10).map((order) => ({
          id: order.id,
          customer_name: order.customer_name,
          product_name: (order.products as any)?.name || "Producto Desconocido",
          quantity: order.quantity,
          total_price: Number(order.total_price),
          created_at: order.created_at,
          status: order.status,
        }))

        setMetrics({
          totalRevenue,
          totalOrders,
          averageOrderValue,
          topProducts,
          recentOrders,
        })
      }

      setIsLoading(false)
    }

    loadMetrics()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando métricas...</p>
      </div>
    )
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

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Métricas de Ventas</h1>
          <p className="text-muted-foreground">Analiza el rendimiento de tu tienda</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Totales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics?.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Órdenes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Valor Promedio</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${metrics?.averageOrderValue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Productos Vendidos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metrics?.recentOrders.reduce((sum, order) => sum + order.quantity, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Productos Más Vendidos</CardTitle>
              <CardDescription>Tus productos con mayor ingreso</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics?.topProducts && metrics.topProducts.length > 0 ? (
                <div className="space-y-4">
                  {metrics.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-medium">{product.name}</div>
                        <div className="text-sm text-muted-foreground">{product.orders} órdenes</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${product.revenue.toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No hay datos de ventas aún</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader>
              <CardTitle>Órdenes Recientes</CardTitle>
              <CardDescription>Últimas 10 órdenes recibidas</CardDescription>
            </CardHeader>
            <CardContent>
              {metrics?.recentOrders && metrics.recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {metrics.recentOrders.map((order) => (
                    <div key={order.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                      <div className="flex-1">
                        <div className="font-medium">{order.customer_name}</div>
                        <div className="text-sm text-muted-foreground">
                          {order.product_name} × {order.quantity}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${order.total_price.toFixed(2)}</div>
                        <div className="text-xs text-muted-foreground capitalize">{order.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">No hay órdenes recientes</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
