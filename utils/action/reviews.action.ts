"use server";

import { OrderParams } from "@/shared.types";

interface ReviewDataParams {
  reviewTitle: string;
  reviewDescription: string;
  productRating: number;
  deliveryRating: number;
  reviewImageUrls: string[];
}

export async function uploadImagesToSupabase(formData: FormData) {
  return { success: true, imageUrls: ["/mock-image.png"] };
}

export async function createReview({
  reviewData,
  orderToReview,
}: {
  reviewData: ReviewDataParams;
  orderToReview: OrderParams;
}) {
  return { success: true, reviewData: {} };
}