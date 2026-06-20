-- Add more comprehensive test data for the marketplace

-- First, we need to create user profiles for each vendor
-- Note: In production, these would be created through the auth.users table
-- For testing, we'll create mock profiles directly

-- Insert test user profiles (vendors)
insert into public.profiles (id, email, full_name, role)
values
  ('11111111-1111-1111-1111-111111111111', 'ecotextiles@example.com', 'EcoTextiles', 'vendor'),
  ('22222222-2222-2222-2222-222222222222', 'greentech@example.com', 'GreenTech Solutions', 'vendor'),
  ('33333333-3333-3333-3333-333333333333', 'biocosmetica@example.com', 'BioCosmética Natural', 'vendor'),
  ('44444444-4444-4444-4444-444444444444', 'vidasana@example.com', 'VidaSana Alimentos', 'vendor'),
  ('55555555-5555-5555-5555-555555555555', 'casasustentable@example.com', 'Casa Sustentable', 'vendor'),
  ('66666666-6666-6666-6666-666666666666', 'bellezaverde@example.com', 'Belleza Verde', 'vendor'),
  ('77777777-7777-7777-7777-777777777777', 'modacircular@example.com', 'Moda Circular', 'vendor'),
  ('88888888-8888-8888-8888-888888888888', 'techrenew@example.com', 'TechRenew', 'vendor')
on conflict (id) do nothing;

-- Insert test vendors with different sustainability levels
insert into public.vendors (id, user_id, store_name, description, logo_url, banner_url)
values
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'EcoTextiles', 'Fabricamos ropa 100% orgánica y biodegradable. Certificados en producción ética y comercio justo.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'GreenTech Solutions', 'Productos electrónicos reacondicionados y accesorios sustentables. Reducimos la huella electrónica.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'BioCosmética Natural', 'Cosméticos 100% naturales, libres de crueldad animal y envases biodegradables.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'VidaSana Alimentos', 'Alimentos orgánicos certificados, de productores locales y agricultura regenerativa.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'Casa Sustentable', 'Productos para el hogar ecológicos: limpieza biodegradable, utensilios reutilizables.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a6666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'Belleza Verde', 'Productos de belleza veganos y orgánicos certificados.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a7777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'Moda Circular', 'Ropa de segunda mano curada y moda upcycled de alta calidad.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'TechRenew', 'Electrónicos reacondicionados con garantía extendida.', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200')
on conflict (id) do nothing;

-- Add certifications for each vendor (varying sustainability levels)

-- High sustainability vendor (EcoTextiles) - Score will be ~4.6
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a1111111-1111-1111-1111-111111111111', 'GOTS (Global Organic Textile Standard)', 'GOTS International', 'Certificación mundial para textiles orgánicos con responsabilidad social', '2023-06-01', '2026-06-01', 5.0, 'https://certificates.example/gots-123'),
  ('a1111111-1111-1111-1111-111111111111', 'Fair Trade Certified', 'Fairtrade International', 'Comercio justo y condiciones laborales éticas', '2023-03-15', '2026-03-15', 4.5, 'https://certificates.example/ft-456'),
  ('a1111111-1111-1111-1111-111111111111', 'B Corporation', 'B Lab', 'Certificación de impacto social y ambiental', '2022-11-20', '2025-11-20', 4.8, 'https://certificates.example/bcorp-789'),
  ('a1111111-1111-1111-1111-111111111111', 'ISO 14001', 'ISO', 'Sistema de gestión ambiental', '2023-01-10', '2026-01-10', 4.2, 'https://certificates.example/iso14001-101');

-- High sustainability vendor (BioCosmética Natural) - Score will be ~4.675
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a3333333-3333-3333-3333-333333333333', 'COSMOS Organic', 'COSMOS-standard', 'Certificación de cosmética orgánica', '2023-04-01', '2026-04-01', 4.9, 'https://certificates.example/cosmos-234'),
  ('a3333333-3333-3333-3333-333333333333', 'Leaping Bunny', 'Cruelty Free International', 'Libre de crueldad animal', '2023-02-14', '2026-02-14', 4.6, 'https://certificates.example/bunny-567'),
  ('a3333333-3333-3333-3333-333333333333', 'Vegan Society', 'The Vegan Society', 'Productos 100% veganos', '2023-05-20', '2026-05-20', 4.7, 'https://certificates.example/vegan-890'),
  ('a3333333-3333-3333-3333-333333333333', 'EcoCert', 'EcoCert Group', 'Certificación de ingredientes naturales', '2023-03-01', '2026-03-01', 4.5, 'https://certificates.example/ecocert-321');

-- Medium-High sustainability vendor (GreenTech Solutions) - Score will be ~4.17
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a2222222-2222-2222-2222-222222222222', 'ISO 14001', 'ISO', 'Sistema de gestión ambiental', '2023-01-15', '2026-01-15', 4.2, 'https://certificates.example/iso-tech-111'),
  ('a2222222-2222-2222-2222-222222222222', 'R2 Certified', 'SERI', 'Reciclaje responsable de electrónicos', '2023-07-01', '2026-07-01', 4.4, 'https://certificates.example/r2-222'),
  ('a2222222-2222-2222-2222-222222222222', 'Energy Star Partner', 'EPA', 'Eficiencia energética en productos', '2023-02-01', '2026-02-01', 3.9, 'https://certificates.example/energystar-333');

-- Medium sustainability vendor (VidaSana Alimentos) - Score will be ~4.23
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a4444444-4444-4444-4444-444444444444', 'Certificación Orgánica EU', 'Consejo Regulador Europeo', 'Producción orgánica certificada', '2023-01-01', '2026-01-01', 4.6, 'https://certificates.example/organic-eu-444'),
  ('a4444444-4444-4444-4444-444444444444', 'Km 0', 'Asociación Km 0', 'Productos de productores locales', '2023-03-15', '2025-03-15', 3.8, 'https://certificates.example/km0-555'),
  ('a4444444-4444-4444-4444-444444444444', 'Agricultura Regenerativa', 'Rodale Institute', 'Prácticas de agricultura regenerativa', '2023-06-01', '2026-06-01', 4.3, 'https://certificates.example/regen-666');

-- Medium sustainability vendor (Casa Sustentable) - Score will be ~4.25
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a5555555-5555-5555-5555-555555555555', 'Ecolabel EU', 'Comisión Europea', 'Etiqueta ecológica europea', '2023-02-01', '2026-02-01', 4.1, 'https://certificates.example/ecolabel-777'),
  ('a5555555-5555-5555-5555-555555555555', 'Cradle to Cradle', 'C2C Institute', 'Diseño circular y materiales seguros', '2023-04-15', '2025-04-15', 4.4, 'https://certificates.example/c2c-888');

-- Lower-Medium sustainability vendor (Belleza Verde) - Score will be ~4.3
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a6666666-6666-6666-6666-666666666666', 'Vegan Society', 'The Vegan Society', 'Productos veganos certificados', '2023-01-20', '2026-01-20', 4.7, 'https://certificates.example/vegan-999'),
  ('a6666666-6666-6666-6666-666666666666', 'Natural Cosmetics', 'NATRUE', 'Cosmética natural certificada', '2023-03-01', '2025-03-01', 3.9, 'https://certificates.example/natrue-1010');

-- Lower sustainability vendor (Moda Circular) - Score will be 3.7
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a7777777-7777-7777-7777-777777777777', 'Circular Fashion', 'Ellen MacArthur Foundation', 'Compromiso con economía circular', '2023-05-01', '2025-05-01', 3.7, 'https://certificates.example/circular-1111');

-- Lower sustainability vendor (TechRenew) - Score will be 4.4
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight, certificate_url) values
  ('a8888888-8888-8888-8888-888888888888', 'R2 Certified', 'SERI', 'Reciclaje responsable', '2023-06-15', '2026-06-15', 4.4, 'https://certificates.example/r2-1212');

-- Add products for each vendor

-- EcoTextiles products (Moda)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a1111111-1111-1111-1111-111111111111', 'Camiseta Básica Orgánica', 'Camiseta 100% algodón orgánico certificado GOTS. Tintes naturales.', 29.99, 'Moda', '/placeholder.svg?height=400&width=400', 150),
  ('a1111111-1111-1111-1111-111111111111', 'Jeans Sostenibles', 'Jeans de denim orgánico con proceso de lavado ecológico. Ahorro del 90% de agua.', 89.99, 'Moda', '/placeholder.svg?height=400&width=400', 80),
  ('a1111111-1111-1111-1111-111111111111', 'Vestido de Lino Natural', 'Vestido de lino 100% natural y biodegradable. Producción ética certificada.', 79.99, 'Moda', '/placeholder.svg?height=400&width=400', 60),
  ('a1111111-1111-1111-1111-111111111111', 'Sudadera de Algodón Reciclado', 'Sudadera cómoda hecha con 80% algodón reciclado y 20% orgánico.', 54.99, 'Moda', '/placeholder.svg?height=400&width=400', 100),
  ('a1111111-1111-1111-1111-111111111111', 'Calcetines de Bambú', 'Pack de 3 pares de calcetines de fibra de bambú, antibacteriales y suaves.', 19.99, 'Moda', '/placeholder.svg?height=400&width=400', 200);

-- GreenTech Solutions products (Electrónica)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a2222222-2222-2222-2222-222222222222', 'Laptop Reacondicionada HP', 'Laptop HP reacondicionada certificada. i5, 8GB RAM, 256GB SSD. Garantía 1 año.', 449.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 25),
  ('a2222222-2222-2222-2222-222222222222', 'Cargador Solar Portátil', 'Cargador solar de 20W con batería integrada de 10000mAh. Carga múltiples dispositivos.', 59.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 75),
  ('a2222222-2222-2222-2222-222222222222', 'Mouse Inalámbrico Ecológico', 'Mouse fabricado con 70% plástico reciclado. Batería recargable USB.', 24.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 120),
  ('a2222222-2222-2222-2222-222222222222', 'Teclado de Bambú', 'Teclado inalámbrico con carcasa de bambú sostenible. Teclas silenciosas.', 69.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 50),
  ('a2222222-2222-2222-2222-222222222222', 'Auriculares Reciclados', 'Auriculares bluetooth hechos con plástico oceánico reciclado.', 89.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 60);

-- BioCosmética Natural products (Belleza)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a3333333-3333-3333-3333-333333333333', 'Sérum Facial de Vitamina C', 'Sérum natural con vitamina C de origen vegetal. Sin parabenos ni sulfatos.', 34.99, 'Belleza', '/placeholder.svg?height=400&width=400', 100),
  ('a3333333-3333-3333-3333-333333333333', 'Champú Sólido de Argán', 'Champú sólido sin sulfatos con aceite de argán orgánico. Equivale a 3 botellas.', 16.99, 'Belleza', '/placeholder.svg?height=400&width=400', 150),
  ('a3333333-3333-3333-3333-333333333333', 'Crema Hidratante Facial', 'Crema facial con ácido hialurónico vegetal y aloe vera orgánico.', 29.99, 'Belleza', '/placeholder.svg?height=400&width=400', 120),
  ('a3333333-3333-3333-3333-333333333333', 'Aceite Corporal de Rosa Mosqueta', 'Aceite 100% puro de rosa mosqueta para cicatrices y estrías.', 22.99, 'Belleza', '/placeholder.svg?height=400&width=400', 90),
  ('a3333333-3333-3333-3333-333333333333', 'Desodorante Natural sin Aluminio', 'Desodorante en crema con bicarbonato y aceites esenciales. Envase reutilizable.', 12.99, 'Belleza', '/placeholder.svg?height=400&width=400', 180);

-- VidaSana Alimentos products (Alimentos)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a4444444-4444-4444-4444-444444444444', 'Aceite de Oliva Virgen Extra Orgánico', 'AOVE de producción ecológica certificada. Primera prensada en frío. 500ml.', 18.99, 'Alimentos', '/placeholder.svg?height=400&width=400', 200),
  ('a4444444-4444-4444-4444-444444444444', 'Miel de Flores Silvestres', 'Miel cruda sin procesar de colmenas locales. 100% pura y natural. 450g.', 14.99, 'Alimentos', '/placeholder.svg?height=400&width=400', 150),
  ('a4444444-4444-4444-4444-444444444444', 'Quinoa Tricolor Orgánica', 'Mezcla de quinoa blanca, roja y negra de agricultura ecológica. 500g.', 9.99, 'Alimentos', '/placeholder.svg?height=400&width=400', 300),
  ('a4444444-4444-4444-4444-444444444444', 'Pasta Integral de Espelta', 'Pasta artesanal de espelta integral. Rica en fibra y proteínas. 500g.', 5.99, 'Alimentos', '/placeholder.svg?height=400&width=400', 250),
  ('a4444444-4444-4444-4444-444444444444', 'Mix de Frutos Secos Orgánicos', 'Mezcla de almendras, nueces, anacardos y avellanas orgánicas. 300g.', 12.99, 'Alimentos', '/placeholder.svg?height=400&width=400', 180),
  ('a4444444-4444-4444-4444-444444444444', 'Café Orgánico de Comercio Justo', 'Café arábica 100% orgánico de pequeños productores. Tueste medio. 250g.', 11.99, 'Alimentos', '/placeholder.svg?height=400&width=400', 220);

-- Casa Sustentable products (Hogar)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a5555555-5555-5555-5555-555555555555', 'Detergente Ecológico Concentrado', 'Detergente biodegradable concentrado. Sin fosfatos. Rendimiento 50 lavados.', 14.99, 'Hogar', '/placeholder.svg?height=400&width=400', 160),
  ('a5555555-5555-5555-5555-555555555555', 'Set de Bolsas Reutilizables', 'Pack de 5 bolsas de algodón orgánico para compras. Varios tamaños.', 19.99, 'Hogar', '/placeholder.svg?height=400&width=400', 200),
  ('a5555555-5555-5555-5555-555555555555', 'Cepillos de Dientes de Bambú', 'Pack familiar de 4 cepillos de bambú biodegradable. Cerdas suaves.', 12.99, 'Hogar', '/placeholder.svg?height=400&width=400', 250),
  ('a5555555-5555-5555-5555-555555555555', 'Velas de Soja Natural', 'Set de 3 velas aromáticas de cera de soja. Envases de vidrio reutilizables.', 24.99, 'Hogar', '/placeholder.svg?height=400&width=400', 100),
  ('a5555555-5555-5555-5555-555555555555', 'Estropajos de Fibra Natural', 'Pack de 4 estropajos de fibra de coco y luffa. 100% compostables.', 8.99, 'Hogar', '/placeholder.svg?height=400&width=400', 180),
  ('a5555555-5555-5555-5555-555555555555', 'Botella de Acero Inoxidable', 'Botella térmica de 750ml. Mantiene frío 24h y calor 12h. Libre de BPA.', 29.99, 'Hogar', '/placeholder.svg?height=400&width=400', 140);

-- Belleza Verde products (Belleza)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a6666666-6666-6666-6666-666666666666', 'Mascarilla Facial de Arcilla', 'Mascarilla purificante vegana con arcilla verde y té verde. 100ml.', 18.99, 'Belleza', '/placeholder.svg?height=400&width=400', 110),
  ('a6666666-6666-6666-6666-666666666666', 'Labial Mate Vegano', 'Labial de larga duración, vegano y cruelty-free. Sin parafina. Varios colores.', 15.99, 'Belleza', '/placeholder.svg?height=400&width=400', 200),
  ('a6666666-6666-6666-6666-666666666666', 'Sérum Antiedad con Retinol Vegetal', 'Sérum con retinol de origen vegetal y vitamina E. Sin crueldad animal.', 39.99, 'Belleza', '/placeholder.svg?height=400&width=400', 85);

-- Moda Circular products (Moda)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a7777777-7777-7777-7777-777777777777', 'Chaqueta Vaquera Vintage', 'Chaqueta denim vintage curada. Años 90. Talla M. Estado excelente.', 49.99, 'Moda', '/placeholder.svg?height=400&width=400', 12),
  ('a7777777-7777-7777-7777-777777777777', 'Bolso Upcycled de Velas de Barco', 'Bolso único hecho con velas de barco recicladas. Resistente al agua.', 69.99, 'Moda', '/placeholder.svg?height=400&width=400', 8),
  ('a7777777-7777-7777-7777-777777777777', 'Zapatillas Restauradas Vintage', 'Zapatillas vintage restauradas profesionalmente. Varias tallas disponibles.', 59.99, 'Moda', '/placeholder.svg?height=400&width=400', 15);

-- TechRenew products (Electrónica)
insert into public.products (vendor_id, name, description, price, category, image_url, stock) values
  ('a8888888-8888-8888-8888-888888888888', 'iPhone 12 Reacondicionado', 'iPhone 12 128GB reacondicionado. Estado: Excelente. Garantía 12 meses.', 499.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 18),
  ('a8888888-8888-8888-8888-888888888888', 'iPad Air Reacondicionado', 'iPad Air 64GB reacondicionado. Pantalla Retina. Garantía 12 meses.', 399.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 12),
  ('a8888888-8888-8888-8888-888888888888', 'MacBook Pro 2019 Reacondicionado', 'MacBook Pro 13" 2019. 8GB RAM, 256GB SSD. Batería nueva. Garantía extendida.', 899.99, 'Electrónica', '/placeholder.svg?height=400&width=400', 8);
