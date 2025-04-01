'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] rounded-2xl overflow-hidden"
          >
            <Image
              src="/about-image.jpg"
              alt="About Me"
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl font-bold">About Me</h2>
            <p className="text-gray-600 dark:text-gray-400">
              I'm a passionate Full Stack Developer with over 5 years of experience in creating web applications. 
              My journey in tech started with a curiosity about how websites work, and it has evolved into a 
              career focused on building efficient, scalable, and user-friendly applications.
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              I specialize in modern web technologies and have a strong foundation in both frontend and backend development. 
              My approach combines technical expertise with creative problem-solving to deliver solutions that exceed expectations.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Quick Facts</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <li className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-gray-100">📍</span>
                  Based in New York, USA
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-gray-100">💼</span>
                  Available for Freelance
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-gray-100">🎓</span>
                  BS in Computer Science
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-900 dark:text-gray-100">🌐</span>
                  Remote-friendly
                </li>
              </ul>
            </div>

            <div className="flex gap-4 pt-4">
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
              >
                Download Resume
              </motion.a>
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-full hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 