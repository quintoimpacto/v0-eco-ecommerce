-- Update all products with "Belleza" category to "Bienestar"
UPDATE products 
SET category = 'Bienestar' 
WHERE category = 'Belleza' OR category = 'Belleza & Cuidado';

-- Update any vendor names or descriptions that mention "Belleza"
UPDATE vendors 
SET store_name = REPLACE(store_name, 'Belleza', 'Bienestar'),
    description = REPLACE(description, 'Belleza', 'Bienestar')
WHERE store_name LIKE '%Belleza%' OR description LIKE '%Belleza%';
