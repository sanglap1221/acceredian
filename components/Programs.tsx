"use client";

import { Code2, Database, BrainCircuit, ExternalLink } from "lucide-react";
import Container from "@/components/Container";

const programs = [
  {
    title: "Full Stack Development",
    icon: <Code2 size={24} />,
    description: "Master modern web technologies from frontend to backend. Build scalable applications with React, Node, and more.",
    color: "bg-blue-500",
    lightColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    title: "Data Science & AI",
    icon: <Database size={24} />,
    description: "Dve deep into data analytics, machine learning, and statistical modeling to drive business insights.",
    color: "bg-purple-500",
    lightColor: "bg-purple-50",
    textColor: "text-purple-600"
  },
  {
    title: "AI & Machine Learning",
    icon: <BrainCircuit size={24} />,
    description: "Build the future with generative AI, neural networks, and advanced automation techniques.",
    color: "bg-orange-500",
    lightColor: "bg-orange-50",
    textColor: "text-orange-600"
  }
];

export default function Programs() {
  return (
    <section id="programs" className="py-24 bg-gray-50">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-gray-900">Featured Programs</h2>
            <p className="text-gray-500 max-w-xl">
              Our curriculum is designed in collaboration with industry experts to ensure you're learning the most relevant skills.
            </p>
          </div>
          <button className="text-primary font-bold flex items-center space-x-2 group hover:underline underline-offset-4">
            <span>Explore All Programs</span>
            <ExternalLink size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl smooth-transition group"
            >
              <div className={`w-14 h-14 ${program.lightColor} ${program.textColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 smooth-transition`}>
                {program.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{program.title}</h3>
              <p className="text-gray-500 mb-8 leading-relaxed">
                {program.description}
              </p>
              <button className="w-full py-4 rounded-xl font-bold border border-gray-100 group-hover:bg-primary group-hover:text-white group-hover:border-primary smooth-transition">
                Download Brochure
              </button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
