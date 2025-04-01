'use client';

import { motion } from 'framer-motion';

const skills = [
  {
    category: 'Frontend',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3']
  },
  {
    category: 'Backend',
    technologies: ['Node.js', 'Express', 'Python', 'Django', 'PostgreSQL', 'MongoDB']
  },
  {
    category: 'Tools & Others',
    technologies: ['Git', 'Docker', 'AWS', 'Firebase', 'REST APIs', 'GraphQL']
  }
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            I work with a variety of technologies across the full stack to create powerful and efficient solutions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skillSet, index) => (
            <motion.div
              key={skillSet.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 dark:bg-gray-900 p-6 rounded-2xl"
            >
              <h3 className="text-xl font-semibold mb-4">{skillSet.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skillSet.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-800 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 