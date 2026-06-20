import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Award, Store } from "lucide-react"
import Link from "next/link"
import { ImageFallback } from "@/components/image-fallback"

interface VendorCardProps {
  vendor: {
    id: string
    store_name: string
    description: string | null
    logo_url: string | null
    sustainability_score: number
    total_certifications: number
    profiles?: {
      full_name: string | null
    }
  }
}

export function VendorCard({ vendor }: VendorCardProps) {
  const scoreColor =
    vendor.sustainability_score >= 4
      ? "text-green-600"
      : vendor.sustainability_score >= 3
        ? "text-yellow-600"
        : "text-orange-600"

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-gray-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 bg-muted">
          {vendor.logo_url ? (
            <ImageFallback
              src={vendor.logo_url || "/placeholder.svg"}
              alt={vendor.store_name}
              fill
              className="object-cover"
              fallbackText={vendor.store_name}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Store className="h-16 w-16 text-muted-foreground/30" />
            </div>
          )}
          {/* Sustainability Badge */}
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="gap-1 bg-background/95 backdrop-blur">
              <Star className={`h-3 w-3 fill-current ${scoreColor}`} />
              <span className={scoreColor}>{vendor.sustainability_score.toFixed(1)}</span>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-1">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg text-foreground">{vendor.store_name}</h3>
            {vendor.profiles?.full_name && (
              <p className="text-sm text-muted-foreground">por {vendor.profiles.full_name}</p>
            )}
          </div>

          {vendor.description && <p className="text-sm text-muted-foreground line-clamp-2">{vendor.description}</p>}

          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">
              {vendor.total_certifications} {vendor.total_certifications === 1 ? "certificación" : "certificaciones"}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button asChild className="w-full">
          <Link href={`/vendor/${vendor.id}`}>Ver Tienda</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
