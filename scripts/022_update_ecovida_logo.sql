-- Update the EcoVida store with the new logo
UPDATE vendors 
SET logo_url = '/stores/ecovida-logo.png'
WHERE store_name = 'EcoVida';

-- If EcoVida doesn't exist, you can use this on any store (replace store_name)
-- UPDATE vendors 
-- SET logo_url = '/stores/ecovida-logo.png'
-- WHERE store_name = 'Tu Nombre de Tienda';
