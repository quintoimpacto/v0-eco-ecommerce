import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, Calendar, Building2, ExternalLink, Star } from 'lucide-react'

interface Certification {
  id: string
  name: string
  issuer: string
  description: string | null
  certificate_url: string | null
  issue_date: string
  expiry_date: string | null
  score_weight: number
}

interface CertificationCardProps {
  certification: Certification
}

export function CertificationCard({ certification }: CertificationCardProps) {
  const issueDate = new Date(certification.issue_date).toLocaleDateString("es", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const expiryDate = certification.expiry_date
    ? new Date(certification.expiry_date).toLocaleDateString("es", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null

  const isExpired = certification.expiry_date ? new Date(certification.expiry_date) < new Date() : false

  return (
    <Card className={`overflow-hidden flex flex-col h-full ${isExpired ? "opacity-60" : ""}`}>
      <CardHeader className="border-b bg-white pb-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-lg text-foreground mb-1 line-clamp-2">{certification.name}</h3>
              <div className="flex items-center gap-2 text-sm text-foreground">
                <Building2 className="h-3 w-3" />
                <span className="truncate">{certification.issuer}</span>
              </div>
            </div>
          </div>

          {/* Score Weight Badge */}
          <Badge variant="secondary" className="gap-1 shrink-0">
            <Star className="h-3 w-3 fill-current text-yellow-600" />
            <span>{certification.score_weight.toFixed(1)}</span>
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-6 flex-1">
        {certification.description && (
          <p className="text-sm text-foreground mb-6 leading-relaxed">{certification.description}</p>
        )}

        {/* Dates */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-sm">
            <Calendar className="h-4 w-4 text-foreground mt-0.5" />
            <div>
              <div className="text-foreground">Fecha de emisión</div>
              <div className="font-medium text-foreground">{issueDate}</div>
            </div>
          </div>

          {expiryDate && (
            <div className="flex items-start gap-3 text-sm">
              <Calendar className="h-4 w-4 text-foreground mt-0.5" />
              <div>
                <div className="text-foreground">Fecha de expiración</div>
                <div className={`font-medium ${isExpired ? "text-destructive" : "text-foreground"}`}>
                  {expiryDate}
                  {isExpired && <span className="ml-2 text-xs">(Expirada)</span>}
                </div>
              </div>
            </div>
          )}

          {!expiryDate && (
            <div className="flex items-start gap-3 text-sm">
              <Calendar className="h-4 w-4 text-foreground mt-0.5" />
              <div>
                <div className="text-foreground">Vigencia</div>
                <div className="font-medium text-foreground">Permanente</div>
              </div>
            </div>
          )}
        </div>

        {/* Certificate Link */}
        {certification.certificate_url && (
          <Button variant="outline" className="w-full gap-2 bg-transparent" asChild>
            <a href={certification.certificate_url} target="_blank" rel="noopener noreferrer">
              Ver Certificado
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
