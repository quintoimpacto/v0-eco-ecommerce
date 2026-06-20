"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { CartIcon } from "@/components/cart-icon"
import { ProductGallery } from "@/components/product-gallery"
import { StarRating } from "@/components/star-rating"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Store, Package, ShoppingCart, CreditCard, Truck, Shield } from "lucide-react"
import Link from "next/link"
import { ImageFallback } from "@/components/image-fallback"

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const { addItem } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function loadProduct() {
      const { id } = await params
      const supabase = createClient()

      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          vendors!products_vendor_id_fkey(
            id,
            store_name,
            logo_url,
            description,
            sustainability_score,
            total_certifications
          )
        `)
        .eq("id", id)
        .single()

      if (!error && data) {
        setProduct(data)
      }
      setLoading(false)
    }

    loadProduct()
  }, [params])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      vendor_id: product.vendors?.id || "",
      category: product.category || undefined,
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  const handleQuickBuy = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      vendor_id: product.vendors?.id || "",
      category: product.category || undefined,
    })

    router.push("/cart")
  }

  if (loading) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Cargando...</div>
  }

  if (!product) {
    return <div className="min-h-screen bg-background flex items-center justify-center">Producto no encontrado</div>
  }

  const vendor = product.vendors

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/marketplace">← Volver al Marketplace</Link>
            </Button>
            <CartIcon />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <ProductGallery
            productName={product.name}
            mainImage={product.image_url || "/test/cloth/cloth_1.png"}
            category={product.category}
          />

          {/* Product Info */}
          <div className="space-y-6">
            {product.category && (
              <Badge
                className={
                  product.category === "Moda"
                    ? "bg-yellow-500 text-black"
                    : product.category === "Electrónica"
                      ? "bg-blue-500 text-white"
                      : product.category === "Bienestar"
                        ? "bg-[#8e24aa] text-white"
                        : product.category === "Alimentos"
                          ? "bg-orange-500 text-white"
                          : product.category === "Hogar"
                            ? "bg-yellow-500 text-black"
                            : "bg-primary"
                }
              >
                {product.category}
              </Badge>
            )}

            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
              {product.rating > 0 && (
                <StarRating rating={product.rating} size="lg" reviewCount={product.review_count} className="mb-3" />
              )}
              <p className="text-xl text-muted-foreground">{product.description}</p>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-foreground">${product.price.toFixed(2)}</span>
            </div>

            {/* Payment Methods Information Section */}
            <Card className="border-muted-foreground/20 bg-background">
              <CardContent className="p-3 space-y-2">
                {/* Payment Methods */}
                <div className="flex items-start gap-2">
                  <CreditCard className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Medios de pago</p>
                    <p className="text-xs text-muted-foreground">Tarjetas de crédito y débito</p>
                  </div>
                </div>

                {/* Installments */}
                <div className="flex items-start gap-2 pt-2 border-t border-muted-foreground/10">
                  <Shield className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">Hasta 12 cuotas sin interés</p>
                  </div>
                </div>

                {/* Shipping */}
                <div className="flex items-start gap-2 pt-2 border-t border-muted-foreground/10">
                  <Truck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-foreground">
                      {product.price >= 50 ? (
                        <span className="text-green-600">Envío gratis</span>
                      ) : (
                        "Envío a todo el país"
                      )}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stock Info */}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Package className="h-4 w-4" />
              <span>{product.stock > 0 ? `${product.stock} unidades disponibles` : "Sin stock"}</span>
            </div>

            {/* Add to Cart Button */}
            <div className="flex gap-3">
              <Button size="lg" className="flex-1" disabled={product.stock === 0} onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock > 0 ? "Agregar al Carrito" : "Sin Stock"}
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="flex-1"
                disabled={product.stock === 0}
                onClick={handleQuickBuy}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Compra Rápida
              </Button>
            </div>

            {/* Vendor Info */}
            {vendor && (
              <Card className="bg-white border-sidebar-accent">
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center gap-3">
                    {vendor.logo_url && (
                      <div className="relative h-12 w-12 rounded-full overflow-hidden bg-background">
                        <ImageFallback
                          src={vendor.logo_url || "/placeholder.svg"}
                          alt={vendor.store_name}
                          fill
                          className="object-cover"
                          fallbackText={vendor.store_name}
                        />
                      </div>
                    )}
                    {/* </CHANGE> */}
                    <div className="flex-1">
                      <Link
                        href={`/vendor/${vendor.id}`}
                        className="text-base font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        {vendor.store_name}
                      </Link>
                      <p className="text-xs text-muted-foreground">{vendor.description}</p>
                    </div>
                  </div>

                  {vendor.sustainability_score > 0 && (
                    <div className="flex items-center gap-2 pt-3 border-t">
                      <Award className="h-4 w-4 text-primary" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-foreground">
                            {vendor.sustainability_score.toFixed(1)}
                          </span>
                          <span className="text-xs text-muted-foreground">/5.0</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Índice de Sustentabilidad</p>
                      </div>
                      {vendor.total_certifications > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {vendor.total_certifications} certificaciones
                        </Badge>
                      )}
                    </div>
                  )}

                  <Button variant="outline" className="w-full bg-transparent text-sm" asChild>
                    <Link href={`/vendor/${vendor.id}`} className="gap-2">
                      <Store className="h-4 w-4" />
                      Visitar Tienda
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
