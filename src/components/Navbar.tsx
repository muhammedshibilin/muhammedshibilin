'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              YourName
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#about" className="hover:text-gray-400 transition-colors">
              About
            </Link>
            <Link href="#skills" className="hover:text-gray-400 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="hover:text-gray-400 transition-colors">
              Projects
            </Link>
            <Link href="#testimonials" className="hover:text-gray-400 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="hover:text-gray-400 transition-colors">
              Contact
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-gray-400 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#about" className="block px-3 py-2 hover:text-gray-400 transition-colors">
              About
            </Link>
            <Link href="#skills" className="block px-3 py-2 hover:text-gray-400 transition-colors">
              Skills
            </Link>
            <Link href="#projects" className="block px-3 py-2 hover:text-gray-400 transition-colors">
              Projects
            </Link>
            <Link href="#testimonials" className="block px-3 py-2 hover:text-gray-400 transition-colors">
              Testimonials
            </Link>
            <Link href="#contact" className="block px-3 py-2 hover:text-gray-400 transition-colors">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 