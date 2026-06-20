"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface CategoryNavProps {
  categories: string[]
  currentCategory?: string
}

export function CategoryNav({ categories, currentCategory }: CategoryNavProps) {
  const pathname = usePathname()

  return (
    <section className="border-b bg-card">
      <div className="container mx-auto px-4">
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-2 py-4">
            <Button variant={!currentCategory ? "default" : "ghost"} size="sm" asChild>
              <Link href={pathname}>Todos</Link>
            </Button>
            {categories.map((category) => (
              <Button key={category} variant={currentCategory === category ? "default" : "ghost"} size="sm" asChild>
                <Link href={`${pathname}?category=${encodeURIComponent(category)}`}>{category}</Link>
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  )
}
