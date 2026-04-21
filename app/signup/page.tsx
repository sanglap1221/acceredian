"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Lock, UserPlus, User } from "lucide-react";
import { motion } from "framer-motion";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const sessionDurationMs = 8 * 60 * 60 * 1000;

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Signup failed");
      }

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("authUser", JSON.stringify(data.user));
      localStorage.setItem("authExpiresAt", String(Date.now() + sessionDurationMs));
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 pt-32">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 p-8 md:p-12 relative overflow-hidden"
      >
        {/* Back to Home */}
        <Link 
          href="/" 
          className="absolute top-8 left-8 text-gray-400 hover:text-primary smooth-transition flex items-center space-x-2 text-sm font-bold"
        >
          <ArrowLeft size={16} />
          <span>Home</span>
        </Link>

        <div className="mt-8 text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">Start for Free</h1>
          <p className="text-gray-500">Join 10K+ professionals upskilling with Accredian.</p>
        </div>

        <form onSubmit={handleSignup} className="mt-10 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none smooth-transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none smooth-transition"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none smooth-transition"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </p>
          )}

          <p className="text-[10px] text-gray-400 px-2 leading-relaxed">
            By creating an account, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link>.
          </p>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-600 text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 mt-6 smooth-transition"
          >
            <span>{isSubmitting ? "Creating Account..." : "Create Account"}</span>
            <UserPlus size={20} />
          </button>
        </form>

        <div className="mt-10 text-center text-sm text-gray-500">
          Already using Accredian?{" "}
          <Link href="/login" className="text-primary font-bold hover:underline">Sign in instead</Link>
        </div>
      </motion.div>
    </div>
  );
}
