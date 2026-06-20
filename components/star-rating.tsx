import { Star } from 'lucide-react'

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: 'sm' | 'md' | 'lg'
  showNumber?: boolean
  reviewCount?: number
  className?: string
}

export function StarRating({ 
  rating, 
  maxRating = 5, 
  size = 'md',
  showNumber = true,
  reviewCount,
  className = ''
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }
  
  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const stars = []
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  for (let i = 0; i < maxRating; i++) {
    if (i < fullStars) {
      // Full star
      stars.push(
        <Star 
          key={i} 
          className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} 
        />
      )
    } else if (i === fullStars && hasHalfStar) {
      // Half star
      stars.push(
        <div key={i} className="relative">
          <Star className={`${sizeClasses[size]} text-gray-300`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${sizeClasses[size]} fill-yellow-400 text-yellow-400`} />
          </div>
        </div>
      )
    } else {
      // Empty star
      stars.push(
        <Star 
          key={i} 
          className={`${sizeClasses[size]} text-gray-300`} 
        />
      )
    }
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center gap-0.5">
        {stars}
      </div>
      {showNumber && (
        <span className={`font-semibold text-foreground ${textSizeClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && reviewCount > 0 && (
        <span className={`text-muted-foreground ${textSizeClasses[size]}`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  )
}
