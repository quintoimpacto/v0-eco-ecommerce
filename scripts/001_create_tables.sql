-- Create profiles table for vendors and users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null check (role in ('vendor', 'customer', 'admin')) default 'customer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create vendors table
create table if not exists public.vendors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  store_name text not null,
  description text,
  logo_url text,
  banner_url text,
  sustainability_score decimal(3,2) default 0.00 check (sustainability_score >= 0 and sustainability_score <= 5),
  total_certifications integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id)
);

-- Create certifications table
create table if not exists public.certifications (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  name text not null,
  issuer text not null,
  description text,
  certificate_url text,
  issue_date date not null,
  expiry_date date,
  score_weight decimal(3,2) default 1.00 check (score_weight >= 0 and score_weight <= 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  vendor_id uuid not null references public.vendors(id) on delete cascade,
  name text not null,
  description text,
  price decimal(10,2) not null check (price >= 0),
  image_url text,
  category text,
  stock integer default 0 check (stock >= 0),
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;
alter table public.vendors enable row level security;
alter table public.certifications enable row level security;
alter table public.products enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Vendors policies
create policy "Vendors are viewable by everyone"
  on public.vendors for select
  using (true);

create policy "Users can create their own vendor profile"
  on public.vendors for insert
  with check (exists (
    select 1 from public.profiles
    where profiles.id = auth.uid()
    and profiles.role = 'vendor'
  ));

create policy "Vendors can update their own vendor profile"
  on public.vendors for update
  using (user_id = auth.uid());

create policy "Vendors can delete their own vendor profile"
  on public.vendors for delete
  using (user_id = auth.uid());

-- Certifications policies
create policy "Certifications are viewable by everyone"
  on public.certifications for select
  using (true);

create policy "Vendors can create their own certifications"
  on public.certifications for insert
  with check (exists (
    select 1 from public.vendors
    where vendors.id = vendor_id
    and vendors.user_id = auth.uid()
  ));

create policy "Vendors can update their own certifications"
  on public.certifications for update
  using (exists (
    select 1 from public.vendors
    where vendors.id = vendor_id
    and vendors.user_id = auth.uid()
  ));

create policy "Vendors can delete their own certifications"
  on public.certifications for delete
  using (exists (
    select 1 from public.vendors
    where vendors.id = vendor_id
    and vendors.user_id = auth.uid()
  ));

-- Products policies
create policy "Active products are viewable by everyone"
  on public.products for select
  using (is_active = true or exists (
    select 1 from public.vendors
    where vendors.id = vendor_id
    and vendors.user_id = auth.uid()
  ));

create policy "Vendors can create their own products"
  on public.products for insert
  with check (exists (
    select 1 from public.vendors
    where vendors.id = vendor_id
    and vendors.user_id = auth.uid()
  ));

create policy "Vendors can update their own products"
  on public.products for update
  using (exists (
    select 1 from public.vendors
    where vendors.id = vendor_id
    and vendors.user_id = auth.uid()
  ));

create policy "Vendors can delete their own products"
  on public.products for delete
  using (exists (
    select 1 from public.vendors
    where vendors.id = vendor_id
    and vendors.user_id = auth.uid()
  ));

-- Create function to update vendor sustainability score
create or replace function update_vendor_sustainability_score()
returns trigger as $$
begin
  update public.vendors
  set 
    sustainability_score = (
      select coalesce(avg(score_weight), 0)
      from public.certifications
      where vendor_id = new.vendor_id
    ),
    total_certifications = (
      select count(*)
      from public.certifications
      where vendor_id = new.vendor_id
    ),
    updated_at = now()
  where id = new.vendor_id;
  return new;
end;
$$ language plpgsql;

-- Create trigger to automatically update sustainability score
drop trigger if exists update_sustainability_score_trigger on public.certifications;
create trigger update_sustainability_score_trigger
  after insert or update or delete on public.certifications
  for each row
  execute function update_vendor_sustainability_score();

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', null),
    coalesce(new.raw_user_meta_data ->> 'role', 'customer')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Create trigger for new user signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Create indexes for better performance
create index if not exists vendors_sustainability_score_idx on public.vendors(sustainability_score desc);
create index if not exists vendors_user_id_idx on public.vendors(user_id);
create index if not exists certifications_vendor_id_idx on public.certifications(vendor_id);
create index if not exists products_vendor_id_idx on public.products(vendor_id);
create index if not exists products_category_idx on public.products(category);
