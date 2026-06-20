-- Script para agregar datos de prueba sin depender de auth.users
-- Este script hace que user_id sea nullable temporalmente para permitir datos de prueba

-- Hacer user_id nullable en vendors para permitir datos de prueba
ALTER TABLE public.vendors ALTER COLUMN user_id DROP NOT NULL;

-- Deshabilitar RLS temporalmente para insertar datos de prueba
ALTER TABLE public.vendors DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.products DISABLE ROW LEVEL SECURITY;

-- Limpiar datos existentes
TRUNCATE TABLE public.products CASCADE;
TRUNCATE TABLE public.certifications CASCADE;
TRUNCATE TABLE public.vendors CASCADE;

-- Insertar vendedores de prueba
INSERT INTO public.vendors (id, user_id, store_name, description, logo_url, banner_url, sustainability_score, total_certifications) VALUES
('11111111-1111-1111-1111-111111111111', NULL, 'EcoVida', 'Productos orgánicos certificados para una vida más saludable y sostenible', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0),
('22222222-2222-2222-2222-222222222222', NULL, 'GreenTech Solutions', 'Tecnología sustentable y productos electrónicos reciclables', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0),
('33333333-3333-3333-3333-333333333333', NULL, 'Moda Consciente', 'Ropa ética y sostenible de algodón orgánico', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0),
('44444444-4444-4444-4444-444444444444', NULL, 'BioBelleza Natural', 'Cosméticos naturales y cruelty-free', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0),
('55555555-5555-5555-5555-555555555555', NULL, 'Hogar Verde', 'Productos para el hogar ecológicos y biodegradables', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0),
('66666666-6666-6666-6666-666666666666', NULL, 'Alimentos Orgánicos del Valle', 'Frutas y verduras orgánicas directo del campo', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0),
('77777777-7777-7777-7777-777777777777', NULL, 'TechRecicla', 'Electrónica reacondicionada y reciclaje responsable', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0),
('88888888-8888-8888-8888-888888888888', NULL, 'Artesanías Sustentables', 'Productos artesanales con materiales reciclados', '/placeholder.svg?height=100&width=100', '/placeholder.svg?height=300&width=1200', 0, 0);

-- Insertar certificaciones
INSERT INTO public.certifications (vendor_id, name, issuer, description, certificate_url, issue_date, expiry_date, score_weight) VALUES
-- EcoVida (Score muy alto: 4.67)
('11111111-1111-1111-1111-111111111111', 'USDA Organic', 'United States Department of Agriculture', 'Certificación de productos orgánicos bajo estándares USDA', 'https://www.usda.gov/organic', '2023-01-15', '2026-01-15', 4.8),
('11111111-1111-1111-1111-111111111111', 'Fair Trade Certified', 'Fair Trade USA', 'Comercio justo garantizando condiciones laborales éticas', 'https://www.fairtradecertified.org', '2023-03-10', '2025-03-10', 4.5),
('11111111-1111-1111-1111-111111111111', 'Rainforest Alliance', 'Rainforest Alliance', 'Prácticas agrícolas sostenibles que protegen el medio ambiente', 'https://www.rainforest-alliance.org', '2023-06-20', '2026-06-20', 4.7),
-- GreenTech Solutions (Score alto: 4.35)
('22222222-2222-2222-2222-222222222222', 'EPEAT Gold', 'Global Electronics Council', 'Estándar de excelencia ambiental para productos electrónicos', 'https://www.epeat.net', '2023-02-01', '2025-02-01', 4.6),
('22222222-2222-2222-2222-222222222222', 'Energy Star', 'US Environmental Protection Agency', 'Eficiencia energética certificada', 'https://www.energystar.gov', '2023-04-15', '2026-04-15', 4.2),
('22222222-2222-2222-2222-222222222222', 'TCO Certified', 'TCO Development', 'Sostenibilidad en tecnología de información', 'https://tcocertified.com', '2023-05-10', '2025-05-10', 4.3),
-- Moda Consciente (Score alto: 4.2)
('33333333-3333-3333-3333-333333333333', 'GOTS', 'Global Organic Textile Standard', 'Textiles orgánicos certificados', 'https://global-standard.org', '2023-01-20', '2025-01-20', 4.7),
('33333333-3333-3333-3333-333333333333', 'Fair Trade Textile', 'Fair Trade International', 'Comercio justo en la industria textil', 'https://www.fairtrade.net', '2023-03-15', '2025-03-15', 4.4),
('33333333-3333-3333-3333-333333333333', 'OEKO-TEX Standard 100', 'OEKO-TEX Association', 'Textiles libres de sustancias nocivas', 'https://www.oeko-tex.com', '2023-07-01', '2025-07-01', 3.5),
-- BioBelleza Natural (Score medio-alto: 3.93)
('44444444-4444-4444-4444-444444444444', 'COSMOS Organic', 'COSMOS-standard AISBL', 'Cosméticos orgánicos y naturales certificados', 'https://cosmos-standard.org', '2023-02-10', '2025-02-10', 4.5),
('44444444-4444-4444-4444-444444444444', 'Leaping Bunny', 'Cruelty Free International', 'Productos no testados en animales', 'https://www.leapingbunny.org', '2023-04-20', NULL, 3.8),
('44444444-4444-4444-4444-444444444444', 'Vegan Society', 'The Vegan Society', 'Productos 100% veganos', 'https://www.vegansociety.com', '2023-06-15', NULL, 3.5),
-- Hogar Verde (Score medio: 3.5)
('55555555-5555-5555-5555-555555555555', 'Cradle to Cradle', 'Cradle to Cradle Products Innovation Institute', 'Productos diseñados para economía circular', 'https://www.c2ccertified.org', '2023-03-01', '2025-03-01', 4.5),
('55555555-5555-5555-5555-555555555555', 'Green Seal', 'Green Seal', 'Productos ecológicos certificados', 'https://greenseal.org', '2023-05-20', '2025-05-20', 3.2),
('55555555-5555-5555-5555-555555555555', 'EcoLogo', 'UL Environment', 'Certificación de impacto ambiental reducido', 'https://www.ul.com/ecologo', '2023-08-10', '2025-08-10', 2.8),
-- Alimentos Orgánicos del Valle (Score alto: 4.15)
('66666666-6666-6666-6666-666666666666', 'EU Organic', 'European Union', 'Certificación orgánica de la Unión Europea', 'https://ec.europa.eu/organic', '2023-01-10', '2025-01-10', 4.5),
('66666666-6666-6666-6666-666666666666', 'Demeter Biodynamic', 'Demeter International', 'Agricultura biodinámica certificada', 'https://www.demeter.net', '2023-04-05', '2025-04-05', 4.8),
('66666666-6666-6666-6666-666666666666', 'Non-GMO Project', 'Non-GMO Project', 'Verificado libre de organismos genéticamente modificados', 'https://www.nongmoproject.org', '2023-07-15', NULL, 3.2),
-- TechRecicla (Score medio: 3.27)
('77777777-7777-7777-7777-777777777777', 'R2 Certified', 'Sustainable Electronics Recycling International', 'Reciclaje responsable de electrónicos', 'https://sustainableelectronics.org', '2023-02-20', '2025-02-20', 3.8),
('77777777-7777-7777-7777-777777777777', 'e-Stewards', 'Basel Action Network', 'Manejo ético de residuos electrónicos', 'https://e-stewards.org', '2023-05-15', '2025-05-15', 3.5),
('77777777-7777-7777-7777-777777777777', 'ISO 14001', 'International Organization for Standardization', 'Sistema de gestión ambiental', 'https://www.iso.org', '2023-08-01', '2026-08-01', 2.5),
-- Artesanías Sustentables (Score básico: 2.8)
('88888888-8888-8888-8888-888888888888', 'B Corporation', 'B Lab', 'Empresa con impacto social y ambiental verificado', 'https://www.bcorporation.net', '2023-03-20', '2026-03-20', 3.5),
('88888888-8888-8888-8888-888888888888', 'Made Safe', 'Made Safe', 'Productos seguros para la salud humana y el medio ambiente', 'https://www.madesafe.org', '2023-06-10', '2025-06-10', 2.1);

-- Insertar productos (todas las categorías en un solo bloque)
INSERT INTO public.products (vendor_id, name, description, price, image_url, category, stock, is_active) VALUES
-- Moda
('33333333-3333-3333-3333-333333333333', 'Camiseta Orgánica Básica', 'Camiseta 100% algodón orgánico certificado GOTS', 29.99, '/placeholder.svg?height=400&width=400', 'Moda', 150, true),
('33333333-3333-3333-3333-333333333333', 'Jeans Sostenibles', 'Pantalones de mezclilla con proceso de teñido ecológico', 79.99, '/placeholder.svg?height=400&width=400', 'Moda', 80, true),
('33333333-3333-3333-3333-333333333333', 'Vestido de Lino Natural', 'Vestido ligero hecho con lino orgánico', 89.99, '/placeholder.svg?height=400&width=400', 'Moda', 45, true),
('33333333-3333-3333-3333-333333333333', 'Zapatillas Recicladas', 'Calzado deportivo fabricado con materiales reciclados', 99.99, '/placeholder.svg?height=400&width=400', 'Moda', 60, true),
('33333333-3333-3333-3333-333333333333', 'Bolso de Algodón Orgánico', 'Bolso tote reutilizable de algodón certificado', 24.99, '/placeholder.svg?height=400&width=400', 'Moda', 200, true),
('88888888-8888-8888-8888-888888888888', 'Bufanda Artesanal', 'Bufanda tejida a mano con lana reciclada', 39.99, '/placeholder.svg?height=400&width=400', 'Moda', 30, true),
('88888888-8888-8888-8888-888888888888', 'Sombrero de Paja Reciclada', 'Sombrero artesanal hecho con fibras recicladas', 34.99, '/placeholder.svg?height=400&width=400', 'Moda', 25, true),
-- Electrónica
('22222222-2222-2222-2222-222222222222', 'Cargador Solar Portátil', 'Cargador de 20W con paneles solares eficientes', 49.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 100, true),
('22222222-2222-2222-2222-222222222222', 'Auriculares Bambú Bluetooth', 'Auriculares inalámbricos con carcasa de bambú', 89.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 75, true),
('22222222-2222-2222-2222-222222222222', 'Mouse Ecológico', 'Mouse inalámbrico fabricado con plástico reciclado', 34.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 120, true),
('22222222-2222-2222-2222-222222222222', 'Teclado Solar', 'Teclado inalámbrico con recarga solar integrada', 69.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 55, true),
('77777777-7777-7777-7777-777777777777', 'Laptop Reacondicionada', 'Laptop renovada con garantía de 1 año', 449.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 20, true),
('77777777-7777-7777-7777-777777777777', 'Tablet Renovada', 'Tablet reacondicionada en excelente estado', 299.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 15, true),
('77777777-7777-7777-7777-777777777777', 'Smartphone Reacondicionado', 'Smartphone renovado con certificación R2', 349.99, '/placeholder.svg?height=400&width=400', 'Electrónica', 30, true),
-- Belleza
('44444444-4444-4444-4444-444444444444', 'Crema Facial Orgánica', 'Crema hidratante certificada COSMOS Organic', 34.99, '/placeholder.svg?height=400&width=400', 'Belleza', 90, true),
('44444444-4444-4444-4444-444444444444', 'Champú Sólido Natural', 'Champú sin sulfatos en formato sólido', 14.99, '/placeholder.svg?height=400&width=400', 'Belleza', 150, true),
('44444444-4444-4444-4444-444444444444', 'Sérum Vitamina C', 'Sérum facial vegano con vitamina C natural', 42.99, '/placeholder.svg?height=400&width=400', 'Belleza', 70, true),
('44444444-4444-4444-4444-444444444444', 'Aceite de Argán Orgánico', 'Aceite puro de argán certificado orgánico', 29.99, '/placeholder.svg?height=400&width=400', 'Belleza', 85, true),
('44444444-4444-4444-4444-444444444444', 'Mascarilla Arcilla Verde', 'Mascarilla facial de arcilla 100% natural', 19.99, '/placeholder.svg?height=400&width=400', 'Belleza', 110, true),
('44444444-4444-4444-4444-444444444444', 'Bálsamo Labial Vegano', 'Bálsamo labial sin cera de abeja', 7.99, '/placeholder.svg?height=400&width=400', 'Belleza', 200, true),
('44444444-4444-4444-4444-444444444444', 'Desodorante Natural', 'Desodorante sin aluminio ni parabenos', 12.99, '/placeholder.svg?height=400&width=400', 'Belleza', 130, true),
-- Alimentos
('11111111-1111-1111-1111-111111111111', 'Miel Orgánica', 'Miel pura certificada USDA Organic - 500g', 18.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 120, true),
('11111111-1111-1111-1111-111111111111', 'Quinoa Orgánica', 'Quinoa real certificada Fair Trade - 1kg', 12.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 150, true),
('11111111-1111-1111-1111-111111111111', 'Café Orgánico', 'Café de comercio justo tostado artesanalmente - 250g', 15.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 200, true),
('11111111-1111-1111-1111-111111111111', 'Aceite de Oliva Extra Virgen', 'Aceite prensado en frío certificado orgánico - 500ml', 24.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 80, true),
('66666666-6666-6666-6666-666666666666', 'Almendras Orgánicas', 'Almendras crudas certificadas EU Organic - 500g', 16.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 100, true),
('66666666-6666-6666-6666-666666666666', 'Cacao en Polvo Orgánico', 'Cacao puro sin azúcar añadida - 250g', 13.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 90, true),
('66666666-6666-6666-6666-666666666666', 'Pasta Integral Orgánica', 'Pasta de trigo integral certificada - 500g', 4.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 180, true),
('66666666-6666-6666-6666-666666666666', 'Té Verde Orgánico', 'Té verde de hojas sueltas certificado - 100g', 9.99, '/placeholder.svg?height=400&width=400', 'Alimentos', 140, true),
-- Hogar
('55555555-5555-5555-5555-555555555555', 'Jabón Biodegradable', 'Jabón líquido multiusos ecológico - 1L', 8.99, '/placeholder.svg?height=400&width=400', 'Hogar', 160, true),
('55555555-5555-5555-5555-555555555555', 'Cepillo de Bambú', 'Set de 3 cepillos de limpieza de bambú', 12.99, '/placeholder.svg?height=400&width=400', 'Hogar', 110, true),
('55555555-5555-5555-5555-555555555555', 'Bolsas Reutilizables', 'Set de 5 bolsas de algodón para compras', 19.99, '/placeholder.svg?height=400&width=400', 'Hogar', 200, true),
('55555555-5555-5555-5555-555555555555', 'Velas de Soja Natural', 'Set de 3 velas aromáticas de cera de soja', 24.99, '/placeholder.svg?height=400&width=400', 'Hogar', 85, true),
('55555555-5555-5555-5555-555555555555', 'Toallas de Bambú', 'Juego de 2 toallas de fibra de bambú', 34.99, '/placeholder.svg?height=400&width=400', 'Hogar', 70, true),
('88888888-8888-8888-8888-888888888888', 'Macetas Recicladas', 'Set de 3 macetas de plástico reciclado', 22.99, '/placeholder.svg?height=400&width=400', 'Hogar', 60, true),
('88888888-8888-8888-8888-888888888888', 'Alfombra de Yute', 'Alfombra artesanal de fibra natural - 120x80cm', 69.99, '/placeholder.svg?height=400&width=400', 'Hogar', 35, true),
('88888888-8888-8888-8888-888888888888', 'Cojines de Algodón Reciclado', 'Set de 2 cojines decorativos ecológicos', 39.99, '/placeholder.svg?height=400&width=400', 'Hogar', 50, true);

-- Habilitar RLS nuevamente
ALTER TABLE public.vendors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
