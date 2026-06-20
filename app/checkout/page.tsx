"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const { items, total, itemCount, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "¡Pedido confirmado!",
      description: `Tu pedido de ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'} ha sido procesado exitosamente.`,
    })

    clearCart()
    setIsProcessing(false)
    router.push('/marketplace')
  }

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
              <h1 className="text-2xl font-bold text-foreground">No hay productos para pagar</h1>
              <p className="text-muted-foreground">
                Agrega productos al carrito para continuar con tu compra
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
            <Link href="/cart" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al Carrito
            </Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Finalizar Compra</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card className="border-gray-300">
                <CardHeader>
                  <CardTitle>Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="leading-6">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="tu@email.com"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                      title="Por favor ingresa un email válido. Ejemplo: tu@email.com"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="leading-6">Nombre *</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="Juan"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="leading-6">Apellido *</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Pérez"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="phone" className="leading-6">Teléfono *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+54 11 1234-5678"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="border-gray-300">
                <CardHeader>
                  <CardTitle>Dirección de Envío</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="address" className="leading-6">Dirección *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Calle Falsa 123"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="leading-6">Ciudad *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Buenos Aires"
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="leading-6">Código Postal *</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                        placeholder="1234"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-gray-300">
                <CardHeader>
                  <CardTitle>Método de Pago</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-muted rounded-lg text-center text-muted-foreground">
                    El pago se procesará al recibir el pedido
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4 border-gray-300">
                <CardHeader>
                  <CardTitle>Resumen del Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Products List */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative h-16 w-16 rounded overflow-hidden bg-muted shrink-0">
                          <Image
                            src={
                              item.image_url ||
                              `/placeholder.svg?height=64&width=64&query=${encodeURIComponent(
                                `${item.name || "/placeholder.svg"} product photography on white background`
                              )}`
                            }
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground line-clamp-2">{item.name}</p>
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-sm text-muted-foreground">x{item.quantity}</span>
                            <span className="text-sm font-semibold text-black">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal</span>
                      <span className="text-foreground">${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Envío</span>
                      <span className="text-green-600 font-medium">Gratis</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-foreground">Total</span>
                        <span className="text-black">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing ? "Procesando..." : "Confirmar Pedido"}
                  </Button>

                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> Compra segura sin necesidad de registrarse
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="text-green-600">✓</span> Envío gratis en todos los pedidos
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
