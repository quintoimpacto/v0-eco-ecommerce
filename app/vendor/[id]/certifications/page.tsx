import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { CertificationCard } from "@/components/certification-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Award, Star } from "lucide-react"
import Link from "next/link"

interface CertificationsPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function CertificationsPage({ params }: CertificationsPageProps) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch vendor details
  const { data: vendor, error: vendorError } = await supabase
    .from("vendors")
    .select(`
      *,
      profiles!vendors_user_id_fkey(full_name)
    `)
    .eq("id", id)
    .single()

  if (vendorError || !vendor) {
    console.error("[v0] Error fetching vendor:", vendorError)
    notFound()
  }

  // Fetch certifications
  const { data: certifications, error: certificationsError } = await supabase
    .from("certifications")
    .select("*")
    .eq("vendor_id", id)
    .order("issue_date", { ascending: false })

  if (certificationsError) {
    console.error("[v0] Error fetching certifications:", certificationsError)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" asChild>
            <Link href={`/vendor/${id}`} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a la tienda
            </Link>
          </Button>
        </div>
      </nav>

      {/* Header */}
      <section className="border-b bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Certificaciones</h1>
                  <p className="text-muted-foreground">{vendor.store_name}</p>
                </div>
              </div>
              <p className="text-muted-foreground max-w-2xl leading-relaxed">
                Estas certificaciones verifican el compromiso con prácticas sustentables y son la base del índice de
                sustentabilidad de este vendedor.
              </p>
            </div>

            {/* Score Summary */}
            <div className="flex flex-col gap-3 md:items-end">
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-primary/10 border-2 border-primary/20">
                <Star className="h-8 w-8 text-primary fill-primary" />
                <div>
                  <div className="text-3xl font-bold text-foreground">{vendor.sustainability_score.toFixed(1)}</div>
                  <div className="text-sm text-muted-foreground">Índice Sustentable</div>
                </div>
              </div>
              <Badge variant="secondary" className="text-sm">
                Basado en {vendor.total_certifications}{" "}
                {vendor.total_certifications === 1 ? "certificación" : "certificaciones"}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="container mx-auto px-4 py-12">
        {certifications && certifications.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certifications.map((certification) => (
              <CertificationCard key={certification.id} certification={certification} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl">
            <Award className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Sin certificaciones aún</h3>
            <p className="text-muted-foreground">Este vendedor todavía no ha agregado certificaciones.</p>
          </div>
        )}
      </section>
    </div>
  )
}
