"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import Container from "@/components/Container";

interface HeroProps {
  onEnquireClick: () => void;
}

export default function Hero({ onEnquireClick }: HeroProps) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("authUser");
      if (raw) {
        const parsed = JSON.parse(raw) as { name?: string };
        setUserName(parsed?.name || null);
      }
    } catch {
      setUserName(null);
    }
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center pt-32 lg:pt-36 pb-16 overflow-hidden bg-[#eef1f7]">

      <Container className="relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 max-w-[550px]"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span>Accredian Enterprise</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1]">
            Build <span className="text-primary italic">High-Performance</span> Product Teams
          </h1>

          <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
            Re-imagine executive education for the modern professional. Empower your team with industry-leading programs designed for future leaders.
          </p>

          <ul className="space-y-4">
            <HeroListItem text="Customized Learning Paths for Corporates" />
            <HeroListItem text="Mentorship from Industry Leaders" />
            <HeroListItem text="Hands-on Project Based Curriculum" />
          </ul>

          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            <button
              onClick={onEnquireClick}
              className="w-full sm:w-auto bg-primary hover:bg-primary-600 text-white px-8 py-4 rounded-2xl font-bold text-lg smooth-transition shadow-xl shadow-primary/20 flex items-center justify-center space-x-2 group"
            >
              <span>Enquire Now</span>
              <ArrowRight className="group-hover:translate-x-1 smooth-transition" size={20} />
            </button>
            <button className="w-full sm:w-auto text-gray-700 font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 smooth-transition border border-gray-200">
              View Programs
            </button>
          </div>
        </motion.div>

        {/* Right Content - Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative lg:h-[600px] flex items-center justify-center"
        >
          <div className="w-full h-[420px] sm:h-[500px] lg:h-[600px] rounded-3xl shadow-2xl overflow-hidden bg-white border border-slate-200 flex flex-col">
            <div
              className="h-[72%] bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/image.jpg')" }}
            />
            <div className="h-[28%] bg-gradient-to-r from-white via-blue-50 to-sky-100 px-7 md:px-10 py-6 flex flex-col justify-center border-t border-blue-100">
              {userName && (
                <div className="self-end md:self-start mb-3">
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-rose-50 text-rose-800 font-bold text-base ring-1 ring-rose-100 shadow-sm">
                    Hi, {userName}
                  </span>
                </div>
              )}
              <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
                <span className="text-primary italic">Future-Ready</span> Skills
              </h3>
              <p className="text-slate-700 mt-2 font-medium">For the next generation of leaders</p>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

function HeroListItem({ text }: { text: string }) {
  return (
    <li className="flex items-center space-x-3 text-gray-700 font-medium">
      <CheckCircle2 className="text-primary" size={24} />
      <span>{text}</span>
    </li>
  );
}
