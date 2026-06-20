import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, User, Settings, LogOut, Package } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function OrdersPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  const { data: orders } = await supabase
    .from("orders")
    .select(`
      *,
      products(name, image_url, price),
      vendors(store_name)
    `)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/marketplace" className="flex items-center">
              <Image src="/logo-ecohouse.png" alt="EcoHouse" width={180} height={40} priority className="h-10 w-auto" />
            </Link>
            <nav className="flex gap-4 items-center">
              <Button variant="outline" asChild>
                <Link href="/marketplace">Marketplace</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle>{profile?.full_name || "Usuario"}</CardTitle>
                    <CardDescription>{profile?.email}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Mi Perfil
                  </Link>
                  <Link
                    href="/profile/orders"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Mis Pedidos
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Settings className="h-4 w-4" />
                    Configuración
                  </Link>
                  <form action="/api/auth/signout" method="post">
                    <Button
                      type="submit"
                      variant="ghost"
                      className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <LogOut className="h-4 w-4" />
                      Cerrar Sesión
                    </Button>
                  </form>
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Pedidos</CardTitle>
                <CardDescription>Todos tus pedidos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                {orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order: any) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Pedido #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.created_at).toLocaleDateString("es-ES", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                          </div>
                          <Badge variant={order.status === "completed" ? "default" : "secondary"}>
                            {order.status === "pending"
                              ? "Pendiente"
                              : order.status === "completed"
                                ? "Completado"
                                : order.status}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-muted rounded-md overflow-hidden flex-shrink-0">
                            {order.products?.image_url ? (
                              <Image
                                src={order.products.image_url || "/placeholder.svg"}
                                alt={order.products.name}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package className="h-8 w-8 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{order.products?.name}</h3>
                            <p className="text-sm text-muted-foreground mb-1">Tienda: {order.vendors?.store_name}</p>
                            <p className="text-sm text-muted-foreground">
                              Cantidad: {order.quantity} × ${order.unit_price}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold">${order.total_price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No tienes pedidos</h3>
                    <p className="text-muted-foreground mb-6">Comienza a explorar productos sostenibles</p>
                    <Button asChild>
                      <Link href="/marketplace">Ir al Marketplace</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
