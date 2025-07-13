'use client';

import { Project } from '@/types/project.interface';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TECH_OPTIONS = [
  // AI/ML
  'TensorFlow', 'PyTorch', 'Keras', 'LangChain', 'LlamaIndex',
  'Hugging Face', 'OpenAI API', 'Gemini API', 'Anthropic Claude',
  'Llama 3', 'Stable Diffusion', 'RAG', 'AutoML', 'scikit-learn',
  'Pandas', 'NumPy', 'Pinecone', 'Weaviate', 'Milvus',

  // Frontend
  'React', 'Next.js', 'Remix', 'Svelte', 'SolidJS', 'Vue', 'Angular',
  'Astro', 'Qwik', 'Tailwind CSS', 'Shadcn UI', 'Framer Motion',
  'Three.js', 'WebGL', 'HTMX', 'WebGPU',

  // Backend
  'Node.js', 'Express', 'NestJS', 'Fastify', 'Go (Golang)', 'Python',
  'Django', 'Flask', 'FastAPI', 'Ruby on Rails', 'Spring Boot',
  '.NET Core', 'Deno', 'Bun', 'GraphQL', 'tRPC',

  // Databases
  'PostgreSQL', 'MongoDB', 'Firebase', 'Supabase', 'Redis', 'MySQL',
  'SQLite', 'Neon', 'PlanetScale', 'DynamoDB', 'Cassandra',
  'Prisma', 'Drizzle ORM',

  // DevOps
  'Docker', 'Kubernetes', 'Terraform', 'AWS', 'Azure', 'GCP',
  'Vercel', 'Netlify', 'Cloudflare Workers', 'Fly.io', 'Railway',
  'GitHub Actions', 'CircleCI', 'ArgoCD', 'Istio', 'Prometheus',
  'Grafana',

  // Blockchain
  'Solidity', 'Ethereum', 'Polygon', 'Solana', 'Rust (Blockchain)',
  'Web3.js', 'Ethers.js', 'Hardhat', 'Foundry', 'Wagmi',

  // Others
  'WebAssembly', 'Rust', 'Web Components', 'Electron', 'Tauri',
  'WebRTC', 'WebSocket',

  // Mobile
  'React Native', 'Flutter', 'SwiftUI', 'Jetpack Compose', 'KMM',
  'Expo', 'Capacitor'
];

const ROLE_OPTIONS = ['Frontend', 'Backend', 'Fullstack', 'DevOps', 'AI/ML Engineer', 'Data Engineer'];

interface ProjectForm {
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  challenges: string;
  solutions: string;
  liveUrl: string;
  githubUrl: string;
  technologies: string[];
  role: string[];
  imageUrl?: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  onUpdate?: (project: Project) => void;
  project?: Project | null;
}

export default function ProjectModal({
  isOpen,
  onClose,
  onSuccess,
  onUpdate,
  project,
}: ProjectModalProps) {
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    description: '',
    detailedDescription: '',
    features: [],
    challenges: '',
    solutions: '',
    liveUrl: '',
    githubUrl: '',
    technologies: [],
    role: []
  });

  const [technologies, setTechnologies] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (project) {
      setForm({
        title: project.title || '',
        description: project.description || '',
        detailedDescription: project.detailedDescription || '',
        features: project.features || [],
        challenges: project.challenges || '',
        solutions: project.solutions || '',
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        technologies: project.technologies || [],
        role: project.role || [],
      });
      setTechnologies(project.technologies || []);
      setRoles(project.role || []);
      setPreview(project.imageUrl || '');
    } else {
      resetForm();
    }
  }, [project]);

  const resetForm = () => {
    setForm({
      title: '',
      description: '',
      detailedDescription: '',
      features: [],
      challenges: '',
      solutions: '',
      liveUrl: '',
      githubUrl: '',
      technologies: [],
      role: []
    });
    setTechnologies([]);
    setRoles([]);
    setFile(null);
    setPreview('');
    setError(null);
  };

  const handleCheckbox = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    );
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description) {
      setError('Title and description are required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let imageUrl = preview;

      if (file instanceof File) {
        const formData = new FormData();
        formData.append('file', file);
      
        try {
          const uploadRes = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
      
          if (!uploadRes.ok) {
            const error = await uploadRes.json();
            throw new Error(error?.error || 'File upload failed');
          }
      
          const uploadData = await uploadRes.json();
          imageUrl = uploadData.secure_url;
      
          console.log('✅ File uploaded:', imageUrl);
        } catch (error) {
          console.error('❌ Upload error:', error);
          alert('Upload failed. Please try again.');
        }
      } else {
        console.warn('⚠️ No file selected or invalid file');
      }
      const payload = {
        ...form,
        technologies,
        role: roles,
        imageUrl,
        ...(project?.id && { id: project.id }),
      };

      if (project?.id && onUpdate) {
        onUpdate(payload as Project);
      } else {
        const res = await fetch('/api/projects', {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(await res.text());
        }

        onSuccess();
        onClose();
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white shadow-2xl rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {project ? 'Edit Project' : 'Add Project'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-colors"
              disabled={loading}
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Required Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg text-sm transition-colors"
                  placeholder="Project title"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg text-sm min-h-[100px] transition-colors"
                  placeholder="Brief project description"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Other Fields */}
            {[
              { field: 'detailedDescription', label: 'Detailed Description', type: 'textarea' },
              { field: 'challenges', label: 'Challenges', type: 'textarea' },
              { field: 'solutions', label: 'Solutions', type: 'textarea' },
              { field: 'liveUrl', label: 'Live URL', type: 'input' },
              { field: 'githubUrl', label: 'GitHub URL', type: 'input' },
            ].map(({ field, label, type }) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                {type === 'textarea' ? (
                  <textarea
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={(form as any)[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg text-sm min-h-[100px] transition-colors"
                    placeholder={label}
                    disabled={loading}
                  />
                ) : (
                  <input
                    type={field.includes('Url') ? 'url' : 'text'}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    value={(form as any)[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg text-sm transition-colors"
                    placeholder={label}
                    disabled={loading}
                  />
                )}
              </div>
            ))}

            {/* Features */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Features</label>
              <textarea
                value={form.features.join('\n')}
                onChange={(e) => setForm({
                  ...form,
                  features: e.target.value.split('\n').filter(line => line.trim())
                })}
                className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 px-4 py-3 rounded-lg text-sm min-h-[120px] transition-colors"
                placeholder="Enter each feature on a new line"
                disabled={loading}
              />
            </div>

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Technologies Used</label>
              <div className="max-h-[200px] overflow-y-auto p-4 border border-gray-300 rounded-lg bg-gray-50">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {TECH_OPTIONS.map((tech) => (
                    <label key={tech} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={technologies.includes(tech)}
                        onChange={() => handleCheckbox(setTechnologies, tech)}
                        disabled={loading}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span>{tech}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Roles */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Role</label>
              <div className="flex flex-wrap gap-3">
                {ROLE_OPTIONS.map((role) => (
                  <label key={role} className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 cursor-pointer bg-white border border-gray-300 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={roles.includes(role)}
                      onChange={() => handleCheckbox(setRoles, role)}
                      disabled={loading}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span>{role}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Project Image</label>
              <input
                type="file"
                onChange={(e) => {
                  const selectedFile = e.target.files?.[0];
                  if (selectedFile) {
                    setFile(selectedFile);
                    setPreview(URL.createObjectURL(selectedFile));
                  }
                }}
                className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                accept="image/*"
                disabled={loading}
              />
              {preview && (
                <div className="mt-3">
                  <Image
                    src={preview}
                    width={500}
                    height={300}
                    className="h-32 w-full object-contain rounded-lg border border-gray-300"
                    alt="Project preview"
                  />
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                disabled={loading}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors shadow-sm"
              >
                {loading ? 'Submitting...' : 'Submit Project'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}