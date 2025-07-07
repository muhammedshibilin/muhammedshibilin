'use client';

import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  category: string;
}

export const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div 
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ y: -5 }}
    >
      <div className="h-48 overflow-hidden">
        <motion.img 
          src={project.imageUrl} 
          alt={project.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
              {tag}
            </span>
          ))}
        </div>
        <motion.a
          href={project.projectUrl}
          className="mt-auto text-primary font-medium hover:underline inline-block"
          whileHover={{ x: 5 }}
        >
          View Project →
        </motion.a>
      </div>
    </motion.div>
  );
};