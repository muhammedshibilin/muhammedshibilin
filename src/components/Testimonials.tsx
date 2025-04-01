'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const testimonials = [
  {
    content: "One of the most dedicated developers I've worked with. Their attention to detail and problem-solving skills are exceptional.",
    author: "Jane Smith",
    position: "Tech Lead at TechCorp",
    image: "/testimonial1.jpg"
  },
  {
    content: "Delivered our project on time and exceeded our expectations. Great communication throughout the process.",
    author: "John Doe",
    position: "CEO at StartupX",
    image: "/testimonial2.jpg"
  },
  {
    content: "A talented developer who brings both technical expertise and creative solutions to every project.",
    author: "Sarah Johnson",
    position: "Product Manager at InnovateCo",
    image: "/testimonial3.jpg"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Testimonials</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            What people say about working with me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{testimonial.author}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.position}</p>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 