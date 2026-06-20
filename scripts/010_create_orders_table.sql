-- Create orders table for tracking sales
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  vendor_id uuid references public.vendors(id) not null,
  product_id uuid references public.products(id) not null,
  quantity integer not null default 1,
  unit_price numeric(10, 2) not null,
  total_price numeric(10, 2) not null,
  customer_name text not null,
  customer_email text not null,
  status text not null default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.orders enable row level security;

-- Vendors can view their own orders
create policy "Vendors can view their own orders"
  on public.orders
  for select
  using (
    vendor_id in (
      select id from public.vendors where user_id = auth.uid()
    )
  );

-- System can create orders (for checkout)
create policy "Anyone can create orders"
  on public.orders
  for insert
  with check (true);

-- Create index for better query performance
create index if not exists orders_vendor_id_idx on public.orders(vendor_id);
create index if not exists orders_created_at_idx on public.orders(created_at);
