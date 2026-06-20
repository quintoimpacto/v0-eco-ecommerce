-- Add rating and review_count columns to products table
alter table public.products
add column if not exists rating decimal(2,1) default 0.0 check (rating >= 0 and rating <= 5),
add column if not exists review_count integer default 0 check (review_count >= 0);

-- Add some sample ratings to existing products
update public.products
set rating = 4.5, review_count = 127
where name = 'Camiseta Orgánica Básica';

update public.products
set rating = 4.8, review_count = 243
where name like '%Botella%';

update public.products
set rating = 4.2, review_count = 89
where name like '%Shampoo%';

update public.products
set rating = 4.6, review_count = 156
where name like '%Café%';

update public.products
set rating = 4.3, review_count = 72
where name like '%Jabón%';

-- Set random ratings for other products
update public.products
set 
  rating = round((random() * 2 + 3)::numeric, 1),
  review_count = floor(random() * 300 + 20)::integer
where rating = 0;
