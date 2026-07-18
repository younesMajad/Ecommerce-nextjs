import { z } from "zod";

export const emailValidationSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const signupSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export const addressSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.email({ message: "Invalid email address" }),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(4, "Zip code is required"),
  country: z.string().min(2, "Country is required"),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  title: z.string().min(1, "Title is required").max(100),
  comment: z.string().min(10, "Comment must be at least 10 characters").max(1000),
});

export const couponSchema = z.object({
  code: z.string().min(3, "Code must be at least 3 characters"),
  discount_percent: z.number().min(1).max(100),
  max_uses: z.number().min(1),
  min_order_amount: z.number().min(0),
  expires_at: z.string(),
});

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be greater than 0"),
  offer_price: z.number().min(0),
  quantity: z.number().min(0),
  brand: z.string().min(1, "Brand is required"),
  category_id: z.string().uuid("Invalid category"),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  image_url_array: z.array(z.string().url()).min(1, "At least one image is required"),
});
