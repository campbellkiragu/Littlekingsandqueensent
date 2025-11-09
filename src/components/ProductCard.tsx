import { Heart, Star, MessageSquare } from 'lucide-react';
import { Product } from '../types';
import { useState, useEffect } from 'react';
import { supabase, getSessionId } from '../lib/supabase';
import { useToast } from './Toast';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const { showToast } = useToast();

  useEffect(() => {
    loadProductData();
  }, [product.id]);

  const loadProductData = async () => {
    const sessionId = getSessionId();

    const { data: likes } = await supabase
      .from('product_likes')
      .select('id, user_session_id')
      .eq('product_id', product.id);

    if (likes) {
      setLikeCount(likes.length);
      setLiked(likes.some((like) => like.user_session_id === sessionId));
    }

    const { data: reviews } = await supabase
      .from('product_reviews')
      .select('rating')
      .eq('product_id', product.id);

    if (reviews && reviews.length > 0) {
      const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      setAverageRating(avgRating);
      setReviewCount(reviews.length);
    }
  };

  const handleLikeToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const sessionId = getSessionId();

    try {
      if (liked) {
        const { error } = await supabase
          .from('product_likes')
          .delete()
          .eq('product_id', product.id)
          .eq('user_session_id', sessionId);

        if (error) throw error;
        setLiked(false);
        setLikeCount((prev) => prev - 1);
        showToast('Removed from favorites', 'info');
      } else {
        const { error } = await supabase
          .from('product_likes')
          .insert({ product_id: product.id, user_session_id: sessionId });

        if (error) throw error;
        setLiked(true);
        setLikeCount((prev) => prev + 1);
        showToast('Added to favorites', 'success');
      }
    } catch (error) {
      showToast('Failed to update favorite status', 'error');
    }
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = `Hi! I'm interested in renting: ${product.name}`;
    window.open(`https://wa.me/254723153712?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
    >
      <div className="relative h-64 overflow-hidden bg-gray-200">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
            <span className="text-gray-400 text-lg">No Image</span>
          </div>
        )}
        <button
          onClick={handleLikeToggle}
          className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
        <div className="absolute bottom-3 left-3 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {product.category}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">
              {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings'}
            </span>
            <span className="text-xs text-gray-500">({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Heart className="w-4 h-4" />
            <span className="text-sm">{likeCount}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">{reviewCount}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-amber-600">KSh {product.price.toLocaleString()}</span>
            <span className="text-sm text-gray-500 ml-1">/ day</span>
          </div>
          <button
            onClick={handleBookNow}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
