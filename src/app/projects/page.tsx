'use client';

import { ProjectCard } from '@/components/ui/projectCard';
import { Project } from '@/types/project.interface';
import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

const projects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description: "Full-featured online store solution",
    detailedDescription: "Developed a complete e-commerce solution with product listings, cart functionality, user authentication, and Stripe payment integration. The platform features an admin dashboard for inventory management and supports high traffic loads with Redis caching.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "Redis"],
    features: [
      "Responsive product catalog with filters",
      "Persistent shopping cart",
      "JWT-based authentication",
      "Stripe payment processing",
      "Admin dashboard for inventory management",
      "Redis caching for performance"
    ],
    challenges: "Handling real-time inventory updates during flash sales while maintaining performance under high traffic loads.",
    solutions: "Implemented Redis caching for product data and used optimistic UI updates to prevent cart conflicts during high traffic periods.",
    images: [
      "/projects/ecommerce-1.jpg",
      "/projects/ecommerce-2.jpg",
      "/projects/ecommerce-3.jpg"
    ],
    liveUrl: "https://ecommerce-demo.example.com",
    githubUrl: "https://github.com/yourusername/ecommerce-platform",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    imageUrl: "/projects/ecommerce-thumbnail.jpg",
    projectUrl: "/projects/1",
    category: "web"
  },
  {
    id: "2",
    title: "Social Media Analytics Dashboard",
    description: "Multi-platform social media metrics visualization",
    detailedDescription: "Built a comprehensive dashboard that aggregates metrics from Twitter, Instagram, and Facebook APIs. The platform provides customizable reports, real-time data visualization, and team collaboration features with granular permission controls.",
    technologies: ["TypeScript", "Next.js", "Chart.js", "Firebase", "Tailwind CSS"],
    features: [
      "Cross-platform data integration",
      "Custom report generation",
      "Real-time data updates",
      "Team collaboration tools",
      "Data export (CSV, PDF)",
      "Dark/light mode"
    ],
    challenges: "Synchronizing data from different APIs with varying rate limits and response formats while maintaining UI responsiveness.",
    solutions: "Developed a unified data normalization layer and implemented a queue-based API request system to handle rate limits efficiently.",
    images: [
      "/projects/dashboard-1.jpg",
      "/projects/dashboard-2.jpg",
      "/projects/dashboard-3.jpg"
    ],
    liveUrl: "https://social-dashboard.example.com",
    githubUrl: "https://github.com/yourusername/social-dashboard",
    tags: ["TypeScript", "Next.js", "Chart.js"],
    imageUrl: "/projects/dashboard-thumbnail.jpg",
    projectUrl: "/projects/2",
    category: "web"
  },
  {
    id: "3",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform fitness tracking application",
    detailedDescription: "Developed a React Native application that tracks workouts, nutrition, and progress with Apple Health/Google Fit integration. Includes social features for sharing achievements and competing with friends.",
    technologies: ["React Native", "Expo", "Firebase", "GraphQL", "Apple Health Kit"],
    features: [
      "Workout logging with exercise database",
      "Nutrition tracking with barcode scanning",
      "Health data synchronization",
      "Social challenges and leaderboards",
      "Custom workout plans",
      "Progress analytics"
    ],
    challenges: "Implementing consistent behavior across iOS and Android while integrating with platform-specific health APIs.",
    solutions: "Used React Native's platform-specific modules and created abstraction layers for health data access.",
    images: [
      "/projects/fitness-1.jpg",
      "/projects/fitness-2.jpg"
    ],
    liveUrl: "https://apps.apple.com/fitness-tracker",
    githubUrl: "https://github.com/yourusername/fitness-tracker",
    tags: ["React Native", "Firebase", "GraphQL"],
    imageUrl: "/projects/fitness-thumbnail.jpg",
    projectUrl: "/projects/3",
    category: "mobile"
  }
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