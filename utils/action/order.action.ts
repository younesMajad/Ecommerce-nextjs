"use server";

import { OrderParams } from "@/shared.types";

interface OrderItemsParams {
  amount: number;
  user_email: string;
  productName: string;
  quantity: number;
  productCategory: string;
  productImage: string;
  address: {
    address: string;
    city: string;
    country_code: string;
    created_at: string;
    flag: string;
    is_default: boolean;
    phone: string;
    region: string;
    state: string;
    title: string;
  };
  paymentReference: string;
}

export async function createOrder(orderItems: OrderItemsParams) {
  return "mock-order-id";
}

export async function checkOrder(reference: string) {
  return [{ reference_paystack: reference }];
}

export async function fetchOrderById(orderId: string) {
  return null;
}

export async function fetchUserOrders(): Promise<OrderParams[]> {
  return [];
}