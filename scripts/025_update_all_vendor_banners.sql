-- Actualizar banners personalizados para cada vendedor

-- GreenTech Solutions - Tecnología sustentable
UPDATE vendors 
SET banner_url = '/stores/greentech-banner.jpg'
WHERE id = '22222222-2222-2222-2222-222222222222';

-- BioBelleza Natural - Cosméticos naturales
UPDATE vendors 
SET banner_url = '/stores/biobelleza-banner.jpg'
WHERE id = '44444444-4444-4444-4444-444444444444';

-- Hogar Verde - Productos para el hogar ecológicos
UPDATE vendors 
SET banner_url = '/stores/hogar-verde-banner.jpg'
WHERE id = '55555555-5555-5555-5555-555555555555';

-- Alimentos Orgánicos del Valle - Frutas y verduras orgánicas
UPDATE vendors 
SET banner_url = '/stores/alimentos-organicos-banner.jpg'
WHERE id = '66666666-6666-6666-6666-666666666666';

-- TechRecicla - Electrónica reacondicionada
UPDATE vendors 
SET banner_url = '/stores/techrecicla-banner.jpg'
WHERE id = '77777777-7777-7777-7777-777777777777';

-- Artesanías Sustentables - Productos artesanales
UPDATE vendors 
SET banner_url = '/stores/artesanias-banner.jpg'
WHERE id = '88888888-8888-8888-8888-888888888888';

-- EcoVida - Productos orgánicos certificados
UPDATE vendors 
SET banner_url = '/stores/ecovida-banner.jpg'
WHERE id = '11111111-1111-1111-1111-111111111111';

-- Moda Consciente - Ropa ética y sostenible
UPDATE vendors 
SET banner_url = '/stores/moda-consciente-banner.jpg'
WHERE id = '33333333-3333-3333-3333-333333333333';
