-- Update EcoVida vendor with the new banner image
UPDATE vendors 
SET banner_url = '/stores/ecovida-banner.png'
WHERE store_name = 'EcoVida';

-- If EcoVida doesn't exist, update the first vendor as an example
UPDATE vendors 
SET banner_url = '/stores/ecovida-banner.png'
WHERE id = (SELECT id FROM vendors ORDER BY created_at ASC LIMIT 1)
AND NOT EXISTS (SELECT 1 FROM vendors WHERE store_name = 'EcoVida');
