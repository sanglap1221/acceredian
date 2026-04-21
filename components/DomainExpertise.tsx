"use client";

import { motion } from "framer-motion";
import {
  Brain,
  ChartNoAxesColumn,
  Cog,
  Globe,
  Lightbulb,
  Users,
  WalletCards,
} from "lucide-react";
import Container from "@/components/Container";

const expertiseItems = [
  {
    title: "Product & Innovation Hub",
    icon: Lightbulb,
  },
  {
    title: "Gen-AI Mastery",
    icon: Brain,
  },
  {
    title: "Leadership Elevation",
    icon: Users,
  },
  {
    title: "Tech & Data Insights",
    icon: ChartNoAxesColumn,
  },
  {
    title: "Operations Excellence",
    icon: Cog,
  },
  {
    title: "Digital Enterprise",
    icon: Globe,
  },
  {
    title: "Fintech Innovation Lab",
    icon: WalletCards,
  },
];

export default function DomainExpertise() {
  return (
    <section id="domain-expertise" className="py-24 md:py-28 bg-[#f3f4f6]">

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto text-center space-y-3 mb-14 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Our <span className="text-primary">Domain Expertise</span>
          </h2>
          <p className="text-lg md:text-[2rem] text-gray-800">
            <span className="text-primary font-semibold">Specialized Programs</span>{" "}
            Designed to Fuel Innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {expertiseItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.07 }}
                className={`group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md smooth-transition p-8 min-h-[190px] flex flex-col items-center justify-center text-center overflow-hidden ${
                  index === expertiseItems.length - 1 ? "md:col-start-2" : ""
                }`}
              >
                <div className="mb-6 text-primary group-hover:scale-105 smooth-transition">
                  <Icon size={52} strokeWidth={2} />
                </div>
                <h3 className="text-[1.9rem] md:text-[2rem] font-extrabold text-gray-900 leading-tight tracking-tight">
                  {item.title}
                </h3>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}