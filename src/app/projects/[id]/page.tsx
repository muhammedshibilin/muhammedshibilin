
import Image from 'next/image';
import { notFound } from 'next/navigation';

export interface Project {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  features: string[];
  challenges: string;
  solutions: string;
  images: string[];
  liveUrl?: string;
  githubUrl?: string;
}

async function fetchProjectData(id: string): Promise<Project> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const projects: Record<string, Project> = {
    '1': {
      id: '1',
      title: "E-commerce Platform",
      description: "A comprehensive online store solution with modern features",
      detailedDescription: "This project involved building a full-featured e-commerce platform from scratch. The system includes product listings, shopping cart functionality, user authentication, and payment processing. It was designed to handle high traffic volumes while maintaining excellent performance.",
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe"],
      features: [
        "Product catalog with filters",
        "Shopping cart with persistent storage",
        "User authentication system",
        "Payment processing integration",
        "Admin dashboard"
      ],
      challenges: "Implementing real-time inventory updates while maintaining performance during flash sales.",
      solutions: "Used Redis for caching and implemented optimistic UI updates to handle high traffic scenarios.",
      images: [
        "/project1-1.jpg",
        "/project1-2.jpg"
      ],
      liveUrl: "https://ecommerce-demo.example.com",
      githubUrl: "https://github.com/example/ecommerce-platform"
    },
    '2': {
      id: '2',
      title: "Social Media Dashboard",
      description: "Analytics platform for social media metrics",
      detailedDescription: "A dashboard that aggregates metrics from multiple social platforms into a unified interface with customizable reports and real-time updates.",
      technologies: ["TypeScript", "Next.js", "Chart.js", "Firebase"],
      features: [
        "Multi-platform integration",
        "Custom report generation",
        "Real-time data updates",
        "Team collaboration features"
      ],
      challenges: "Synchronizing data from different APIs with varying rate limits and response formats.",
      solutions: "Created a unified data layer with caching and implemented a queue system for API requests.",
      images: [
        "/project2-1.jpg",
        "/project2-2.jpg"
      ],
      liveUrl: "https://social-dashboard.example.com",
      githubUrl: "https://github.com/example/social-dashboard"
    }
  };

  const project = projects[id];
  if (!project) {
    throw new Error('Project not found');
  }

  return project;
}

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  let project: Project;
  
  try {
    project = await fetchProjectData(params.id);
  } catch {
    notFound();
  }

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Project Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            {project.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-3 mb-6">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Project Details */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              Project Details
            </h2>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              {project.detailedDescription}
            </p>
            
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">
              Key Features
            </h3>
            <ul className="mb-6 space-y-2">
              {project.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-8">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 px-6 py-3 rounded-lg transition-colors flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  View Code
                </a>
              )}
            </div>
          </div>

          {/* Project Images */}
          <div className="space-y-6">
            {project.images.map((image, index) => (
              <div key={index} className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Challenges & Solutions */}
        <div className="mb-12 bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
            Challenges & Solutions
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                Challenges
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {project.challenges}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                Solutions
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {project.solutions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}