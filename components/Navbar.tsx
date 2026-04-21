"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "@/components/Container";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Why Accredian", href: "#stats" },
  { name: "Programs", href: "#programs" },
  { name: "Domain Expertise", href: "#domain-expertise" },
  { name: "Enterprise", href: "#partners" },
  { name: "FAQ", href: "#faq" },
];

const getInitial = (name: string) => name.charAt(0).toUpperCase();
const avatarColors = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];
const getAvatarColor = (name: string) => {
  const index = name.length % avatarColors.length;
  return avatarColors[index];
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("#home");
  const pathname = usePathname();

  const syncAuthState = () => {
    const token = localStorage.getItem("authToken");
    const userRaw = localStorage.getItem("authUser");
    const expiresAtRaw = localStorage.getItem("authExpiresAt");
    const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : 0;

    if (!token || !userRaw || !expiresAt || Number.isNaN(expiresAt) || Date.now() > expiresAt) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      localStorage.removeItem("authExpiresAt");
      setUserName(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(userRaw) as { name?: string };
      setUserName(parsedUser?.name || "Account");
    } catch {
      setUserName("Account");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    localStorage.removeItem("authExpiresAt");
    setUserName(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const updateActiveSection = () => {
      const sectionOffset = 120;

      for (let i = navLinks.length - 1; i >= 0; i -= 1) {
        const sectionId = navLinks[i].href.slice(1);
        const section = document.getElementById(sectionId);

        if (!section) {
          continue;
        }

        const sectionTop = section.offsetTop;
        if (window.scrollY + sectionOffset >= sectionTop) {
          setActiveSection(navLinks[i].href);
          return;
        }
      }

      setActiveSection("#home");
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      updateActiveSection();
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    syncAuthState();
  }, [pathname]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      setActiveSection(window.location.hash);
    }
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
      }`}
    >
      <Container className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">Accredian</span>
          <span className="text-xs bg-primary-700 text-white px-2 py-0.5 rounded italic">Enterprise</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-medium smooth-transition border-b-2 pb-1 ${
                activeSection === link.href
                  ? "text-primary border-primary"
                  : "text-gray-700 border-transparent hover:text-primary"
              }`}
              onClick={() => setActiveSection(link.href)}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {userName ? (
            <div className="flex items-center space-x-3 bg-gray-50 pl-1 pr-2 py-1 rounded-full border border-gray-100 shadow-sm">
              <div
                className={`w-9 h-9 rounded-full ${getAvatarColor(
                  userName
                )} flex items-center justify-center text-white font-bold shadow-md`}
              >
                {getInitial(userName)}
              </div>
              <span className="font-bold bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                {userName}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-red-500 hover:bg-white rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-primary font-medium smooth-transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-primary hover:bg-primary-600 text-white px-5 py-2.5 rounded-full font-semibold smooth-transition shadow-md active:scale-95"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-medium ${
                    activeSection === link.href ? "text-primary underline underline-offset-4" : "text-gray-700 hover:text-primary"
                  }`}
                  onClick={() => {
                    setActiveSection(link.href);
                    setIsOpen(false);
                  }}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col space-y-3">
                {userName ? (
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <div
                        className={`w-12 h-12 rounded-full ${getAvatarColor(
                          userName
                        )} flex items-center justify-center text-white text-xl font-bold shadow-md`}
                      >
                        {getInitial(userName)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 font-medium">Logged in as</span>
                        <span className="font-bold text-lg bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                          {userName}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="flex items-center justify-center w-full py-4 rounded-2xl bg-red-50 text-red-600 font-bold transition-all active:scale-95 shadow-sm border border-red-100"
                      onClick={handleLogout}
                      title="Logout"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-center text-gray-700 font-medium border border-gray-200 py-3 rounded-xl"
                      onClick={() => setIsOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="bg-primary text-white text-center font-bold py-3 rounded-xl shadow-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
