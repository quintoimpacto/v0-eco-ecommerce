-- Update all products to have generated images based on their name and category
UPDATE public.products
SET image_url = '/placeholder.svg?height=800&width=800&query=' || 
  CASE 
    WHEN name ILIKE '%camiseta%' OR name ILIKE '%remera%' THEN encode(convert_to('organic cotton t-shirt on white background professional product photography', 'UTF8'), 'base64')
    WHEN name ILIKE '%botella%' THEN encode(convert_to('reusable water bottle on white background product photography', 'UTF8'), 'base64')
    WHEN name ILIKE '%bolsa%' OR name ILIKE '%tote%' THEN encode(convert_to('canvas tote bag on white background product photography', 'UTF8'), 'base64')
    WHEN name ILIKE '%cepillo%' THEN encode(convert_to('bamboo toothbrush on white background product photography', 'UTF8'), 'base64')
    WHEN name ILIKE '%shampoo%' THEN encode(convert_to('natural shampoo bar on white background product photography', 'UTF8'), 'base64')
    WHEN name ILIKE '%panel%' THEN encode(convert_to('portable solar panel on white background product photography', 'UTF8'), 'base64')
    WHEN name ILIKE '%zapatos%' OR name ILIKE '%zapatillas%' THEN encode(convert_to('sustainable sneakers on white background product photography', 'UTF8'), 'base64')
    WHEN name ILIKE '%café%' OR name ILIKE '%coffee%' THEN encode(convert_to('organic fair trade coffee package on white background product photography', 'UTF8'), 'base64')
    ELSE encode(convert_to(name || ' on white background professional product photography', 'UTF8'), 'base64')
  END
WHERE image_url IS NULL OR image_url = '';
