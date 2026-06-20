"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Store, ShoppingBag, X } from 'lucide-react'
import { CartIcon } from "@/components/cart-icon"

interface MobileMenuProps {
  categories?: string[]
  currentCategory?: string
  showVendorsLink?: boolean
  showProductsLink?: boolean
}

export function MobileMenu({ 
  categories = [], 
  currentCategory,
  showVendorsLink = true,
  showProductsLink = false
}: MobileMenuProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex items-center gap-2 md:hidden">
      <CartIcon />
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px] sm:w-[400px] p-6">
          <div className="flex flex-col gap-6 mt-6">
            {/* Navigation Links */}
            <div className="flex flex-col gap-3">
              <h3 className="font-semibold text-lg mb-2">Navegación</h3>
              {showVendorsLink && (
                <Button variant="outline" asChild onClick={() => setOpen(false)}>
                  <Link href="/vendors" className="gap-2 justify-start">
                    <Store className="h-4 w-4" />
                    Ver Tiendas
                  </Link>
                </Button>
              )}
              {showProductsLink && (
                <Button variant="outline" asChild onClick={() => setOpen(false)}>
                  <Link href="/marketplace" className="gap-2 justify-start">
                    <ShoppingBag className="h-4 w-4" />
                    Ver Productos
                  </Link>
                </Button>
              )}
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <a href="/auth/login" className="justify-start">Iniciar Sesión</a>
              </Button>
              <Button variant="outline" asChild onClick={() => setOpen(false)}>
                <a href="/auth/signup" className="justify-start">Unirse</a>
              </Button>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div className="flex flex-col gap-3">
                <h3 className="font-semibold text-lg mb-2">Categorías</h3>
                <Button 
                  variant={!currentCategory ? "default" : "ghost"} 
                  asChild 
                  onClick={() => setOpen(false)}
                  className="justify-start"
                >
                  <Link href="/marketplace">Todos</Link>
                </Button>
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    variant={currentCategory === category ? "default" : "ghost"} 
                    asChild
                    onClick={() => setOpen(false)}
                    className="justify-start"
                  >
                    <Link href={`/marketplace?category=${encodeURIComponent(category)}`}>
                      {category}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
