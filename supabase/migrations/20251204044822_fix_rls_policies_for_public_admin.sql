/*
  # Fix RLS policies for public admin access
  
  Since authentication was removed from the admin dashboard, we need to update RLS policies
  to allow public/unauthenticated users to manage products.
  
  Changes:
  - Update INSERT policy to allow public users
  - Update UPDATE policy to allow public users  
  - Update DELETE policy to allow public users
*/

DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

CREATE POLICY "Anyone can insert products"
  ON products
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update products"
  ON products
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete products"
  ON products
  FOR DELETE
  TO public
  USING (true);
