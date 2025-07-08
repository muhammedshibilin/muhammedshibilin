'use client';

import { Project } from '@/types/project.interface';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
    >
      <div className="h-48 overflow-hidden relative">
        {project.imageUrl && (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        {project.projectUrl && (
          <motion.a
            href={project.projectUrl}
            className="mt-auto text-primary font-medium hover:underline inline-block"
            whileHover={{ x: 5 }}
          >
            View Project →
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};