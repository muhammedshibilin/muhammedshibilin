// src/app/projects/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project.interface';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import ProjectModal from '@/components/ui/projectModal';
import Image from 'next/image';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/projects');
      if (!res.ok) throw new Error('Failed to fetch projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete project');

      toast.success('Project deleted successfully');
      fetchProjects();
      setConfirmDeleteId(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleUpdate = async (updatedProject: Project) => {
    try {
      const res = await fetch(`/api/projects/${updatedProject.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProject),
      });

      if (!res.ok) throw new Error('Failed to update project');

      toast.success('Project updated successfully');
      fetchProjects();
      setIsModalOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to update project');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <button
          onClick={() => {
            setEditingProject(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FiPlus /> Add Project
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found. Create your first project!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="group bg-white/10 backdrop-blur border border-white/10 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl relative"
          >
            {project.imageUrl && (
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )}
      
            <div className="p-5 space-y-3">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              <p className="text-gray-300 text-sm line-clamp-2">{project.description}</p>
      
              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-3 py-1 rounded-full border border-white/10 text-gray-200 bg-gradient-to-r from-slate-700 to-slate-800 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 4 && (
                  <span className="text-xs px-3 py-1 rounded-full bg-gray-700 text-gray-300">
                    +{project.technologies.length - 4} more
                  </span>
                )}
              </div>
      
              {/* Links and actions */}
              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 transition"
                    >
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-green-400 hover:text-green-300 transition"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
      
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-gray-400 hover:text-blue-500 transition"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(project.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
      
            {/* Delete Confirmation */}
            {confirmDeleteId === project.id && (
              <div className="absolute inset-0 bg-black/70 flex flex-col justify-center items-center z-10 p-6 space-y-4 text-center">
                <p className="text-white text-sm">Are you sure you want to delete this project?</p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setConfirmDeleteId(null)}
                    className="text-sm px-4 py-1 rounded border border-gray-300 text-gray-300 hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="text-sm px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      )}

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProject(null);
        }}
        project={editingProject}
        onSuccess={fetchProjects}
        onUpdate={handleUpdate}
      />
    </div>
  );
}