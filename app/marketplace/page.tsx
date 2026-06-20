import { createClient } from "@/lib/supabase/server"
import { ProductCard } from "@/components/product-card"
import { CategoryNav } from "@/components/category-nav"
import { CartIcon } from "@/components/cart-icon"
import { MobileMenu } from "@/components/mobile-menu"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Store } from "lucide-react"
import Link from "next/link"
import { SortSelect } from "@/components/sort-select"
import Image from "next/image"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  let supabase
  try {
    supabase = await createClient()
  } catch (error) {
    console.error("[v0] Failed to create Supabase client:", error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error de Configuración</h1>
          <p className="text-muted-foreground">
            No se pudo conectar a la base de datos. Por favor, intenta nuevamente.
          </p>
        </div>
      </div>
    )
  }

  const params = await searchParams
  const category = params.category as string | undefined
  const search = params.search as string | undefined
  const sort = params.sort as string | undefined

  let query = supabase
    .from("products")
    .select(`
      *,
      vendors!products_vendor_id_fkey(
        id,
        store_name,
        logo_url,
        sustainability_score,
        total_certifications
      )
    `)
    .eq("is_active", true)

  if (category) {
    query = query.eq("category", category)
  }

  if (search) {
    query = query.ilike("name", `%${search}%`)
  }

  if (sort === "price_asc") {
    query = query.order("price", { ascending: true })
  } else if (sort === "price_desc") {
    query = query.order("price", { ascending: false })
  } else if (sort === "most_sold") {
    query = query.order("created_at", { ascending: false })
  } else {
    query = query.order("created_at", { ascending: false })
  }

  const { data: products, error } = await query

  if (error) {
    console.error("[v0] Error fetching products:", error)
  }

  if (products && products.length > 0) {
    console.log("[v0] Products loaded:", products.length)
    console.log(
      "[v0] First 3 products with images:",
      products.slice(0, 3).map((p) => ({
        name: p.name,
        image_url: p.image_url,
      })),
    )
  }

  let sortedProducts = products || []

  if (sort === "most_sold" && products) {
    const { data: orderData } = await supabase.from("orders").select("product_id, quantity")

    const salesByProduct = new Map<string, number>()
    orderData?.forEach((order) => {
      const current = salesByProduct.get(order.product_id) || 0
      salesByProduct.set(order.product_id, current + order.quantity)
    })

    sortedProducts = [...products].sort((a, b) => {
      const aSales = salesByProduct.get(a.id) || 0
      const bSales = salesByProduct.get(b.id) || 0
      return bSales - aSales
    })
  }

  const { data: categories } = await supabase.from("products").select("category").not("category", "is", null)

  const uniqueCategories = categories ? Array.from(new Set(categories.map((c) => c.category).filter(Boolean))) : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/marketplace" className="flex items-center">
              <Image src="/logo-ecohouse.png" alt="EcoHouse" width={180} height={40} priority className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex gap-4 items-center">
              <CartIcon />
              <Button variant="outline" asChild>
                <Link href="/vendors" className="gap-2">
                  <Store className="h-4 w-4" />
                  Ver Tiendas
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="/auth/login">Iniciar Sesión</a>
              </Button>
              <Button asChild>
                <a href="/auth/signup">Unirse</a>
              </Button>
            </div>
            <MobileMenu categories={uniqueCategories} currentCategory={category} showVendorsLink={true} />
          </div>
        </div>
      </header>

      <div className="hidden md:block border-b bg-muted/30">
        <div className="container mx-auto">
          <CategoryNav categories={uniqueCategories} currentCategory={category} />
        </div>
      </div>

      {/* Search Section */}
      <section className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <form method="get" className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="search" defaultValue={search} placeholder="Buscar productos" className="pl-10" type="text" />
            </div>
            <SortSelect />
          </form>
        </div>
      </section>

      {/* Products Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">{category ? category : "Todos los Productos"}</h2>
          <p className="text-sm text-muted-foreground mt-1">{sortedProducts?.length || 0} productos encontrados</p>
        </div>

        {sortedProducts && sortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No se encontraron productos</p>
          </div>
        )}
      </section>
    </div>
  )
}
