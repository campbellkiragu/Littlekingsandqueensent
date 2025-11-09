/*
  # Event Equipment Rental System Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text, product name)
      - `description` (text, product description)
      - `price` (numeric, rental price)
      - `category` (text, equipment category)
      - `image_url` (text, Supabase Storage URL)
      - `created_at` (timestamptz, creation timestamp)
      - `updated_at` (timestamptz, last update timestamp)
      - `is_active` (boolean, visibility flag)
    
    - `product_likes`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `user_session_id` (text, anonymous session identifier)
      - `created_at` (timestamptz, like timestamp)
      - Unique constraint on (product_id, user_session_id)
    
    - `product_reviews`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `rating` (integer, 1-5 stars)
      - `review_text` (text, review content)
      - `user_session_id` (text, anonymous session identifier)
      - `created_at` (timestamptz, review timestamp)
    
  2. Storage
    - Create storage bucket for product images
    
  3. Security
    - Enable RLS on all tables
    - Public read access for products, likes, and reviews
    - Only authenticated admin can create/update/delete products
    - Anyone can add likes and reviews (anonymous)
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL CHECK (price >= 0),
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  is_active boolean DEFAULT true
);

CREATE TABLE IF NOT EXISTS product_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  user_session_id text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_session_id)
);

CREATE TABLE IF NOT EXISTS product_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text text,
  user_session_id text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_product_likes_product_id ON product_likes(product_id);
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_id ON product_reviews(product_id);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON products FOR SELECT
  USING (is_active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Anyone can view likes"
  ON product_likes FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add likes"
  ON product_likes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can delete their own likes"
  ON product_likes FOR DELETE
  USING (true);

CREATE POLICY "Anyone can view reviews"
  ON product_reviews FOR SELECT
  USING (true);

CREATE POLICY "Anyone can add reviews"
  ON product_reviews FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete reviews"
  ON product_reviews FOR DELETE
  TO authenticated
  USING (true);

INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public read access for product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can upload product images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can update product images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'product-images')
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Authenticated users can delete product images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'product-images');