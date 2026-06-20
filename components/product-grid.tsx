import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string | null
  stock: number
}

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  const getBadgeColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "moda":
        return "bg-yellow-500 text-black"
      case "electrónica":
        return "bg-blue-500 text-white"
      case "bienestar":
        return "bg-[#8e24aa] text-white"
      case "alimentos":
        return "bg-orange-500 text-white"
      case "hogar":
        return "bg-yellow-500 text-black"
      default:
        return "bg-primary text-primary-foreground"
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden group hover:shadow-lg transition-shadow border-gray-300 flex flex-col h-full"
        >
          <div className="relative h-56 bg-muted">
            {product.image_url ? (
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <Package className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}
            {product.category && (
              <Badge variant="secondary" className={`absolute top-3 left-3 ${getBadgeColor(product.category)}`}>
                {product.category}
              </Badge>
            )}
          </div>

          <CardContent className="p-4 flex-1">
            <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{product.description}</p>
            )}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-black">${product.price.toFixed(2)}</span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {product.stock > 0 ? (
                <span>Stock disponible: {product.stock}</span>
              ) : (
                <span className="text-destructive">Sin stock</span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button className="w-full" disabled={product.stock === 0}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
