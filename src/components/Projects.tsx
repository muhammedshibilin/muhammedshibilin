'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const projects = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with real-time inventory management.',
    image: '/project1.jpg',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    github: '#',
    type: 'main'
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management application with real-time updates.',
    image: '/project2.jpg',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
    link: '#',
    github: '#',
    type: 'main'
  },
  {
    title: 'Weather Dashboard',
    description: 'A weather dashboard with location-based forecasts.',
    image: '/project3.jpg',
    tags: ['React', 'API Integration'],
    link: '#',
    github: '#',
    type: 'mini'
  },
  // Add more projects as needed
];

const filterOptions = ['All', 'Main', 'Mini'];

export default function Projects() {
  const [filter, setFilter] = useState('All');

  const filteredProjects = projects.filter(project => 
    filter === 'All' || project.type.toLowerCase() === filter.toLowerCase()
  );

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            A showcase of my recent work, including both main projects and mini experiments.
          </p>

          <div className="flex justify-center gap-4 mb-12">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  filter === option
                    ? 'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900'
                    : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode='wait'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      View Project →
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      GitHub →
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
} 