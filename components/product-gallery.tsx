"use client"

import { useState } from "react"
import { ImageFallback } from "@/components/image-fallback"
// </CHANGE>
import { cn } from "@/lib/utils"

interface ProductGalleryProps {
  productName: string
  mainImage: string
  category?: string
}

export function ProductGallery({ productName, mainImage, category }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  const images = [mainImage, mainImage, mainImage, mainImage]
  // </CHANGE>

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
        <ImageFallback
          src={images[selectedImage] || "/placeholder.svg"}
          alt={`${productName} - Vista ${selectedImage + 1}`}
          fill
          className="object-cover"
          fallbackText={productName}
        />
        {/* </CHANGE> */}
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "aspect-square relative overflow-hidden rounded-lg bg-muted border-2 transition-all",
              selectedImage === index
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-transparent hover:border-muted-foreground/50",
            )}
          >
            <ImageFallback
              src={image || "/placeholder.svg"}
              alt={`${productName} - Miniatura ${index + 1}`}
              fill
              className="object-cover border-solid"
              fallbackText={`${productName} ${index + 1}`}
            />
            {/* </CHANGE> */}
          </button>
        ))}
      </div>
    </div>
  )
}
