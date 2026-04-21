"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Programs from "@/components/Programs";
import DomainExpertise from "@/components/DomainExpertise";
import Partners from "@/components/Partners";
import FAQ from "@/components/FAQ";
import EnquiryModal from "@/components/EnquiryModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Hero onEnquireClick={() => setIsModalOpen(true)} />
      <Stats />
      <Programs />
      <DomainExpertise />
      <Partners />
      <FAQ />
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
