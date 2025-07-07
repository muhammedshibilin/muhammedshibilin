'use client';

import { ProjectCard } from "@/components/ui/projectCard";
import { motion, Variants } from "framer-motion";
import { useState } from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  projectUrl: string;
  category: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-featured online store with payment integration and admin dashboard",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/project1.jpg",
    projectUrl: "#",
    category: "web"
  },
  // ... rest of your projects
];

const categories = ["all", "web", "mobile"];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.42, 0, 0.58, 1]
    }
  }
};

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1]
    }
  }
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <motion.section 
      className="container mx-auto px-6 py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={sectionVariants}
      id="projects"
    >
      <div className="text-center mb-16">
        <motion.h2 
          className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-500 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Here are some of my selected works. Each project represents unique challenges and solutions.
        </motion.p>
      </div>

      <motion.div 
        className="flex justify-center gap-4 mb-16 flex-wrap"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            type="button"
            className={`px-6 py-2 rounded-full capitalize transition-all duration-300 ${
              activeCategory === category
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "border border-gray-300 hover:border-primary hover:text-primary"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveCategory(category)}
            aria-label={`Filter ${category} projects`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {filteredProjects.length > 0 ? (
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.map((project) => (
            <motion.div key={`project-${project.id}`} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div 
          className="text-center py-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h3 className="text-2xl font-medium text-gray-500">No projects found in this category</h3>
        </motion.div>
      )}

      <motion.div 
        className="text-center mt-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <button 
          type="button"
          className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          View All Projects
        </button>
      </motion.div>
    </motion.section>
  );
}