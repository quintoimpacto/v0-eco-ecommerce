-- Create a test vendor account
-- Note: You need to register through the vendor registration page first with:
-- Email: vendedor@test.com
-- Password: Test123456!

-- After registering, this script will create the vendor profile
-- The script creates both the profile and vendor entries

-- Fixed to match actual vendors table schema
INSERT INTO public.vendors (
  user_id,
  store_name,
  description,
  logo_url,
  banner_url,
  sustainability_score,
  total_certifications
)
SELECT 
  id,
  'EcoTienda Prueba',
  'Tienda de prueba para vendedores con productos sostenibles de alta calidad. Ofrecemos envíos a todo el país y garantía de calidad en todos nuestros productos.',
  '/placeholder.svg?height=200&width=200',
  '/placeholder.svg?height=400&width=1200',
  4.5,
  3
FROM auth.users
WHERE email = 'vendedor@test.com'
ON CONFLICT (user_id) DO NOTHING;

-- Add some sample products for the test vendor
INSERT INTO public.products (vendor_id, name, description, price, image_url, category, stock, is_active)
SELECT 
  v.id,
  'Producto de Prueba',
  'Este es un producto de prueba para demostrar la funcionalidad del dashboard de vendedor.',
  29.99,
  '/placeholder.svg?height=800&width=800',
  'Hogar',
  50,
  true
FROM public.vendors v
JOIN auth.users u ON v.user_id = u.id
WHERE u.email = 'vendedor@test.com'
ON CONFLICT DO NOTHING;
