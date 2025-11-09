import { X, Star, Heart, Send } from 'lucide-react';
import { Product, ProductReview } from '../types';
import { useState, useEffect } from 'react';
import { supabase, getSessionId } from '../lib/supabase';
import { useToast } from './Toast';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    loadReviews();
  }, [product.id]);

  const loadReviews = async () => {
    const { data, error } = await supabase
      .from('product_reviews')
      .select('*')
      .eq('product_id', product.id)
      .order('created_at', { ascending: false });

    if (error) {
      showToast('Failed to load reviews', 'error');
      return;
    }

    setReviews(data || []);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      showToast('Please select a rating', 'error');
      return;
    }

    setSubmitting(true);
    const sessionId = getSessionId();

    try {
      const { error } = await supabase.from('product_reviews').insert({
        product_id: product.id,
        rating,
        review_text: reviewText.trim() || null,
        user_session_id: sessionId,
      });

      if (error) throw error;

      showToast('Review submitted successfully', 'success');
      setRating(0);
      setReviewText('');
      loadReviews();
    } catch (error) {
      showToast('Failed to submit review', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBookNow = () => {
    const message = `Hi! I'm interested in renting: ${product.name}`;
    window.open(`https://wa.me/254723153712?text=${encodeURIComponent(message)}`, '_blank');
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="relative h-80 rounded-xl overflow-hidden bg-gray-200">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-orange-100">
                  <span className="text-gray-400 text-lg">No Image</span>
                </div>
              )}
            </div>

            <div>
              <div className="inline-block bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {product.category}
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>
              <div className="bg-amber-50 rounded-lg p-4 mb-6">
                <div className="text-3xl font-bold text-amber-600 mb-1">
                  KSh {product.price.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">per day</div>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="text-lg font-semibold text-gray-900">
                  {averageRating > 0 ? averageRating.toFixed(1) : 'No ratings yet'}
                </span>
                <span className="text-gray-600">({reviews.length} reviews)</span>
              </div>
              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
              >
                Book Now via WhatsApp
              </button>
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Leave a Review</h3>
            <form onSubmit={handleSubmitReview} className="mb-8">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="review"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Your Review (Optional)
                </label>
                <textarea
                  id="review"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Share your experience..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting || rating === 0}
                className="flex items-center gap-2 bg-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Customer Reviews ({reviews.length})
              </h3>
              <div className="space-y-4">
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">
                    No reviews yet. Be the first to review this product!
                  </p>
                ) : (
                  reviews.map((review) => (
                    <div key={review.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">
                          {new Date(review.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      {review.review_text && (
                        <p className="text-gray-700">{review.review_text}</p>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
