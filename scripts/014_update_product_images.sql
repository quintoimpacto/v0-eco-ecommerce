-- Update all products to have specific generated images based on their name and category

UPDATE public.products
SET image_url = CASE 
  WHEN name LIKE '%Panel Solar%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Cargador Solar%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Batería%Solar%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Camiseta%Orgánico%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Jeans%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Zapatillas%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Bolsas Reutilizables%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Botellas%Acero%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Utensilios%Bambú%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Café%Orgánico%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Miel%Orgánica%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Té Verde%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Jabón%Artesanal%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Shampoo Sólido%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Crema Facial%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Cuaderno%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Bolígrafos%' THEN '/placeholder.svg?height=400&width=400'
  WHEN name LIKE '%Portátil%Bambú%' THEN '/placeholder.svg?height=400&width=400'
  ELSE '/placeholder.svg?height=400&width=400&query=' || replace(lower(name), ' ', '+') || '+eco+product'
END
WHERE image_url IS NULL OR image_url = '' OR image_url = '/placeholder.svg?height=400&width=400';
