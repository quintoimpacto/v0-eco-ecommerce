-- Update orders table RLS policies to allow users to view their own orders

-- Drop existing policy if exists
drop policy if exists "Users can view their own orders" on public.orders;

-- Create policy for users to view their own orders
create policy "Users can view their own orders"
  on public.orders
  for select
  using (user_id = auth.uid());

-- Ensure vendors can still view their orders
-- The existing vendor policy should remain in place
