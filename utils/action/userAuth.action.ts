"use server";

import { revalidatePath } from "next/cache";

export async function login(formData: FormData) {
  revalidatePath("/");
}

export async function verifyToken(formData: FormData) {
  revalidatePath("/");
  return { error: null, session: { user: { email: formData.get("email") } } };
}

export async function signOut() {
  revalidatePath("/");
}