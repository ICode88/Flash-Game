"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import SectionHeading from "@/components/ui/section-heading";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  game: string;
  date: string;
  helpful: number;
}

const reviews: Review[] = [
  {
    id: "r1",
    userName: "Ahmad S.",
    rating: 5,
    comment: "TopUp diamond ML super cepat, langsung masuk ke akun. Recommended!",
    game: "Mobile Legends",
    date: "2024-03-20",
    helpful: 24,
  },
  {
    id: "r2",
    userName: "Dewi R.",
    rating: 5,
    comment: "Proses cepat dan aman. CS ramah dan responsif via WhatsApp.",
    game: "PUBG Mobile",
    date: "2024-03-19",
    helpful: 18,
  },
  {
    id: "r3",
    userName: "Budi W.",
    rating: 4,
    comment: "Harga bersaing dan banyak promo. Akan order lagi.",
    game: "Free Fire",
    date: "2024-03-18",
    helpful: 15,
  },
];

export default function ReviewsPage() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);

  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!comment.trim()) {
      toast.error("Please write a review");
      return;
    }

    toast.success("Thank you for your review!");
    setRating(0);
    setComment("");
  };

  const handleHelpful = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) {
      setHelpfulReviews(helpfulReviews.filter(id => id !== reviewId));
    } else {
      setHelpfulReviews([...helpfulReviews, reviewId]);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <SectionHeading
        title="Customer Reviews"
        description="See what our customers say about us"
        className="text-center mb-12"
      />

      {/* Write Review Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto mb-16"
      >
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          
          <div className="mb-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            className="mb-4"
          />

          <Button
            onClick={handleSubmitReview}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Submit Review
          </Button>
        </div>
      </motion.div>

      {/* Reviews List */}
      <div className="max-w-3xl mx-auto space-y-6">
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-semibold">{review.userName}</h4>
                <p className="text-sm text-muted-foreground">{review.game}</p>
              </div>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="mb-4">{review.comment}</p>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                {new Date(review.date).toLocaleDateString()}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleHelpful(review.id)}
                className={helpfulReviews.includes(review.id) ? "text-purple-600" : ""}
              >
                <ThumbsUp className="h-4 w-4 mr-2" />
                Helpful ({review.helpful + (helpfulReviews.includes(review.id) ? 1 : 0)})
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}