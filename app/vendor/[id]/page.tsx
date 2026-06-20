import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { VendorHeader } from "@/components/vendor-header"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface VendorPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VendorPage({ params }: VendorPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch vendor details
  const { data: vendor, error: vendorError } = await supabase
    .from("vendors")
    .select(`
      *,
      profiles!vendors_user_id_fkey(full_name, email)
    `)
    .eq("id", id)
    .single()

  if (vendorError || !vendor) {
    console.error("[v0] Error fetching vendor:", vendorError)
    notFound()
  }

  // Fetch vendor products
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("vendor_id", id)
    .eq("is_active", true)
    .order("created_at", { ascending: false })

  if (productsError) {
    console.error("[v0] Error fetching products:", productsError)
  }

  // Fetch certifications count
  const { count: certificationsCount } = await supabase
    .from("certifications")
    .select("*", { count: "exact", head: true })
    .eq("vendor_id", id)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/marketplace" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Marketplace
            </Link>
          </Button>
        </div>
      </nav>

      {/* Vendor Header */}
      <VendorHeader vendor={vendor} certificationsCount={certificationsCount || 0} />

      {/* Products Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground">Productos</h2>
          <p className="text-muted-foreground mt-1">Descubre los productos sustentables de esta tienda</p>
        </div>

        {products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="text-center py-12 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">Esta tienda aún no tiene productos disponibles.</p>
          </div>
        )}
      </section>
    </div>
  )
}
