'use client';

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Animation values for parallax and scroll effects
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  // State for interactive elements
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Project data
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "A full-featured online store with cart functionality and payment processing.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "/project-1.jpg"
    },
    {
      id: 2,
      title: "Social Media Dashboard",
      description: "Analytics dashboard for tracking social media metrics and engagement.",
      tags: ["Next.js", "Tailwind", "Chart.js", "Firebase"],
      image: "/project-2.jpg"
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "Web app that generates marketing content using OpenAI's API.",
      tags: ["TypeScript", "Next.js", "OpenAI", "Prisma"],
      image: "/project-3.jpg"
    },
    {
      id: 4,
      title: "Fitness Tracker",
      description: "Mobile-first application for tracking workouts and nutrition.",
      tags: ["React Native", "GraphQL", "Expo", "PostgreSQL"],
      image: "/project-4.jpg"
    },
    {
      id: 5,
      title: "Real Estate Portal",
      description: "Property listing platform with advanced search and filtering.",
      tags: ["Vue.js", "Nuxt", "Mapbox", "Express"],
      image: "/project-5.jpg"
    },
    {
      id: 6,
      title: "Design System",
      description: "Component library and design system for consistent UI development.",
      tags: ["Storybook", "Styled Components", "Figma", "Jest"],
      image: "/project-6.jpg"
    }
  ];

  return (
    <>
      <Head>
        <title>Muhammed Shibili N | Portfolio</title>
        <meta name="description" content="Professional portfolio showcasing my work" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Floating Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <a href="#home" className="text-white font-bold text-xl flex items-center">
                <span className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg mr-2">MS</span>
                <span>Muhammed Shibili</span>
              </a>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {['home', 'work', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeSection === item ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                    {activeSection === item && (
                      <motion.span
                        layoutId="navIndicator"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-600"
                        transition={{ type: 'spring', bounce: 0.25, duration: 0.6 }}
                      />
                    )}
                  </a>
                ))}
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="/resume.pdf"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-md text-white font-medium text-sm"
                  download
                >
                  Download CV
                </motion.a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!menuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['home', 'work', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === item ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
                <a
                  href="/resume.pdf"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600"
                  download
                >
                  Download CV
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="min-h-screen overflow-x-hidden pt-16"
      >
        {/* Hero Section */}
        <motion.section 
          id="home"
          style={{ opacity, scale, y }}
          className="h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 relative z-10"
        >
          {/* Animated background elements */}
          <motion.div 
            className="absolute inset-0 overflow-hidden z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-pink-600/20"
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  width: Math.random() * 300 + 100,
                  height: Math.random() * 300 + 100,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 1000 - 500,
                  y: Math.random() * 1000 - 500,
                  opacity: 0.3
                }}
                transition={{
                  duration: Math.random() * 20 + 10,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            ))}
          </motion.div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <motion.h1 
                style={{ y: textY }}
                className="text-5xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-4"
              >
                Hi, I&apos;m <motion.span className="text-white">Muhammed Shibili</motion.span>
              </motion.h1>
              <motion.h2 
                style={{ y: textY }}
                className="text-2xl sm:text-3xl text-gray-300 mb-8"
              >
                I build <motion.span className="text-purple-400">digital experiences</motion.span>
              </motion.h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 justify-center flex-wrap"
            >
              <motion.a 
                href="#work" 
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </motion.a>
              <motion.a 
                href="#contact" 
                className="px-6 py-3 border border-gray-600 rounded-lg text-white font-medium hover:bg-gray-800 transition group relative overflow-hidden"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Contact Me</span>
                <span className="absolute inset-0 bg-gray-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.a>
            </motion.div>

            {/* Tech stack floating icons */}
            <motion.div 
              className="mt-16 flex flex-wrap justify-center gap-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              {['react', 'nextjs', 'typescript', 'nodejs', 'tailwind', 'graphql'].map((tech, i) => (
                <motion.div
                key={tech}
                className="w-12 h-12 bg-gray-800 rounded-lg flex items-center justify-center shadow-lg text-white text-xs font-medium"
                whileHover={{ 
                  y: -5, 
                  scale: 1.1 
                }}
                initial={{ 
                  y: 20, 
                  opacity: 0 
                }}
                animate={{ 
                  y: 0, 
                  opacity: 1 
                }}
                transition={{ 
                  delay: 0.6 + i * 0.1, 
                  duration: 0.5,
                  type: 'spring',
                  stiffness: 400,
                  damping: 10
                }}
              >
                  <Image 
                    src={`/tech/${tech}.svg`} 
                    alt={tech} 
                    width={32} 
                    height={32} 
                    className="object-contain"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="absolute bottom-8"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
              <p className="text-xs text-gray-500 mt-2">Scroll Down</p>
            </motion.div>
          </motion.div>
        </motion.section>

        {/* Work Section */}
        <section id="work" className="py-20 px-4 sm:px-8 max-w-7xl mx-auto relative">
          {/* Decorative elements */}
          <motion.div 
            className="absolute -left-20 top-1/3 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />
          <motion.div 
            className="absolute -right-20 bottom-1/4 w-60 h-60 bg-pink-600/10 rounded-full blur-3xl -z-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center"
          >
            Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Work</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-gray-400 text-center max-w-3xl mx-auto mb-12"
          >
            Here are some of my selected projects. Each one was crafted with attention to detail and a focus on delivering the best user experience.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 relative group"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="h-48 bg-gradient-to-r from-purple-500 to-pink-600 relative overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <motion.div
                      initial={{ y: 20 }}
                      animate={{ y: hoveredProject === project.id ? 0 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="text-white"
                    >
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.description}</p>
                    </motion.div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-gray-300 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <motion.span 
                        key={i}
                        className="text-xs bg-gray-700 text-gray-300 px-3 py-1 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                  <motion.a 
                    href="#" 
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium inline-flex items-center group"
                    whileHover={{ x: 5 }}
                  >
                    View Project
                    <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.a
              href="#"
              className="inline-flex items-center px-6 py-3 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-800 transition group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View All Projects
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-8 bg-gray-900/50 relative overflow-hidden">
          {/* Animated background */}
          <motion.div 
            className="absolute inset-0 -z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <motion.div 
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <motion.h2 
                className="text-3xl sm:text-4xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Me</span>
              </motion.h2>
              <motion.p 
                className="text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                I&apos;m a full-stack developer with 5+ years of experience building web applications. 
                I specialize in modern JavaScript frameworks and have a passion for creating 
                intuitive, performant, and accessible digital experiences.
              </motion.p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Skills & Expertise</h3>
                <div className="space-y-6">
                  {[
                    { name: 'Frontend Development', level: 95, color: 'from-purple-500 to-pink-600' },
                    { name: 'Backend Development', level: 85, color: 'from-blue-500 to-cyan-600' },
                    { name: 'UI/UX Design', level: 80, color: 'from-green-500 to-emerald-600' },
                    { name: 'DevOps & Cloud', level: 75, color: 'from-yellow-500 to-amber-600' },
                    { name: 'Mobile Development', level: 70, color: 'from-red-500 to-orange-600' },
                  ].map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5">
                        <motion.div 
                          className={`h-2.5 rounded-full bg-gradient-to-r ${skill.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Experience & Education</h3>
                <div className="space-y-6">
                  {[
                    { 
                      title: 'Senior Full Stack Developer', 
                      company: 'Tech Innovations Inc.', 
                      period: '2021 - Present', 
                      description: 'Leading a team to build scalable web applications using React, Node.js, and AWS.' 
                    },
                    { 
                      title: 'Frontend Developer', 
                      company: 'Digital Solutions LLC', 
                      period: '2019 - 2021', 
                      description: 'Developed responsive user interfaces and collaborated with designers to implement UI/UX best practices.' 
                    },
                    { 
                      title: 'B.Sc. Computer Science', 
                      company: 'University of Technology', 
                      period: '2015 - 2019', 
                      description: 'Graduated with honors. Specialized in web technologies and software engineering.' 
                    },
                  ].map((exp, index) => (
                    <motion.div 
                      key={index} 
                      className="border-l-2 border-purple-500 pl-5 relative pb-6"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute -left-2.5 top-0 w-4 h-4 bg-purple-500 rounded-full" />
                      <h4 className="text-lg font-medium text-white">{exp.title}</h4>
                      <p className="text-gray-400 text-sm">{exp.company} • {exp.period}</p>
                      <p className="text-gray-300 mt-2 text-sm">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Fun facts */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <h3 className="text-xl font-bold text-white mb-6 text-center">Fun Facts</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: '5+', label: 'Years Experience' },
                  { number: '50+', label: 'Projects Completed' },
                  { number: '∞', label: 'Cups of Coffee' },
                  { number: '100%', label: 'Satisfaction' },
                ].map((fact, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800 rounded-xl p-6 text-center border border-gray-700 hover:border-purple-500 transition-colors"
                    whileHover={{ y: -5 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
                      {fact.number}
                    </p>
                    <p className="text-gray-300 text-sm">{fact.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 sm:px-8 max-w-4xl mx-auto relative">
          {/* Floating elements */}
          <motion.div 
            className="absolute -left-20 top-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -z-10"
            animate={{ 
              x: [0, 20, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-bold text-white mb-4 text-center"
            >
              Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Touch</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
            >
              Have a project in mind or want to discuss potential opportunities? Feel free to reach out!
            </motion.p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <form className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition"
                      placeholder="Your name"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition"
                      placeholder="your.email@example.com"
                    />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                    <textarea 
                      id="message" 
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white transition"
                      placeholder="Your message here..."
                    ></textarea>
                  </motion.div>
                  
                  <motion.button
                    type="submit" 
                    className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition w-full md:w-auto relative overflow-hidden group"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    viewport={{ once: true }}
                  >
                    <span className="relative z-10">Send Message</span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  </motion.button>
                </form>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Email Me</h4>
                      <a href="mailto:contact@example.com" className="text-gray-300 hover:text-purple-400 transition">contact@example.com</a>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-pink-600/10 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Call Me</h4>
                      <a href="tel:+1234567890" className="text-gray-300 hover:text-purple-400 transition">+1 (234) 567-890</a>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-lg">
                      <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-medium text-white mb-1">Location</h4>
                      <p className="text-gray-300">San Francisco, CA</p>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  viewport={{ once: true }}
                  className="flex gap-4 justify-center md:justify-start"
                >
                  {[
                    { name: 'Twitter', icon: 'twitter', color: 'sky-500' },
                    { name: 'GitHub', icon: 'github', color: 'gray-300' },
                    { name: 'LinkedIn', icon: 'linkedin', color: 'blue-600' },
                    { name: 'Dribbble', icon: 'dribbble', color: 'pink-500' },
                  ].map((social, i) => (
                    <motion.a
                      key={i}
                      href="#"
                      className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-${social.color} hover:bg-gray-600 transition-colors`}
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <span className="sr-only">{social.name}</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        {social.icon === 'twitter' && (
                          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        )}
                        {social.icon === 'github' && (
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        )}
                        {social.icon === 'linkedin' && (
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        )}
                        {social.icon === 'dribbble' && (
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.747 7.97a9.979 9.979 0 01-2.872 6.773 25.098 25.098 0 00-3.227-1.199 30.416 30.416 0 01-1.316-3.507 9.973 9.973 0 017.415-1.067zM12 2.18c2.67 0 5.123.963 7.021 2.561a35.26 35.26 0 01-2.295 4.957 33.02 33.02 0 00-8.652-1.397 9.973 9.973 0 014.926-6.121zM7.389 3.141A9.978 9.978 0 012.18 12c0 .621.072 1.225.2 1.807a33.148 33.148 0 016.307-1.537 31.897 31.897 0 01-1.298-9.129zM12 21.82c-2.67 0-5.123-.963-7.021-2.561a35.26 35.26 0 012.295-4.957 33.02 33.02 0 008.652 1.397 9.973 9.973 0 01-4.926 6.121zM5.2 13.807A9.978 9.978 0 012.18 12c0-.621.072-1.225.2-1.807a33.148 33.148 0 006.307 1.537 31.897 31.897 0 011.298 9.129 9.974 9.974 0 01-4.585-5.852zm7.415 5.852a30.416 30.416 0 011.316-3.507 25.098 25.098 0 003.227 1.199 9.979 9.979 0 012.872 6.773 9.974 9.974 0 01-7.415-1.465zm6.582-1.465a9.979 9.979 0 01-2.872-6.773 25.098 25.098 0 003.227-1.199 9.974 9.974 0 01-.355 7.972z" />
                        )}
                      </svg>
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-8 border-t border-gray-800 bg-gray-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-6 md:mb-0"
              >
                <a href="#home" className="text-white font-bold text-xl flex items-center">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg mr-2">MS</span>
                  <span>Muhammed Shibili</span>
                </a>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="flex space-x-6 mb-6 md:mb-0"
              >
                {['home', 'work', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex space-x-6"
              >
                {['twitter', 'github', 'linkedin', 'dribbble'].map((social, i) => (
                  <a
                    key={i}
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'twitter' && (
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      )}
                      {social === 'github' && (
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      )}
                      {social === 'linkedin' && (
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      )}
                      {social === 'dribbble' && (
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm9.747 7.97a9.979 9.979 0 01-2.872 6.773 25.098 25.098 0 00-3.227-1.199 30.416 30.416 0 01-1.316-3.507 9.973 9.973 0 017.415-1.067zM12 2.18c2.67 0 5.123.963 7.021 2.561a35.26 35.26 0 01-2.295 4.957 33.02 33.02 0 00-8.652-1.397 9.973 9.973 0 014.926-6.121zM7.389 3.141A9.978 9.978 0 012.18 12c0 .621.072 1.225.2 1.807a33.148 33.148 0 016.307-1.537 31.897 31.897 0 01-1.298-9.129zM12 21.82c-2.67 0-5.123-.963-7.021-2.561a35.26 35.26 0 012.295-4.957 33.02 33.02 0 008.652 1.397 9.973 9.973 0 01-4.926 6.121zM5.2 13.807A9.978 9.978 0 012.18 12c0-.621.072-1.225.2-1.807a33.148 33.148 0 016.307 1.537 31.897 31.897 0 011.298 9.129 9.974 9.974 0 01-4.585-5.852zm7.415 5.852a30.416 30.416 0 011.316-3.507 25.098 25.098 0 003.227 1.199 9.979 9.979 0 012.872 6.773 9.974 9.974 0 01-7.415-1.465zm6.582-1.465a9.979 9.979 0 01-2.872-6.773 25.098 25.098 0 003.227-1.199 9.974 9.974 0 01-.355 7.972z" />
                      )}
                    </svg>
                  </a>
                ))}
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm"
            >
              <p>© {new Date().getFullYear()} Muhammed Shibili N. All rights reserved.</p>
              <p className="mt-2">Made with ❤️ and Next.js</p>
            </motion.div>
          </div>
        </footer>
      </div>
      <Analytics />
    </>
  );
}