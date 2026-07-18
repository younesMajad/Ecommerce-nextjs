"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { sendMagicLink, verifyOtp } from "@/utils/action/userAuth.action";
import { useAppContext } from "@/context/App.Context";

const LoginUser = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpStep, setOtpStep] = useState(false);
  const [token, setToken] = useState("");
  const { setUser } = useAppContext();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      setLoading(true);
      if (!email) {
        toast.error("Please enter a valid email address");
        return;
      }

      const formData = new FormData();
      formData.append("email", email);

      const result = await sendMagicLink(email);

      if (result?.error) {
        toast.error("Something went wrong with signing in");
        return;
      }
      setOtpStep(true);
      toast.success("Check your email for the login link!");
    } catch (error) {
      console.error("Something went wrong. Please try again later.", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitToken = async () => {
    try {
      setLoading(true);
      const result = await verifyOtp(email, token);

      if (result?.error) {
        toast.error("Invalid token. Please try again.");
        return;
      }
      if (result?.user) {
        toast.success("You are now logged in!");
        setUser({
          id: result.user.id,
          email: result.user.email!,
          full_name: result.user.user_metadata?.full_name,
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting token:", error);
    } finally {
      setLoading(false);
    }
  };

  return otpStep ? (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <section className="flex flex-col justify-center items-center h-screen gap-4 text-white pt-10 w-[80%] mx-auto">
        <div className="self-center">
          <h1 className="text-4xl font-bold mb-4 max-md:text-xl">Token From Your Email</h1>
          <p className="text-lg md:text-2xl max-md:text-sm text-center text-slate-500">
            Check the mailbox too.
          </p>
        </div>

        <div className="px-4 sm:px-0">
          <input
            aria-label="Token"
            placeholder="Enter Token"
            className="w-full px-4 py-3 bg-white rounded-lg transition-all duration-200 placeholder-gray-400 text-black shadow-sm"
            name="token"
            type="text"
            onChange={(e) => setToken(e.target.value)}
          />
          <button
            onClick={handleSubmitToken}
            className="px-3 py-2 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 bg-[#043033] rounded-lg focus:outline-none"
            type="button"
          >
            {loading ? "submitting" : "Submit"}
          </button>
        </div>
      </section>
    </motion.div>
  ) : (
    <div className="bg-black">
      <section className="flex flex-col justify-center h-screen items-center gap-6 text-white w-full px-4">
        <Link href="/">
          <h1 className="text-4xl font-bold text-center">Store</h1>
        </Link>

        <h1 className="text-2xl md:text-2xl max-md:text-xl font-bold text-center">
          Please Provide Your Email
        </h1>

        <div className="w-full max-w-[600px] flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            name="email"
            type="email"
            id="Email"
            className="w-full px-4 py-3 bg-white rounded-lg transition-all duration-200 placeholder-gray-400 text-black shadow-sm"
          />
        </div>
        <button
          onClick={handleLogin}
          className="px-3 py-2 mt-4 text-sm font-medium tracking-wide text-blue-500 capitalize transition-colors duration-300 bg-amber-50 rounded-lg focus:outline-none"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <div className="flex flex-row justify-center align-center text-white items-center">
          <p>We sign you up if you don&apos;t have an account? </p>
          <Link
            href="/signup"
            className="px-3 py-2 text-sm font-medium tracking-wide text-blue-500 capitalize transition-colors duration-300 focus:outline-none"
          >
            SignUp
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LoginUser;
