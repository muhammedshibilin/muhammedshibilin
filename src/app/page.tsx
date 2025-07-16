

'use client';

import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { Project } from "@/types/project.interface";
import { ProjectCard } from "@/components/ui/projectCard";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useState<Project[]>([]);


  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('❌ Failed to load projects', err);
      }
    };

    fetchProjects();
  }, []);


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


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    interface FormData {
      name: string;
      email: string;
      message: string;
    }

    const formData: FormData = {
      name,
      email,
      message,
    };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwyVQhxbg9rahvgM3Usl6utCn9aYJKT0_9au4BwJqqae6VuBmijBWlhPcvEVWjxXMQTRA/exec", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }).toString(),
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };


  return (
    <>
      <Head>
        <title>Muhammed Shibili N | Portfolio</title>
        <meta name="Muhammed Shibili N" content="Professional portfolio showcasing my work" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 1.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-md"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0"
            >
              <a href="#home" className="text-gray-900 dark:text-white font-bold text-xl flex items-center">
                {/* <span className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg mr-2">MS</span>
          <span>Muhammed Shibili N</span> */}
              </a>
            </motion.div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                {['home', 'work', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`relative px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeSection === item
                      ? 'text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                      }`}
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
                  href="https://drive.google.com/uc?export=download&id=1MzJCqfstK7XxYqQOK2g5cRrICDwwd0Pl"
                  target="_blank"
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
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
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
              className="md:hidden overflow-hidden bg-white dark:bg-gray-800"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {['home', 'work', 'about', 'contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${activeSection === item
                      ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
                <a
                  href="https://drive.google.com/uc?export=download&id=1MzJCqfstK7XxYqQOK2g5cRrICDwwd0Pl"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600"
                  target="_blank"
                  rel="noopener noreferrer"
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
        className="min-h-screen overflow-x-hidden pt-16 bg-white dark:bg-black transition-colors"
      >
        {/* Hero Section */}
        {/* Hero Section */}
        <motion.section
          id="home"
          style={{ opacity, scale, y }}
          className="h-screen flex flex-col justify-center items-center text-center px-4 sm:px-8 relative z-10 overflow-hidden"
        >
          {/* Enhanced Animated background elements */}
          <motion.div
            className="absolute inset-0 overflow-hidden z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            {/* Floating gradient blobs */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full blur-xl"
                style={{
                  background: `radial-gradient(circle, 
            rgba(${Math.random() > 0.5 ? '156, 163, 175' : '192, 132, 252'}, ${Math.random() * 0.3 + 0.2}) 0%, 
            rgba(${Math.random() > 0.5 ? '107, 114, 128' : '217, 70, 239'}, ${Math.random() * 0.3 + 0.1}) 100%)`,
                  width: `${Math.random() * 400 + 100}px`,
                  height: `${Math.random() * 400 + 100}px`,
                }}
                initial={{
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50,
                  opacity: 0
                }}
                animate={{
                  x: Math.random() * 1200 - 600,
                  y: Math.random() * 1200 - 600,
                  opacity: [0, 0.4, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: Math.random() * 30 + 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            ))}

            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDB2NDBNMCAyMGg0MCIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==')]"></div>
            </div>
          </motion.div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              className="mb-8 px-4"
            >
              <motion.div
                className="mb-6 inline-block px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                <span className="text-sm sm:text-base text-purple-600 dark:text-purple-400 font-medium">
                  Hello, I&apos;m a Full Stack Developer
                </span>
              </motion.div>

              <motion.h1
                style={{ y: textY }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold mb-6"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">
                  I&apos;m&nbsp;
                </span>
                <motion.span
                  className="text-gray-900 dark:text-white"
                  animate={{
                    textShadow: [
                      '0 0 8px rgba(255,255,255,0)',
                      '0 0 8px rgba(255,255,255,0.3)',
                      '0 0 8px rgba(255,255,255,0)'
                    ]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                >
                  Muhammed Shibili N
                </motion.span>
              </motion.h1>

              <motion.h2
                style={{ y: textY }}
                className="text-2xl sm:text-3xl md:text-4xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
              >
                Crafting <span className="text-purple-600 dark:text-purple-400 font-semibold">immersive digital experiences</span> that users love
              </motion.h2>

              <motion.p
                className="text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                I specialize in building responsive, accessible, and performant web applications with modern technologies.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, type: 'spring' }}
              className="flex gap-4 justify-center flex-wrap mb-16"
            >
              <motion.a
                href="#work"
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg text-white font-medium hover:opacity-90 transition-all relative overflow-hidden group"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.4)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586L7.707 9.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
                  </svg>
                  View My Work
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.a>

              <motion.a
                href="#contact"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg text-gray-800 dark:text-white font-medium hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all group relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  Contact Me
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              </motion.a>
            </motion.div>

            {/* Tech stack floating icons with tooltips */}
            <motion.div
              className="mt-8 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
            >
              {[
                { name: 'React', icon: 'react' },
                { name: 'Next.js', icon: 'nextjs' },
                { name: 'TypeScript', icon: 'typescript' },
                { name: 'Node.js', icon: 'nodejs' },
                { name: 'Angular', icon: 'angular' },
                { name: 'Python', icon: 'python' },
                { name: 'JavaScript', icon: 'javascript' },
                { name: 'Tailwind CSS', icon: 'tailwind' },
                { name: 'GraphQL', icon: 'graphql' },
                { name: 'Docker', icon: 'docker' }
              ].map((tech, i) => (
                <motion.div
                  key={tech.name}
                  className="relative group"
                  whileHover={{ y: -8 }}
                  initial={{ y: 20, opacity: 0, scale: 0.8 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.6 + i * 0.1,
                    duration: 0.5,
                    type: 'spring',
                    stiffness: 400,
                    damping: 10
                  }}
                >
                  <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-purple-200/50 dark:hover:shadow-purple-500/20 transition-all">
                    <Image
                      src={`/tech/${tech.icon}.svg`}
                      alt={tech.name}
                      width={36}
                      height={36}
                      className="object-contain"
                    />
                  </div>
                  <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                    {tech.name}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

        
          </div>
        </motion.section>


        <section id="work" className="py-28 px-4 sm:px-8 max-w-7xl mx-auto relative overflow-hidden">
          {/* Enhanced Background Elements */}
          <motion.div
            className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            {/* Floating gradient blobs */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full blur-[80px] opacity-30 ${i % 2 === 0
                  ? 'bg-purple-500/30 dark:bg-purple-600/20'
                  : 'bg-pink-500/30 dark:bg-pink-600/20'
                  }`}
                style={{
                  width: `${100 + Math.random() * 300}px`,
                  height: `${100 + Math.random() * 300}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ scale: 0 }}
                whileInView={{
                  scale: 1,
                  x: [0, (Math.random() - 0.5) * 200],
                  y: [0, (Math.random() - 0.5) * 200]
                }}
                transition={{
                  duration: 20 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
                viewport={{ once: true }}
              />
            ))}
          </motion.div>

          {/* Section Heading */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.h2
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              whileInView={{
                textShadow: [
                  '0 0 0px rgba(0,0,0,0)',
                  '0 0 10px rgba(168, 85, 247, 0.3)',
                  '0 0 0px rgba(0,0,0,0)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            >
              Featured <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600">Projects</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
            >
              Each project represents a unique challenge solved with innovative solutions and cutting-edge technologies.
            </motion.p>

            {/* Animated divider */}
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mt-6 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100
                }}
                viewport={{ once: true, margin: '-50px' }}
                className="relative group"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 to-pink-600/20 blur-lg"></div>
                </div>

                <ProjectCard project={project} />

                {/* Tech stack tags */}
                <motion.div
                  className="absolute bottom-4 left-4 flex flex-wrap gap-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  viewport={{ once: true }}
                >
                  {project.technologies.slice(0, 3).map(tech => (
                    <span
                      key={tech}
                      className="text-xs font-medium px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* View All Button with enhanced animation */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link href="/projects">
              <motion.div
                className="inline-flex items-center px-8 py-4 border border-gray-300 dark:border-gray-700 
          rounded-lg text-gray-800 dark:text-white font-medium 
          hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-all group cursor-pointer relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">
                  View All Projects
                  <svg
                    className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-gray-100/50 to-gray-200/50 dark:from-gray-800/50 dark:to-gray-700/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  initial={{ x: '-100%' }}
                  whileInView={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </Link>
          </motion.div>

          {/* Floating elements that appear on scroll */}
          <motion.div
            className="absolute -left-10 top-1/4 -z-10"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="text-purple-500/20 dark:text-purple-600/10">
              <path d="M100 0C44.77 0 0 44.77 0 100s44.77 100 100 100 100-44.77 100-100S155.23 0 100 0zm0 180c-44.18 0-80-35.82-80-80S55.82 20 100 20s80 35.82 80 80-35.82 80-80 80z" fill="currentColor" />
            </svg>
          </motion.div>

          <motion.div
            className="absolute -right-10 bottom-1/4 -z-10"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 0.3, x: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <svg width="200" height="200" viewBox="0 0 200 200" fill="none" className="text-pink-500/20 dark:text-pink-600/10">
              <path d="M100 200L0 100l100-100 100 100-100 100zm0-30l70-70-70-70-70 70 70 70z" fill="currentColor" />
            </svg>
          </motion.div>
        </section>


        <motion.section
          id="about"
          className="py-28 px-4 sm:px-8 bg-gray-900/50 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Enhanced Animated Background */}
          <motion.div
            className="absolute inset-0 -z-10 overflow-hidden pointer-events-none"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          >
            {/* Floating gradient particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full blur-[60px] opacity-20 ${i % 3 === 0
                    ? 'bg-purple-500/30'
                    : i % 3 === 1
                      ? 'bg-pink-600/30'
                      : 'bg-blue-500/30'
                  }`}
                style={{
                  width: `${50 + Math.random() * 200}px`,
                  height: `${50 + Math.random() * 200}px`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                initial={{ scale: 0 }}
                whileInView={{
                  scale: 1,
                  x: [0, (Math.random() - 0.5) * 100],
                  y: [0, (Math.random() - 0.5) * 100]
                }}
                transition={{
                  duration: 15 + Math.random() * 20,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: Math.random() * 2
                }}
                viewport={{ once: true }}
              />
            ))}

            {/* Geometric shapes */}
            <motion.div
              className="absolute -left-40 -top-40 w-80 h-80 border-2 border-purple-500/20 rounded-full"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              viewport={{ once: true }}
            />
            <motion.div
              className="absolute -right-40 -bottom-40 w-80 h-80 border-2 border-pink-500/20 rotate-45"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </motion.div>

          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <motion.div
              className="mb-20 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="inline-block mb-6 px-4 py-2 rounded-full bg-gray-800 border border-gray-700"
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                viewport={{ once: true }}
              >
                <span className="text-sm font-medium text-purple-400">Get To Know Me</span>
              </motion.div>

              <motion.h2
                className="text-4xl sm:text-5xl font-bold text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                About <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Me</span>
              </motion.h2>

              <motion.div
                className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              />

              <motion.p
                className="text-lg text-gray-300 max-w-3xl mx-auto mt-8"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                I&apos;m a full-stack developer with 1+ years of freelancing experience building web applications.
                I specialize in modern JavaScript frameworks and have a passion for creating
                intuitive, performant, and accessible digital experiences.
              </motion.p>
            </motion.div>

            {/* Main Content */}
            <div className="grid md:grid-cols-2 gap-12">
              {/* Skills Section */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500/30 transition-colors"
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
                  whileInView={{
                    textShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 10px rgba(168,85,247,0.3)', '0 0 0px rgba(168,85,247,0)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Skills & Expertise
                </motion.h3>

                <div className="space-y-6">
                  {[
                    { name: 'Frontend Development', level: 95, color: 'from-purple-500 to-pink-600' },
                    { name: 'Backend Development', level: 85, color: 'from-blue-500 to-cyan-600' },
                    { name: 'UI/UX Design', level: 80, color: 'from-green-500 to-emerald-600' },
                    { name: 'DevOps & Cloud', level: 75, color: 'from-yellow-500 to-amber-600' },
                    { name: 'Mobile Development', level: 70, color: 'from-red-500 to-orange-600' },
                  ].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: 0.1 * index, type: 'spring' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Experience Section */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-pink-500/30 transition-colors"
              >
                <motion.h3
                  className="text-2xl font-bold text-white mb-8 flex items-center gap-3"
                  whileInView={{
                    textShadow: ['0 0 0px rgba(236,72,153,0)', '0 0 10px rgba(236,72,153,0.3)', '0 0 0px rgba(236,72,153,0)']
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  viewport={{ once: true }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Experience & Education
                </motion.h3>

                <div className="space-y-8">
                  {[
                    {
                      title: 'Freelance Full Stack Developer',
                      company: 'Affiliated with companies and self',
                      period: '2024 - Present',
                      description: 'Leading a team to build scalable web applications using React, Angular, Node.js, and DevOps.'
                    },
                    {
                      title: 'BA English',
                      company: 'Moulana Azad National University, Hyderabad',
                      period: '2023 - 2026',
                      description: ''
                    },
                  ].map((exp, index) => (
                    <motion.div
                      key={index}
                      className="border-l-2 border-pink-500 pl-5 relative pb-8 group"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.15 }}
                      viewport={{ once: true }}
                    >
                      <div className="absolute -left-2.5 top-0 w-4 h-4 bg-pink-500 rounded-full group-hover:scale-150 transition-transform" />
                      <h4 className="text-lg font-medium text-white">{exp.title}</h4>
                      <p className="text-gray-400 text-sm mt-1">{exp.company} • {exp.period}</p>
                      {exp.description && (
                        <p className="text-gray-300 mt-3 text-sm">{exp.description}</p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-20"
            >
              <motion.h3
                className="text-2xl font-bold text-white mb-12 text-center"
                whileInView={{
                  textShadow: ['0 0 0px rgba(168,85,247,0)', '0 0 10px rgba(168,85,247,0.3)', '0 0 0px rgba(168,85,247,0)']
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse'
                }}
                viewport={{ once: true }}
              >
                Fun Facts
              </motion.h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { number: '5+', label: 'Years Experience', icon: '👨‍💻' },
                  { number: '50+', label: 'Projects Completed', icon: '🚀' },
                  { number: '∞', label: 'Cups of Coffee', icon: '☕' },
                  { number: '100%', label: 'Satisfaction', icon: '😊' },
                ].map((fact, index) => (
                  <motion.div
                    key={index}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 text-center border border-gray-700 hover:border-purple-500/50 transition-all group"
                    whileHover={{
                      y: -8,
                      boxShadow: '0 10px 25px -5px rgba(168, 85, 247, 0.2)'
                    }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <div className="text-4xl mb-3 opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-transform">
                      {fact.icon}
                    </div>
                    <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-600 mb-2">
                      {fact.number}
                    </p>
                    <p className="text-gray-300 text-sm">{fact.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.section>

       {/* Contact Section */}
<section id="contact" className="py-20 px-4 sm:px-8 max-w-4xl mx-auto relative">
  {/* Floating elements */}
  <motion.div
    className="absolute -left-20 top-1/4 w-40 h-40 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-3xl -z-10"
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
      className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center"
    >
      Get In <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Touch</span>
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      viewport={{ once: true }}
      className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto"
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
        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white transition"
              placeholder="Your name"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white transition"
              placeholder="your.email@example.com"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            viewport={{ once: true }}
          >
            <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white transition"
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
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="bg-purple-500/10 dark:bg-purple-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Email Me</h4>
              <a href="mailto:contact@example.com" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition">nkshibili17@gmail.com</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="bg-pink-600/10 dark:bg-pink-600/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Call Me</h4>
              <a href="tel:+1234567890" className="text-gray-600 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition">+91 6282699250</a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-500 transition-colors"
        >
          <div className="flex items-start gap-4">
            <div className="bg-blue-500/10 dark:bg-blue-500/20 p-3 rounded-lg">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Location</h4>
              <p className="text-gray-600 dark:text-gray-300">Kerala, Malappuram</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
</section>

       {/* Footer */}
<footer className="py-12 px-4 sm:px-8 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-b from-white/50 to-white dark:from-gray-900/50 dark:to-gray-900">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
        className="mb-6 md:mb-0"
      >
        <a href="#home" className="text-gray-900 dark:text-white font-bold text-xl flex items-center group">
          <motion.span 
            className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-lg mr-2 group-hover:rotate-12 transition-transform"
            whileHover={{ scale: 1.1 }}
          >
            MS
          </motion.span>
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
          <motion.a
            key={item}
            href={`#${item}`}
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative group"
            whileHover={{ y: -2 }}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-purple-600 dark:bg-purple-400 transition-all group-hover:w-full"></span>
          </motion.a>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="flex space-x-6"
      >
        {[
          { name: 'twitter', url: 'https://twitter.com/muhamedshibilin', color: 'text-blue-400 hover:text-blue-500' },
          { name: 'github', url: 'https://github.com/muhammedshibilin', color: 'text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white' },
          { name: 'linkedin', url: 'https://linkedin.com/in/muhammedshibilin', color: 'text-blue-600 hover:text-blue-700' },
          { name: 'instagram', url: 'https://instagram.com/ziblyy', color: 'text-pink-500 hover:text-pink-600' },
          { name: 'whatsapp', url: 'https://wa.me/916282699250', color: 'text-green-500 hover:text-green-600' },
        ].map(({ name, url, color }, i) => (
          <motion.a
            key={i}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} transition-colors`}
            whileHover={{ y: -5, scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">{name}</span>
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              {name === 'twitter' && (
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              )}
              {name === 'github' && (
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              )}
              {name === 'linkedin' && (
                <path d="M19 0h-14C2.24 0 0 2.24 0 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5V5c0-2.76-2.24-5-5-5zM7 19H4v-9h3v9zm-1.5-10.3c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75S7.25 5.98 7.25 6.95 6.47 8.7 5.5 8.7zm13.5 10.3h-3v-4.8c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.84 1.25-1.84 2.55V19h-3v-9h2.88v1.23h.04c.4-.75 1.37-1.54 2.82-1.54 3.02 0 3.58 1.99 3.58 4.57V19z" />
              )}
              {name === 'instagram' && (
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zM4.5 7.75a3.25 3.25 0 013.25-3.25h8.5a3.25 3.25 0 013.25 3.25v8.5a3.25 3.25 0 01-3.25 3.25h-8.5A3.25 3.25 0 014.5 16.25v-8.5zm7.5 1.5a4 4 0 100 8 4 4 0 000-8zm0 1.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm5.25-2.75a.75.75 0 100 1.5.75.75 0 000-1.5z" />
              )}
              {name === 'whatsapp' && (
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.654-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.52-.075-.149-.669-1.611-.916-2.206-.242-.58-.487-.501-.67-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.48 1.065 2.876 1.213 3.074c.149.198 2.1 3.2 5.077 4.487.71.306 1.263.488 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.412.248-.694.248-1.29.173-1.412-.074-.123-.272-.198-.57-.347zM12.005 2C6.486 2 2 6.486 2 12.005c0 1.977.518 3.882 1.502 5.547L2 22l4.607-1.483A9.953 9.953 0 0012.005 22C17.522 22 22 17.514 22 12.005 22 6.486 17.522 2 12.005 2z" />
              )}
            </svg>
          </motion.a>
        ))}
      </motion.div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      viewport={{ once: true }}
      className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center"
    >
      <p className="text-gray-600 dark:text-gray-400 text-sm">
        © {new Date().getFullYear()} Muhammed Shibili N. All rights reserved.
      </p>
    </motion.div>
  </div>

  {/* Decorative elements */}
  <motion.div 
    className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-20"
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
  />
</footer>
      </div>
      <Analytics />
    </>
  );
}