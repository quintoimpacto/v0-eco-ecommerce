-- Update all vendors with logo and banner images
UPDATE vendors 
SET 
  logo_url = '/placeholder.svg?height=200&width=200&query=' || 
    CASE store_name
      WHEN 'EcoVendor' THEN 'eco friendly store logo green leaf sustainability'
      WHEN 'GreenMarket' THEN 'green market organic store logo fresh vegetables'
      WHEN 'Sustainable Solutions' THEN 'sustainable solutions company logo modern eco'
      WHEN 'Pure Earth' THEN 'pure earth natural products logo mountains nature'
      WHEN 'Verde Shop' THEN 'verde shop eco store logo green shopping bag'
      ELSE lower(replace(store_name, ' ', '+')) || '+eco+store+logo'
    END,
  banner_url = '/placeholder.svg?height=300&width=1200&query=' || 
    CASE store_name
      WHEN 'EcoVendor' THEN 'eco friendly store banner sustainable products nature background'
      WHEN 'GreenMarket' THEN 'green market banner organic farm fresh produce landscape'
      WHEN 'Sustainable Solutions' THEN 'sustainable business banner modern eco technology'
      WHEN 'Pure Earth' THEN 'pure earth banner natural landscape mountains forest'
      WHEN 'Verde Shop' THEN 'verde shop banner eco shopping sustainable lifestyle'
      ELSE lower(replace(store_name, ' ', '+')) || '+store+banner+eco+products'
    END,
  updated_at = now()
WHERE logo_url IS NULL OR banner_url IS NULL OR logo_url = '' OR banner_url = '';
