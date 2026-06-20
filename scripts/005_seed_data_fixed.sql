-- IMPORTANT: This script temporarily disables RLS to insert test data
-- In production, vendors should be created through the signup flow

-- Temporarily disable RLS for data insertion
alter table public.profiles disable row level security;
alter table public.vendors disable row level security;
alter table public.certifications disable row level security;
alter table public.products disable row level security;

-- Clear existing test data
delete from public.products;
delete from public.certifications;
delete from public.vendors;
delete from public.profiles where email like '%@ecomarket.test';

-- Insert test profiles (simulating registered users)
insert into public.profiles (id, email, full_name, role) values
  ('11111111-1111-1111-1111-111111111111', 'ecomode@ecomarket.test', 'EcoMode Fashion', 'vendor'),
  ('22222222-2222-2222-2222-222222222222', 'greengadgets@ecomarket.test', 'Green Gadgets', 'vendor'),
  ('33333333-3333-3333-3333-333333333333', 'purebeauty@ecomarket.test', 'Pure Beauty Co', 'vendor'),
  ('44444444-4444-4444-4444-444444444444', 'organicfood@ecomarket.test', 'Organic Food Market', 'vendor'),
  ('55555555-5555-5555-5555-555555555555', 'ecohome@ecomarket.test', 'Eco Home Living', 'vendor'),
  ('66666666-6666-6666-6666-666666666666', 'sustainablestyle@ecomarket.test', 'Sustainable Style', 'vendor'),
  ('77777777-7777-7777-7777-777777777777', 'cleantech@ecomarket.test', 'Clean Tech Shop', 'vendor'),
  ('88888888-8888-8888-8888-888888888888', 'naturalgoods@ecomarket.test', 'Natural Goods', 'vendor')
on conflict (id) do nothing;

-- Insert vendors
insert into public.vendors (id, user_id, store_name, description, logo_url, banner_url) values
  ('a1111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'EcoMode Fashion', 'Ropa sustentable y ética para un mundo mejor', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a2222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', 'Green Gadgets', 'Electrónica verde y productos tecnológicos sustentables', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a3333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', 'Pure Beauty Co', 'Cosméticos naturales y cuidado personal orgánico', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a4444444-4444-4444-4444-444444444444', '44444444-4444-4444-4444-444444444444', 'Organic Food Market', 'Alimentos orgánicos certificados y productos locales', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a5555555-5555-5555-5555-555555555555', '55555555-5555-5555-5555-555555555555', 'Eco Home Living', 'Productos para el hogar ecológicos y sustentables', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a6666666-6666-6666-6666-666666666666', '66666666-6666-6666-6666-666666666666', 'Sustainable Style', 'Moda consciente y accesorios sustentables', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a7777777-7777-7777-7777-777777777777', '77777777-7777-7777-7777-777777777777', 'Clean Tech Shop', 'Tecnología limpia para reducir tu huella de carbono', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200'),
  ('a8888888-8888-8888-8888-888888888888', '88888888-8888-8888-8888-888888888888', 'Natural Goods', 'Productos naturales para toda la familia', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200')
on conflict (id) do nothing;

-- Insert certifications for vendors
insert into public.certifications (vendor_id, name, issuer, description, certificate_url, issue_date, expiry_date, score_weight) values
  -- EcoMode Fashion - Very High Score
  ('a1111111-1111-1111-1111-111111111111', 'GOTS (Global Organic Textile Standard)', 'GOTS International', 'Certifica textiles orgánicos procesados de manera sustentable y socialmente responsable', 'https://global-standard.org', '2023-01-15', '2026-01-15', 5.0),
  ('a1111111-1111-1111-1111-111111111111', 'Fair Trade Certified', 'Fair Trade USA', 'Garantiza condiciones laborales justas y comercio ético', 'https://fairtrade.org', '2023-03-20', '2026-03-20', 4.8),
  ('a1111111-1111-1111-1111-111111111111', 'B Corporation', 'B Lab', 'Empresa certificada por altos estándares de desempeño social y ambiental', 'https://bcorporation.net', '2022-06-10', null, 4.9),
  
  -- Green Gadgets - High Score
  ('a2222222-2222-2222-2222-222222222222', 'EPEAT Gold', 'Green Electronics Council', 'Productos electrónicos sustentables con alto desempeño ambiental', 'https://epeat.net', '2023-08-01', '2025-08-01', 4.5),
  ('a2222222-2222-2222-2222-222222222222', 'Energy Star', 'EPA', 'Productos de alta eficiencia energética', 'https://energystar.gov', '2023-05-15', null, 4.2),
  ('a2222222-2222-2222-2222-222222222222', 'TCO Certified', 'TCO Development', 'Certificación de sustentabilidad para productos IT', 'https://tcocertified.com', '2023-09-20', '2026-09-20', 4.3),
  
  -- Pure Beauty Co - High Score
  ('a3333333-3333-3333-3333-333333333333', 'COSMOS Organic', 'COSMOS Standard', 'Cosméticos orgánicos certificados según estándares europeos', 'https://cosmos-standard.org', '2023-02-10', '2026-02-10', 4.7),
  ('a3333333-3333-3333-3333-333333333333', 'Leaping Bunny', 'Cruelty Free International', 'Productos libres de crueldad animal', 'https://leapingbunny.org', '2022-11-05', null, 4.4),
  ('a3333333-3333-3333-3333-333333333333', 'EcoCert', 'Ecocert', 'Certificación ecológica de productos cosméticos', 'https://ecocert.com', '2023-04-18', '2025-04-18', 4.6),
  
  -- Organic Food Market - Very High Score
  ('a4444444-4444-4444-4444-444444444444', 'USDA Organic', 'USDA', 'Productos orgánicos certificados por el Departamento de Agricultura de EE.UU.', 'https://usda.gov', '2023-01-01', '2025-01-01', 5.0),
  ('a4444444-4444-4444-4444-444444444444', 'Rainforest Alliance', 'Rainforest Alliance', 'Productos de agricultura sustentable que protegen bosques', 'https://rainforest-alliance.org', '2023-06-12', '2026-06-12', 4.7),
  ('a4444444-4444-4444-4444-444444444444', 'Non-GMO Project', 'Non-GMO Project', 'Productos verificados como libres de transgénicos', 'https://nongmoproject.org', '2023-03-08', null, 4.5),
  
  -- Eco Home Living - Medium-High Score
  ('a5555555-5555-5555-5555-555555555555', 'Cradle to Cradle', 'C2C Products Innovation Institute', 'Productos diseñados para economía circular', 'https://c2ccertified.org', '2023-07-22', '2026-07-22', 4.8),
  ('a5555555-5555-5555-5555-555555555555', 'FSC (Forest Stewardship Council)', 'FSC International', 'Productos de madera de bosques gestionados responsablemente', 'https://fsc.org', '2022-09-15', '2025-09-15', 4.3),
  
  -- Sustainable Style - Medium Score
  ('a6666666-6666-6666-6666-666666666666', 'Oeko-Tex Standard 100', 'Oeko-Tex', 'Textiles libres de sustancias nocivas', 'https://oeko-tex.com', '2023-05-30', '2025-05-30', 4.0),
  ('a6666666-6666-6666-6666-666666666666', 'Bluesign', 'Bluesign Technologies', 'Producción textil sustentable y segura', 'https://bluesign.com', '2023-08-14', '2026-08-14', 4.2),
  
  -- Clean Tech Shop - Medium Score  
  ('a7777777-7777-7777-7777-777777777777', 'Carbon Neutral', 'Carbon Trust', 'Empresa con huella de carbono neutral', 'https://carbontrust.com', '2023-10-01', '2024-10-01', 3.9),
  ('a7777777-7777-7777-7777-777777777777', 'ISO 14001', 'ISO', 'Sistema de gestión ambiental certificado', 'https://iso.org', '2023-01-20', '2026-01-20', 3.8),
  
  -- Natural Goods - Basic Score
  ('a8888888-8888-8888-8888-888888888888', 'Green Business Certification', 'Green Business Bureau', 'Certificación básica de prácticas empresariales verdes', 'https://gbb.org', '2023-11-10', '2025-11-10', 3.5)
on conflict do nothing;

-- Insert products for EcoMode Fashion (Moda)
insert into public.products (vendor_id, name, description, price, image_url, category, stock) values
  ('a1111111-1111-1111-1111-111111111111', 'Camiseta de Algodón Orgánico', 'Camiseta 100% algodón orgánico certificado GOTS', 29.99, '/placeholder.svg?height=400&width=400', 'Moda', 50),
  ('a1111111-1111-1111-1111-111111111111', 'Jeans Sostenibles', 'Jeans fabricados con denim reciclado y tintes naturales', 89.99, '/placeholder.svg?height=400&width=400', 'Moda', 30),
  ('a1111111-1111-1111-1111-111111111111', 'Sudadera Eco', 'Sudadera de algodón orgánico con capucha', 54.99, '/placeholder.svg?height=400&width=400', 'Moda', 40),
  ('a1111111-1111-1111-1111-111111111111', 'Vestido Lino Natural', 'Vestido elegante de lino 100% natural', 79.99, '/placeholder.svg?height=400&width=400', 'Moda', 25),
  ('a1111111-1111-1111-1111-111111111111', 'Chaqueta Reciclada', 'Chaqueta fabricada con materiales reciclados', 129.99, '/placeholder.svg?height=400&width=400', 'Moda', 15),

  -- Green Gadgets (Electrónica)
  ('a2222222-2222-2222-2222-222222222222', 'Cargador Solar Portátil', 'Cargador solar de alta eficiencia para dispositivos móviles', 49.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 60),
  ('a2222222-2222-2222-2222-222222222222', 'Auriculares Bambú', 'Auriculares inalámbricos con carcasa de bambú', 79.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 45),
  ('a2222222-2222-2222-2222-222222222222', 'Power Bank Ecológico', 'Batería portátil fabricada con materiales reciclados', 39.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 70),
  ('a2222222-2222-2222-2222-222222222222', 'Mouse Inalámbrico Sustentable', 'Mouse ergonómico hecho con plástico reciclado', 34.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 55),
  ('a2222222-2222-2222-2222-222222222222', 'Teclado Mecánico Eco', 'Teclado mecánico con materiales sustentables', 99.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 30),

  -- Pure Beauty Co (Belleza)
  ('a3333333-3333-3333-3333-333333333333', 'Crema Facial Orgánica', 'Crema hidratante con ingredientes 100% orgánicos', 34.99, '/placeholder.svg?height=400&width=400', 'Belleza', 80),
  ('a3333333-3333-3333-3333-333333333333', 'Champú Sólido Natural', 'Champú sólido sin sulfatos ni parabenos', 15.99, '/placeholder.svg?height=400&width=400', 'Belleza', 100),
  ('a3333333-3333-3333-3333-333333333333', 'Sérum Vitamina C', 'Sérum facial con vitamina C orgánica', 44.99, '/placeholder.svg?height=400&width=400', 'Belleza', 60),
  ('a3333333-3333-3333-3333-333333333333', 'Aceite de Argán Puro', 'Aceite de argán 100% puro para cabello y piel', 29.99, '/placeholder.svg?height=400&width=400', 'Belleza', 75),
  ('a3333333-3333-3333-3333-333333333333', 'Mascarilla Facial Arcilla', 'Mascarilla natural de arcilla verde', 19.99, '/placeholder.svg?height=400&width=400', 'Belleza', 90),

  -- Organic Food Market (Alimentos)
  ('a4444444-4444-4444-4444-444444444444', 'Miel Orgánica Local', 'Miel pura de producción local orgánica certificada', 18.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 50),
  ('a4444444-4444-4444-4444-444444444444', 'Quinoa Andina Orgánica', 'Quinoa orgánica de cultivo sustentable', 12.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 100),
  ('a4444444-4444-4444-4444-444444444444', 'Aceite de Oliva Extra Virgen', 'Aceite de oliva orgánico prensado en frío', 24.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 70),
  ('a4444444-4444-4444-4444-444444444444', 'Café Orgánico de Comercio Justo', 'Café orgánico de origen único', 16.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 85),
  ('a4444444-4444-4444-4444-444444444444', 'Granola Artesanal', 'Granola orgánica hecha a mano', 13.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 60),

  -- Eco Home Living (Hogar)
  ('a5555555-5555-5555-5555-555555555555', 'Velas de Cera de Soya', 'Set de velas aromáticas de cera de soya natural', 22.99, '/placeholder.svg?height=400&width=400', 'Hogar', 65),
  ('a5555555-5555-5555-5555-555555555555', 'Bolsas Reutilizables de Algodón', 'Set de 5 bolsas de algodón orgánico', 14.99, '/placeholder.svg?height=400&width=400', 'Hogar', 120),
  ('a5555555-5555-5555-5555-555555555555', 'Toallas de Bambú', 'Juego de toallas suaves de fibra de bambú', 39.99, '/placeholder.svg?height=400&width=400', 'Hogar', 50),
  ('a5555555-5555-5555-5555-555555555555', 'Cepillos de Dientes Bambú', 'Pack familiar de cepillos biodegradables', 12.99, '/placeholder.svg?height=400&width=400', 'Hogar', 150),
  ('a5555555-5555-5555-5555-555555555555', 'Sábanas de Lino Orgánico', 'Juego de sábanas de lino certificado', 89.99, '/placeholder.svg?height=400&width=400', 'Hogar', 35),

  -- Sustainable Style (Moda)
  ('a6666666-6666-6666-6666-666666666666', 'Bolso Tote Reciclado', 'Bolso grande hecho con materiales reciclados', 44.99, '/placeholder.svg?height=400&width=400', 'Moda', 70),
  ('a6666666-6666-6666-6666-666666666666', 'Gorra de Algodón Orgánico', 'Gorra ajustable de algodón orgánico', 24.99, '/placeholder.svg?height=400&width=400', 'Moda', 90),
  ('a6666666-6666-6666-6666-666666666666', 'Bufanda de Lana Ética', 'Bufanda suave de lana producida éticamente', 34.99, '/placeholder.svg?height=400&width=400', 'Moda', 55),
  ('a6666666-6666-6666-6666-666666666666', 'Zapatillas Veganas', 'Zapatillas deportivas libres de productos animales', 79.99, '/placeholder.svg?height=400&width=400', 'Moda', 40),

  -- Clean Tech Shop (Electrónica)
  ('a7777777-7777-7777-7777-777777777777', 'Lámpara LED Solar', 'Lámpara LED recargable con panel solar', 34.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 55),
  ('a7777777-7777-7777-7777-777777777777', 'Termostato Inteligente', 'Termostato eco-friendly para ahorro de energía', 129.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 25),
  ('a7777777-7777-7777-7777-777777777777', 'Purificador de Aire', 'Purificador de aire de bajo consumo energético', 149.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 30),

  -- Natural Goods (Multi-categoría)
  ('a8888888-8888-8888-8888-888888888888', 'Jabón Artesanal Natural', 'Set de jabones hechos a mano con ingredientes naturales', 16.99, '/placeholder.svg?height=400&width=400', 'Belleza', 100),
  ('a8888888-8888-8888-8888-888888888888', 'Té Herbal Orgánico', 'Colección de tés herbales orgánicos', 14.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 80),
  ('a8888888-8888-8888-8888-888888888888', 'Difusor de Aromas', 'Difusor de aceites esenciales de bambú', 29.99, '/placeholder.svg?height=400&width=400', 'Hogar', 45)
on conflict do nothing;

-- Re-enable RLS
alter table public.profiles enable row level security;
alter table public.vendors enable row level security;
alter table public.certifications enable row level security;
alter table public.products enable row level security;

-- Note: The sustainability scores will be automatically calculated by the trigger
-- after the certifications are inserted
