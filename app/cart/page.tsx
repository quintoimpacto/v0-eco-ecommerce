"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart()
  const router = useRouter()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-4">
            <Button variant="ghost" asChild>
              <Link href="/marketplace" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Volver al Marketplace
              </Link>
            </Button>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">Tu carrito está vacío</h1>
              <p className="text-muted-foreground">
                Agrega productos desde el marketplace para comenzar tu compra
              </p>
            </div>
            <Button asChild size="lg">
              <Link href="/marketplace">Explorar Productos</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href="/marketplace" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Marketplace
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-foreground">
                Carrito de Compras ({itemCount} {itemCount === 1 ? "producto" : "productos"})
              </h1>
              <Button variant="outline" onClick={clearCart} className="border-red-500 text-red-600 hover:bg-red-50 hover:text-red-700">
                Vaciar carrito
              </Button>
            </div>

            {items.map((item) => (
              <Card key={item.id} className="overflow-hidden border-gray-300">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`} className="shrink-0">
                      <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-muted">
                        <Image
                          src={
                            item.image_url ||
                            `/placeholder.svg?height=96&width=96&query=${encodeURIComponent(
                              `${item.name || "/placeholder.svg"} product photography on white background`
                            )}`
                          }
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div>
                        <Link
                          href={`/product/${item.id}`}
                          className="font-semibold text-foreground hover:underline line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        {item.category && (
                          <p className="text-sm text-muted-foreground mt-1">{item.category}</p>
                        )}
                      </div>

                      <div className="flex items-center justify-between gap-4 flex-wrap">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-12 text-center font-medium text-foreground">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-black">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-muted-foreground">${item.price.toFixed(2)} c/u</div>
                            )}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-100"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4 border-gray-300">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-foreground">Resumen del Pedido</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({itemCount} {itemCount === 1 ? "producto" : "productos"})</span>
                    <span className="text-foreground">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Envío</span>
                    <span className="text-green-600 font-medium">Gratis</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-black">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full" onClick={() => router.push("/checkout")}>
                    Proceder al Pago
                  </Button>
                  <Button variant="outline" size="lg" className="w-full" asChild>
                    <Link href="/marketplace">Continuar Comprando</Link>
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Envío gratis en todos los pedidos
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-green-600">✓</span> Productos eco-responsables certificados
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
