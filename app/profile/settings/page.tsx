import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { User, ShoppingBag, Settings, LogOut, Key, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function SettingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

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
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Mis Pedidos
                  </Link>
                  <Link
                    href="/profile/settings"
                    className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary/10 text-primary font-medium"
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
          <main className="md:col-span-2 space-y-6">
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  Cambiar Contraseña
                </CardTitle>
                <CardDescription>Actualiza tu contraseña regularmente para mayor seguridad</CardDescription>
              </CardHeader>
              <CardContent>
                <form action="/api/profile/change-password" method="post" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current_password">Contraseña Actual</Label>
                    <Input id="current_password" name="current_password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new_password">Nueva Contraseña</Label>
                    <Input id="new_password" name="new_password" type="password" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm_password">Confirmar Nueva Contraseña</Label>
                    <Input id="confirm_password" name="confirm_password" type="password" required />
                  </div>
                  <Button type="submit">Actualizar Contraseña</Button>
                </form>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notificaciones
                </CardTitle>
                <CardDescription>Gestiona cómo te comunicamos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Actualizaciones de Pedidos</p>
                      <p className="text-sm text-muted-foreground">
                        Recibe notificaciones sobre el estado de tus pedidos
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Ofertas y Promociones</p>
                      <p className="text-sm text-muted-foreground">Recibe información sobre ofertas especiales</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Desactivado
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Novedades de Productos</p>
                      <p className="text-sm text-muted-foreground">Entérate de nuevos productos sostenibles</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Activado
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Delete Account */}
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="text-destructive">Zona Peligrosa</CardTitle>
                <CardDescription>Acciones irreversibles en tu cuenta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Eliminar Cuenta</p>
                    <p className="text-sm text-muted-foreground">
                      Eliminar permanentemente tu cuenta y todos los datos
                    </p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  )
}
