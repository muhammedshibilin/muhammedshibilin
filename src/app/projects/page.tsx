'use client';

import { ProjectCard } from "@/components/ui/projectCard";


const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "Full-featured online store with payment integration",
    tags: ["React", "Node.js", "MongoDB"],
    imageUrl: "/project1.jpg",
    projectUrl: "#"
  },
];

export default function Projects() {
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold">My Projects</h1>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-primary text-white rounded-lg">
            All
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg">
            Web
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg">
            Mobile
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}