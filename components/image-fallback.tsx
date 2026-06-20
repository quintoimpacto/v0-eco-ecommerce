"use client"

import { useState } from "react"
import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface ImageFallbackProps {
  src: string | null | undefined
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  fallbackText?: string
}

export function ImageFallback({ src, alt, width, height, fill, className = "", fallbackText }: ImageFallbackProps) {
  const [error, setError] = useState(false)

  if (src) {
    console.log("[v0] ImageFallback loading:", { src, alt })
  }
  // </CHANGE>

  // If no src or error, show fallback
  if (!src || error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 ${className}`}
        style={fill ? undefined : { width, height }}
      >
        <ImageIcon className="h-12 w-12 text-green-600 mb-2" />
        <span className="text-sm text-green-700 font-medium text-center px-4">{fallbackText || alt}</span>
      </div>
    )
  }

  const isRealProductImage = src.startsWith("/products/")

  if (isRealProductImage) {
    // Use the real image directly
    if (fill) {
      return (
        <Image
          src={src || "/placeholder.svg"}
          alt={alt}
          fill
          className={className}
          onError={() => {
            console.log("[v0] Image load error:", src)
            setError(true)
          }}
        />
      )
    }
    return (
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={width}
        height={height}
        className={className}
        onError={() => {
          console.log("[v0] Image load error:", src)
          setError(true)
        }}
      />
    )
  }
  // </CHANGE>

  // Try to use external placeholder service as fallback for placeholder.svg URLs
  const getPlaceholderUrl = () => {
    if (src.includes("/placeholder.svg")) {
      // Extract query from placeholder URL
      const match = src.match(/query=([^&]+)/)
      const query = match ? decodeURIComponent(match[1]) : alt
      const w = width || 400
      const h = height || 400

      // Use a reliable external service
      return `https://placehold.co/${w}x${h}/22c55e/ffffff?text=${encodeURIComponent(query)}`
    }
    return src
  }

  const imageUrl = getPlaceholderUrl()

  if (fill) {
    return (
      <Image src={imageUrl || "/placeholder.svg"} alt={alt} fill className={className} onError={() => setError(true)} />
    )
  }

  return (
    <Image
      src={imageUrl || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={() => setError(true)}
    />
  )
}

export default ImageFallback
