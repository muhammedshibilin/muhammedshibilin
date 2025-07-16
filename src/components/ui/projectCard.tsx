'use client';

import { Project } from '@/types/project.interface';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FiGithub, FiExternalLink, FiStar, FiAward } from 'react-icons/fi';
import { Tooltip } from './tooltip';
import Link from 'next/link';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const getTechColor = (tech: string) => {
  const techColors: { [key: string]: string } = {
    'React': 'bg-blue-100 text-blue-800 border-blue-200',
    'Next.js': 'bg-gray-100 text-gray-800 border-gray-200',
    'TypeScript': 'bg-blue-100 text-blue-800 border-blue-200',
    'JavaScript': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Node.js': 'bg-green-100 text-green-800 border-green-200',
    'Python': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'Vue.js': 'bg-emerald-100 text-emerald-800 border-emerald-200',
    'Angular': 'bg-red-100 text-red-800 border-red-200',
    'Tailwind': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'MongoDB': 'bg-green-100 text-green-800 border-green-200',
    'PostgreSQL': 'bg-blue-100 text-blue-800 border-blue-200',
    'AWS': 'bg-orange-100 text-orange-800 border-orange-200',
    'Docker': 'bg-blue-100 text-blue-800 border-blue-200',
    'Figma': 'bg-purple-100 text-purple-800 border-purple-200',
  };

  const techName = tech.toLowerCase();
  for (const [key, value] of Object.entries(techColors)) {
    if (techName.includes(key.toLowerCase())) {
      return value;
    }
  }

  const defaultColors = [
    'bg-indigo-100 text-indigo-800 border-indigo-200',
    'bg-purple-100 text-purple-800 border-purple-200',
    'bg-pink-100 text-pink-800 border-pink-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-violet-100 text-violet-800 border-violet-200',
  ];

  return defaultColors[tech.length % defaultColors.length];
};

const getRoleColor = (role: string) => {
  const roleColors: { [key: string]: string } = {
    'Frontend': 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
    'Backend': 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
    'Full Stack': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white',
    'UI/UX': 'bg-gradient-to-r from-orange-500 to-red-500 text-white',
    'DevOps': 'bg-gradient-to-r from-gray-600 to-gray-800 text-white',
    'Mobile': 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white',
    'Designer': 'bg-gradient-to-r from-pink-500 to-rose-500 text-white',
  };

  const roleName = role.toLowerCase();
  for (const [key, value] of Object.entries(roleColors)) {
    if (roleName.includes(key.toLowerCase())) {
      return value;
    }
  }

  return 'bg-gradient-to-r from-slate-500 to-slate-600 text-white';
};

export const ProjectCard = ({ project, className = '' }: ProjectCardProps) => {
  return (
    <motion.article
      className={`bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full flex flex-col border border-gray-100 dark:border-gray-700 group backdrop-blur-sm ${className}`}
      whileHover={{
        y: -12,
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Image with enhanced overlay */}
      <div className="relative aspect-video overflow-hidden">
        {project.imageUrl ? (
          <>
              <Image
                src={project.imageUrl}
                alt={`Screenshot of ${project.title} project`}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-all duration-500" />

            {/* Floating action buttons */}
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub repository"
                >
                  <FiGithub size={16} />
                </motion.a>
              )}

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur-sm text-gray-800 p-2 rounded-full shadow-lg hover:bg-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Live project"
                >
                  <FiExternalLink size={16} />
                </motion.a>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center mb-2 mx-auto">
                <FiStar className="text-gray-500" size={24} />
              </div>
              <span className="text-gray-500 text-sm">No preview available</span>
            </div>
          </div>
        )}
      </div>

      {/* Enhanced content */}
      <div className="p-6 flex-1 flex flex-col space-y-4">
        {/* Title and Role with enhanced styling */}
        <div className="space-y-3">
          <h3
            id={`project-${project.id}-title`}
            className="text-xl font-bold text-gray-900 dark:text-white leading-tight"
          >
            {project.title}
          </h3>

          {project.role?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.role.map((role, index) => (
                <motion.div
                  key={role}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm ${getRoleColor(role)}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="flex items-center space-x-1">
                    <FiAward size={12} />
                    <span>{role}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Description with better typography */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Enhanced technologies section */}
        {project.technologies?.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Tech Stack
              </h4>
              <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent dark:from-gray-700"></div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 6).map((tech, index) => (
                <motion.div
                  key={tech}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-200 hover:shadow-md ${getTechColor(tech)}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {tech}
                </motion.div>
              ))}

              {project.technologies.length > 6 && (
                <Tooltip content={project.technologies.slice(6).join(', ')}>
                  <motion.div
                    className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600 cursor-help hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    +{project.technologies.length - 6} more
                  </motion.div>
                </Tooltip>
              )}
            </div>
          </div>
        )}

        {/* Enhanced footer */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {/* Quick tech preview */}
            <div className="flex items-center space-x-2">
              {project.technologies?.slice(0, 3).map((tech) => (
                <Tooltip key={tech} content={tech}>
                  <div className={`w-2 h-2 rounded-full ${getTechColor(tech).split(' ')[0].replace('bg-', 'bg-opacity-60 bg-')}`} />
                </Tooltip>
              ))}
              {project.technologies?.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>

            {/* Action links */}
            <div className="flex space-x-3">
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors p-1"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="GitHub repository"
                >
                  <FiGithub size={18} />
                </motion.a>
              )}

              {project.liveUrl && (
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-1"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Live project"
                >
                  <FiExternalLink size={18} />
                </motion.a>
              )}
            </div>
          </div>
        </div>
        {/* Footer */}
      <div className="mt-auto px-6 pb-6">
        <Link href={`/projects/${project.id}`}>
          <motion.button
            className="w-full mt-6 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Details</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            />
          </motion.button>
        </Link>
      </div>
      </div>
    </motion.article>
  );
};