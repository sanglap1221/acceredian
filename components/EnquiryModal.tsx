"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2 } from "lucide-react";
import { useState } from "react";

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Mock API call
    console.log("Enquiry Form Submitted:", data);
    
    try {
      const response = await fetch('/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("API Response:", result);
    } catch (error) {
      console.error("API Error:", error);
    }

    // Simulate delay
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');
    }, 1500);
  };

  const handleClose = () => {
    onClose();
    // Reset after transition finishes
    setTimeout(() => setStep('form'), 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-gray-950/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 smooth-transition text-gray-400 hover:text-gray-900"
            >
              <X size={24} />
            </button>

            <div className="p-10 pt-16">
              {step === 'form' ? (
                <>
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">Enquire Now</h3>
                    <p className="text-gray-500">
                      Fill in your details and our team will get back to you within 24 hours.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none smooth-transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-bold text-gray-700 ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="john@company.com"
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none smooth-transition"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-bold text-gray-700 ml-1">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        required
                        placeholder="Organization Inc."
                        className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-primary focus:bg-white outline-none smooth-transition"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary-600 disabled:bg-gray-400 text-white font-bold py-5 rounded-2xl shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 mt-8 smooth-transition"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Request</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-10 space-y-6">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    >
                      <CheckCircleIcon size={40} />
                    </motion.div>
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">Request Received!</h3>
                  <p className="text-gray-500 max-w-xs mx-auto">
                    Thank you for your interest. Our consultants will contact you shortly to discuss your requirements.
                  </p>
                  <button
                    onClick={handleClose}
                    className="w-full border border-gray-200 text-gray-700 font-bold py-4 rounded-2xl hover:bg-gray-50 smooth-transition"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

function CheckCircleIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
