import { createClient } from "@/lib/supabase/server"
import { VendorCard } from "@/components/vendor-card"
import { CartIcon } from "@/components/cart-icon"
import { MobileMenu } from "@/components/mobile-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ShoppingBag } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function VendorsPage() {
  const supabase = await createClient()

  // Fetch vendors sorted by sustainability score
  const { data: vendors, error } = await supabase
    .from("vendors")
    .select(`
      *,
      profiles!vendors_user_id_fkey(full_name, email),
      certifications(count)
    `)
    .order("sustainability_score", { ascending: false })

  if (error) {
    console.error("[v0] Error fetching vendors:", error)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/marketplace" className="flex items-center">
              <Image src="/logo-ecohouse.png" alt="EcoHouse" width={180} height={40} priority className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex gap-2">
              <CartIcon />
              <Button variant="outline" asChild>
                <Link href="/marketplace" className="gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  Ver Productos
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="/auth/login">Iniciar Sesión</a>
              </Button>
              <Button asChild>
                <a href="/auth/signup">Unirse</a>
              </Button>
            </div>
            <MobileMenu showProductsLink={true} showVendorsLink={false} />
          </div>
        </div>
      </header>

      {/* Search */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar vendedores..." className="pl-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Todos los Vendedores</h2>
          <p className="text-muted-foreground">Ranqueados por su índice de sustentabilidad</p>
        </div>

        {vendors && vendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vendors.map((vendor) => (
              <VendorCard key={vendor.id} vendor={vendor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No hay vendedores disponibles en este momento.</p>
          </div>
        )}
      </section>
    </div>
  )
}
