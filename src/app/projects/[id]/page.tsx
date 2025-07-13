'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, textVariant, zoomIn } from '@/app/utils/motion';
import { Project } from '@/types/project.interface';
import Image from 'next/image';

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const data = await res.json();
        setProject(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!project) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-center min-h-screen"
      >
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Project not found</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer(0.1, 0.2)}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      {/* Project Header */}
      <motion.div variants={textVariant(0.1)} className="mb-12 text-center">
        <motion.div variants={zoomIn(0.2, 0.5)} className="inline-block mb-4">
          <span className="inline-block px-4 py-2 text-sm font-medium bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-200 rounded-full">
            {project.role?.join(' • ') || 'Project Showcase'}
          </span>
        </motion.div>
        <motion.h1 
          variants={textVariant(0.2)}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
        >
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            {project.title}
          </span>
        </motion.h1>
        <motion.p 
          variants={fadeIn('up', 'spring', 0.3, 0.5)}
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          {project.description}
        </motion.p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Image Section (Left Side) */}
        {project.imageUrl && (
          <motion.div 
            variants={fadeIn('right', 'spring', 0.4, 0.5)}
            className="lg:w-1/2"
          >
            <div className="sticky top-24">
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 hover:shadow-purple-500/20 transition-shadow duration-300">
                <div className="aspect-video relative">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    quality={100}
                    priority
                  />
                </div>
              </div>
              
              {/* Quick Links (Mobile) */}
              <motion.div 
                variants={fadeIn('up', 'spring', 0.8, 0.5)}
                className="mt-6 flex gap-4 lg:hidden"
              >
                {project.liveUrl && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.liveUrl}
                    target="_blank"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all flex items-center gap-2 flex-1 justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Live Demo
                  </motion.a>
                )}
                {project.githubUrl && (
                  <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    href={project.githubUrl}
                    target="_blank"
                    className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2 flex-1 justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </motion.a>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Details Section (Right Side) */}
        <motion.div 
          variants={fadeIn('left', 'spring', 0.5, 0.5)}
          className="lg:w-1/2"
        >
          {/* Detailed Description */}
          {project.detailedDescription && (
            <motion.div variants={fadeIn('up', 'spring', 0.6, 0.5)} className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Project Overview</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {project.detailedDescription}
              </p>
            </motion.div>
          )}

          {/* Tech Stack */}
          <motion.div variants={fadeIn('up', 'spring', 0.7, 0.5)} className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <motion.span 
                  key={tech}
                  variants={fadeIn('up', 'spring', index * 0.1 + 0.7, 0.5)}
                  whileHover={{ scale: 1.05, y: -3 }}
                  className="px-4 py-2 text-sm bg-gradient-to-br from-purple-100 to-pink-100 dark:from-gray-700 dark:to-gray-800 text-purple-600 dark:text-purple-300 rounded-lg shadow-sm hover:shadow-md transition-all"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Project Highlights */}
          <motion.div variants={staggerContainer(0.1, 0.2)} className="space-y-10">
            {project.features?.length > 0 && (
              <motion.div variants={fadeIn('up', 'spring', 0.8, 0.5)}>
                <h2 className="text-2xl font-semibold text-purple-500 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Key Features
                </h2>
                <ul className="space-y-4">
                  {project.features.map((feature, idx) => (
                    <motion.li 
                      key={idx}
                      variants={fadeIn('up', 'spring', idx * 0.1 + 0.8, 0.5)}
                      className="flex items-start bg-gray-50 dark:bg-gray-800 p-4 rounded-xl"
                    >
                      <span className="text-purple-500 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}

            {project.challenges && (
              <motion.div variants={fadeIn('up', 'spring', 0.9, 0.5)}>
                <h2 className="text-2xl font-semibold text-pink-500 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Challenges Faced
                </h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.challenges}
                  </p>
                </div>
              </motion.div>
            )}

            {project.solutions && (
              <motion.div variants={fadeIn('up', 'spring', 1.0, 0.5)}>
                <h2 className="text-2xl font-semibold text-green-500 mb-4 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Innovative Solutions
                </h2>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Action Buttons (Desktop) */}
          <motion.div 
            variants={fadeIn('up', 'spring', 1.1, 0.5)}
            className="mt-16 hidden lg:flex gap-4"
          >
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={project.liveUrl}
                target="_blank"
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                View Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={project.githubUrl}
                target="_blank"
                className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View GitHub
              </motion.a>
            )}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}