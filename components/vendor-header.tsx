import { Button } from "@/components/ui/button"
import { Star, Award, Calendar, ExternalLink } from "lucide-react"
import { ImageFallback } from "@/components/image-fallback"
import Link from "next/link"

interface VendorHeaderProps {
  vendor: {
    id: string
    store_name: string
    description: string | null
    logo_url: string | null
    banner_url: string | null
    sustainability_score: number
    total_certifications: number
    created_at: string
    profiles?: {
      full_name: string | null
    }
  }
  certificationsCount: number
}

export function VendorHeader({ vendor, certificationsCount }: VendorHeaderProps) {
  const scoreColor =
    vendor.sustainability_score >= 4
      ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      : vendor.sustainability_score >= 3
        ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
        : "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300"

  const joinDate = new Date(vendor.created_at).toLocaleDateString("es", {
    year: "numeric",
    month: "long",
  })

  return (
    <div className="bg-card border-b">
      {/* Banner */}
      <div className="relative h-64 min-h-64 max-h-64 bg-muted overflow-hidden">
        {vendor.banner_url ? (
          <ImageFallback
            src={vendor.banner_url || "/placeholder.svg"}
            alt={`Banner de ${vendor.store_name}`}
            fill
            className="object-cover object-center"
            fallbackText={`${vendor.store_name} Banner`}
          />
        ) : (
          <div className="h-full bg-gradient-to-br from-primary/20 to-primary/5" />
        )}
      </div>

      {/* Vendor Info */}
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Logo */}
          <div className="absolute -top-16 left-0">
            <div className="relative h-32 w-32 rounded-xl border-4 border-card bg-background overflow-hidden shadow-lg">
              {vendor.logo_url ? (
                <ImageFallback
                  src={vendor.logo_url || "/placeholder.svg"}
                  alt={vendor.store_name}
                  fill
                  className="object-contain p-2"
                  fallbackText={vendor.store_name}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-muted">
                  <span className="text-4xl font-bold text-muted-foreground">{vendor.store_name.charAt(0)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="pt-20 pb-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-2">{vendor.store_name}</h1>
              {vendor.profiles?.full_name && (
                <p className="text-muted-foreground mb-4">por {vendor.profiles.full_name}</p>
              )}
              {vendor.description && <p className="text-foreground max-w-2xl leading-relaxed">{vendor.description}</p>}

              <div className="flex flex-wrap gap-3 mt-6">
                <div className="flex items-center gap-2 text-sm text-gray-400 text-gray-400">
                  <Calendar className="h-4 w-4" />
                  Miembro desde {joinDate}
                </div>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex flex-col gap-4 md:items-end">
              {/* Sustainability Score */}
              <div className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg ${scoreColor}`}>
                <Star className="h-5 w-5 fill-current" />
                <div>
                  <div className="text-2xl font-bold">{vendor.sustainability_score.toFixed(1)}</div>
                  <div className="text-xs">Índice Sustentable</div>
                </div>
              </div>

              {/* Certifications */}
              <Button asChild variant="outline" className="gap-2 bg-transparent">
                <Link href={`/vendor/${vendor.id}/certifications`}>
                  <Award className="h-4 w-4" />
                  Ver {certificationsCount} Certificaciones
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
