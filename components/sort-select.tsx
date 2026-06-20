"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SortSelect() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get("sort") || "newest"

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("sort", value)
    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground whitespace-nowrap">Ordenar por:</span>
      <Select value={currentSort} onValueChange={handleSortChange}>
        <SelectTrigger className="min-w-[200px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Más recientes</SelectItem>
          <SelectItem value="price_asc">Precio: Menor a Mayor</SelectItem>
          <SelectItem value="price_desc">Precio: Mayor a Menor</SelectItem>
          <SelectItem value="most_sold">Más Vendidos</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
