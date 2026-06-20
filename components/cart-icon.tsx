"use client"

import { useCart } from "@/contexts/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import Link from "next/link"

export function CartIcon() {
  const { itemCount } = useCart()

  return (
    <Button variant="outline" asChild className="relative">
      <Link href="/cart" className="gap-2">
        <ShoppingCart className="h-4 w-4" />
        <span className="hidden sm:inline">Carrito</span>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
            {itemCount}
          </span>
        )}
      </Link>
    </Button>
  )
}
