"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Container from "@/components/Container";

const faqs = [
  {
    question: "Who is this program for?",
    answer: "This program is designed for working professionals, executives, and team leaders who want to upskill in modern technologies and leadership strategies."
  },
  {
    question: "Do I get a certificate after completion?",
    answer: "Yes, every learner receives a globally recognized certificate from Accredian and our partner institutions upon successful completion of the coursework."
  },
  {
    question: "Are there any prerequisites for the technical programs?",
    answer: "While some technical background is helpful, our foundations modules ensure that anyone with an analytical mindset can succeed in our programs."
  },
  {
    question: "How do I enroll as a corporate group?",
    answer: "For corporate enrollments, please use the 'Enquire Now' button to get in touch with our partnerships team for customized pricing and curriculum."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gray-50">
      <Container className="max-w-3xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-500">
            Find answers to common questions about our programs and admissions process.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md smooth-transition"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-gray-900 pr-8">{faq.question}</span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center smooth-transition ${openIndex === index ? 'bg-primary text-white' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
                </div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-gray-500 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
