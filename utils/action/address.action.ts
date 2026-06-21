"use server";

import { revalidatePath } from "next/cache";

interface AddressDBParams {
  region: string;
  title: string;
  address: string;
  state: string;
  city: string;
  phone: string;
  countryCode: string;
  flag: string;
}

export async function fetchAddresses() {
  return [];
}

export async function saveAddressDB(formData: AddressDBParams) {
  console.log("address params--====>", formData);
  revalidatePath("/address");
  return { success: true };
}

export async function makeDefaultAddress(addressId: string) {
  revalidatePath("/address");
  return true;
}