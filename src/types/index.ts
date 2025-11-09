export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface ProductLike {
  id: string;
  product_id: string;
  user_session_id: string;
  created_at: string;
}

export interface ProductReview {
  id: string;
  product_id: string;
  rating: number;
  review_text: string | null;
  user_session_id: string;
  created_at: string;
}

export const CATEGORIES = [
  'All',
  'Bouncing Castles',
  'Slides',
  'Wall Climbers',
  'Mascots',
  'Cotton Candy',
  'Trampolines',
  'Horse and Camel Riding',
  'Quadbikes and Go Carts',
  'Boat Riding',
  'Trains',
];
