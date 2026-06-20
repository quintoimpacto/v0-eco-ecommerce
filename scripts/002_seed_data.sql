-- Insert sample vendors (you'll need to replace these UUIDs with actual auth user IDs after signup)
-- This is just sample data structure

-- Sample certifications data
insert into public.certifications (vendor_id, name, issuer, description, issue_date, expiry_date, score_weight)
select 
  v.id,
  'ISO 14001',
  'International Organization for Standardization',
  'Environmental Management System certification',
  '2024-01-01'::date,
  '2027-01-01'::date,
  4.5
from public.vendors v
limit 1
on conflict do nothing;
