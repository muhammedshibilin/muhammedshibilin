'use client';

import { motion } from 'framer-motion';

export default function Resume() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl sm:text-4xl font-bold">My Resume</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Download my resume to learn more about my experience, skills, and qualifications.
          </p>
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200 transition-colors"
          >
            Download Resume
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 