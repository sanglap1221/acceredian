import Link from "next/link";
import { Globe, Mail, Phone } from "lucide-react";
import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">Accredian</span>
              <span className="text-xs bg-primary text-white px-2 py-0.5 rounded italic">Enterprise</span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Transforming the future of work through elite executive education and corporate training solutions.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Globe size={20} />} />
              <SocialLink icon={<Globe size={20} />} />
              <SocialLink icon={<Globe size={20} />} />
              <SocialLink icon={<Globe size={20} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><FooterLink href="#programs">Our Programs</FooterLink></li>
              <li><FooterLink href="#stats">Why Accredian</FooterLink></li>
              <li><FooterLink href="#partners">Partners</FooterLink></li>
              <li><FooterLink href="#faq">FAQs</FooterLink></li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-6">Expertise</h4>
            <ul className="space-y-4 text-sm">
              <li><FooterLink href="#">Data Science</FooterLink></li>
              <li><FooterLink href="#">Full Stack Dev</FooterLink></li>
              <li><FooterLink href="#">AI & Machine Learning</FooterLink></li>
              <li><FooterLink href="#">Product Management</FooterLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-gray-400">
                <Mail size={18} className="text-primary mt-0.5" />
                <span>sanglapghosh51@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-gray-400">
                <Phone size={18} className="text-primary mt-0.5" />
                <span>+91 98834 83390</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <p>© 2026 Accredian. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="#" className="hover:text-white smooth-transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-white smooth-transition">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

function SocialLink({ icon }: { icon: React.ReactNode }) {
  return (
    <a
      href="#"
      className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center hover:bg-primary hover:text-white border border-gray-800 smooth-transition"
    >
      {icon}
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="hover:text-primary smooth-transition inline-block">
      {children}
    </Link>
  );
}
