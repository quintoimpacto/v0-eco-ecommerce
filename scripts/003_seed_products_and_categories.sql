-- Insert sample vendors (replace with actual user IDs after signup)
-- Note: You'll need to create vendor accounts first through the signup flow

-- For testing purposes, let's insert sample products with categories
-- These will work once vendors are created through the app

-- Insert sample products for existing vendors
-- This assumes at least one vendor exists in the database

-- Get the first vendor ID for sample data
do $$
declare
  sample_vendor_id uuid;
begin
  -- Get a vendor ID if one exists
  select id into sample_vendor_id from public.vendors limit 1;
  
  -- Only insert if a vendor exists
  if sample_vendor_id is not null then
    -- Electronics & Technology
    insert into public.products (vendor_id, name, description, price, category, stock, image_url)
    values
      (sample_vendor_id, 'Panel Solar Portátil 100W', 'Panel solar eficiente y portátil ideal para camping y emergencias', 299.99, 'Energía Renovable', 15, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Cargador Solar USB', 'Cargador solar con múltiples puertos USB para dispositivos móviles', 49.99, 'Energía Renovable', 50, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Batería Recargable Solar', 'Batería de litio recargable con panel solar integrado', 159.99, 'Energía Renovable', 25, '/placeholder.svg?height=400&width=400');

    -- Fashion & Textiles
    insert into public.products (vendor_id, name, description, price, category, stock, image_url)
    values
      (sample_vendor_id, 'Camiseta Algodón Orgánico', 'Camiseta 100% algodón orgánico certificado, disponible en varios colores', 29.99, 'Moda Sustentable', 100, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Jeans Reciclados', 'Jeans fabricados con denim reciclado y tintes naturales', 89.99, 'Moda Sustentable', 45, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Zapatillas Ecológicas', 'Zapatillas hechas con materiales reciclados y suela de caucho natural', 129.99, 'Moda Sustentable', 30, '/placeholder.svg?height=400&width=400');

    -- Home & Living
    insert into public.products (vendor_id, name, description, price, category, stock, image_url)
    values
      (sample_vendor_id, 'Bolsas Reutilizables Set x5', 'Set de 5 bolsas reutilizables de algodón orgánico para compras', 19.99, 'Hogar & Vida', 200, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Botellas de Acero Inoxidable', 'Botella térmica de acero inoxidable, mantiene temperatura 24h', 34.99, 'Hogar & Vida', 80, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Set Utensilios Bambú', 'Set completo de utensilios de cocina de bambú sostenible', 45.99, 'Hogar & Vida', 60, '/placeholder.svg?height=400&width=400');

    -- Food & Beverages
    insert into public.products (vendor_id, name, description, price, category, stock, image_url)
    values
      (sample_vendor_id, 'Café Orgánico 500g', 'Café 100% orgánico de comercio justo, tostado artesanalmente', 24.99, 'Alimentos & Bebidas', 120, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Miel Orgánica 250g', 'Miel pura de abejas criadas orgánicamente, sin pesticidas', 18.99, 'Alimentos & Bebidas', 90, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Té Verde Ecológico', 'Té verde de cultivo ecológico, rico en antioxidantes', 15.99, 'Alimentos & Bebidas', 150, '/placeholder.svg?height=400&width=400');

    -- Beauty & Personal Care
    insert into public.products (vendor_id, name, description, price, category, stock, image_url)
    values
      (sample_vendor_id, 'Jabón Artesanal Natural', 'Jabón hecho a mano con ingredientes naturales y aceites esenciales', 12.99, 'Belleza & Cuidado', 180, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Shampoo Sólido Orgánico', 'Shampoo sólido sin químicos agresivos, envase cero residuos', 19.99, 'Belleza & Cuidado', 110, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Crema Facial Natural', 'Crema facial con ingredientes naturales y certificación orgánica', 39.99, 'Belleza & Cuidado', 70, '/placeholder.svg?height=400&width=400');

    -- Office & Stationery
    insert into public.products (vendor_id, name, description, price, category, stock, image_url)
    values
      (sample_vendor_id, 'Cuaderno Papel Reciclado', 'Cuaderno A5 con papel 100% reciclado y tapa de cartón', 14.99, 'Oficina & Papelería', 130, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Bolígrafos Biodegradables x10', 'Pack de 10 bolígrafos de materiales biodegradables', 22.99, 'Oficina & Papelería', 95, '/placeholder.svg?height=400&width=400'),
      (sample_vendor_id, 'Portátil Bambú y Corcho', 'Funda para portátil hecha de bambú y corcho natural', 54.99, 'Oficina & Papelería', 40, '/placeholder.svg?height=400&width=400');
  end if;
end $$;
