export interface ProductParams {
  id: string;
  author_id: string;
  sizes: string[];
  colors: string[];
  styles: string[];
  brand: string;
  status: string;
  image_url_array: string[];
  videos_url_array: string[];
  name: string;
  category: {
    id: string;
    name: string;
  };
  price: number;
  description: string;
  discount: number;
  quantity: number;
  product_shipping_fee: number;
  offer_price: number;
  created_at: string;
  updated_at: string;
  location: string;
  product_comment: string;
  average_rating?: number;
  review_count?: number;
}

export interface AddressParams {
  id: string;
  user_id: string;
  title?: string | null;
  region?: string;
  address?: string | null;
  state?: string | null;
  city?: string | null;
  phone?: string | null;
  country_code?: string | null;
  flag?: string | null;
  is_default?: boolean;
  created_at?: string;
}

export type OrderStatus =
  | "processing"
  | "completed"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "returned"
  | "waiting"
  | "reviewed";

export interface OrderParams {
  id: string;
  user_id: string;
  user_email?: string | null;
  product_name: string;
  product_category?: string | null;
  amount_paid: number;
  quantity_bought: number;
  image_url: string;
  status: OrderStatus;
  size?: string | null;
  color?: string | null;
  region?: string | null;
  state?: string | null;
  city?: string | null;
  address: string;
  phone: string;
  reference_paystack: string;
  country_code?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface CategoryParams {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  product_count?: number;
  created_at?: string;
}

export interface ReviewParams {
  id: string;
  user_id: string;
  product_id: string;
  rating: number;
  title: string;
  comment: string;
  user_name?: string;
  user_avatar?: string;
  created_at: string;
}

export interface WishlistParams {
  id: string;
  user_id: string;
  product_id: string;
  product?: ProductParams;
  created_at: string;
}

export interface CouponParams {
  id: string;
  code: string;
  discount_percent: number;
  max_uses: number;
  used_count: number;
  min_order_amount: number;
  expires_at: string;
  is_active: boolean;
  created_at: string;
}

export interface CartItem {
  product: ProductParams;
  quantity: number;
  size?: string;
  color?: string;
}

export interface NotificationParams {
  id: string;
  user_id: string;
  title: string;
  message: string;
  is_read: boolean;
  type: "order" | "promotion" | "system";
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  phone?: string;
  role: "customer" | "admin";
  created_at: string;
  updated_at: string;
}
