"use client"

import type React from "react"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Store, ShoppingCart } from "lucide-react"
import ImageFallback from "@/components/image-fallback"
import { useCart } from "@/contexts/cart-context"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  product: {
    id: string
    name: string
    description: string | null
    price: number
    image_url: string | null
    category: string | null
    vendors: {
      id: string
      store_name: string
      logo_url: string | null
      sustainability_score: number
      total_certifications: number
    } | null
  }
}

export function ProductCard({ product }: ProductCardProps) {
  const vendor = product.vendors
  const { addItem } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      vendor_id: vendor?.id || "",
      category: product.category || undefined,
    })

    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })

    router.push("/cart")
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow border-gray-300 flex flex-col h-full">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <ImageFallback
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            fallbackText={product.name}
          />
          {product.category && (
            <Badge
              className={`absolute top-3 right-3 ${
                product.category.toLowerCase() === "moda"
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : product.category.toLowerCase() === "electrónica"
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : product.category.toLowerCase() === "bienestar"
                      ? "bg-[#8e24aa] text-white hover:bg-[#7b1fa2]"
                      : product.category.toLowerCase() === "alimentos"
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : product.category.toLowerCase() === "hogar"
                          ? "bg-yellow-500 text-black hover:bg-yellow-600"
                          : "bg-primary/90"
              }`}
            >
              {product.category}
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4 space-y-3 flex-1">
        <div>
          <Link href={`/product/${product.id}`}>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{product.description}</p>
        </div>

        {vendor && (
          <Link
            href={`/vendor/${vendor.id}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Store className="h-3 w-3" />
            <span className="line-clamp-1">{vendor.store_name}</span>
          </Link>
        )}

        {vendor && vendor.sustainability_score > 0 && (
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">{vendor.sustainability_score.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground">/5.0</span>
            </div>
            {vendor.total_certifications > 0 && (
              <Badge variant="outline" className="text-xs">
                {vendor.total_certifications} certificaciones
              </Badge>
            )}
          </div>
        )}
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-col gap-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-2xl font-bold text-foreground">${product.price.toFixed(2)}</span>
        </div>
        <Button className="w-full" size="sm" onClick={handleQuickBuy}>
          <ShoppingCart className="h-4 w-4 mr-2" />
          Compra Rápida
        </Button>
      </CardFooter>
    </Card>
  )
}
