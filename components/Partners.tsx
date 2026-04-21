"use client";

import { motion } from "framer-motion";
import Container from "@/components/Container";

const partners = [
  { name: "IBM", mark: "IBM", accent: "#0f62fe" },
  { name: "Microsoft", mark: "MS", accent: "#2563eb" },
  { name: "Google", mark: "G", accent: "#1a73e8" },
  { name: "Amazon", mark: "AZ", accent: "#111827" },
  { name: "Intel", mark: "IN", accent: "#0071c5" },
  { name: "Samsung", mark: "SS", accent: "#1428a0" },
  { name: "Adobe", mark: "Ae", accent: "#ef4444" },
  { name: "Cisco", mark: "CS", accent: "#0284c7" },
  { name: "SAP", mark: "SAP", accent: "#0ea5e9" },
  { name: "Infosys", mark: "IF", accent: "#2563eb" },
  { name: "Deloitte", mark: "D", accent: "#16a34a" },
  { name: "Accenture", mark: "AC", accent: "#4338ca" },
];

export default function Partners() {
  return (
    <section id="partners" className="py-24 bg-[#f3f4f6] overflow-hidden">
      <Container className="text-center">
        <h2 className="text-2xl font-bold text-slate-600 uppercase tracking-[0.22em] mb-16">
          Trusted by Industry Giants
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="group bg-white border border-slate-200 rounded-2xl p-4 md:p-5 min-h-[118px] flex flex-col items-center justify-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 smooth-transition"
            >
              <div
                className="h-10 min-w-10 px-3 rounded-xl border font-extrabold tracking-wide text-sm flex items-center justify-center"
                style={{
                  color: partner.accent,
                  borderColor: `${partner.accent}40`,
                  backgroundColor: `${partner.accent}10`,
                }}
              >
                {partner.mark}
              </div>
              <div className="text-lg font-bold text-slate-700 group-hover:text-slate-900 smooth-transition">
                {partner.name}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-primary rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left space-y-2">
            <h3 className="text-3xl font-bold">Partner with Accredian</h3>
            <p className="text-blue-100 italic">Bring world-class training to your organization.</p>
          </div>
          <button className="bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 smooth-transition shadow-lg shadow-black/10">
            Corporate Training
          </button>
        </div>
      </Container>
    </section>
  );
}
