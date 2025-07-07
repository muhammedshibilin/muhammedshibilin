// Server function to fetch project data
async function fetchProjectData(id: string) {
  // In a real app, you would fetch the project data based on id
  return {
    id: id,
    title: "E-commerce Platform",
    description: "A comprehensive online store solution...",
    detailedDescription: "Several paragraphs about the project...",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    features: ["Product catalog", "Shopping cart", "User authentication"],
    challenges: "Describe technical challenges you faced...",
    solutions: "How you solved those challenges...",
    images: ["/project1-1.jpg", "/project1-2.jpg"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example"
  };
}

interface PageProps {
  params: { id: string }
}

export default async function ProjectDetail({ params }: PageProps) {
  const project = await fetchProjectData(params.id);

  return (
    <section className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
        <p className="text-xl text-gray-600 mb-8">{project.description}</p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
            <p className="mb-6">{project.detailedDescription}</p>
            
            <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
            
            <div className="flex gap-4">
              {project.liveUrl && (
                <a href={project.liveUrl} className="bg-primary text-white px-6 py-2 rounded-lg">
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} className="border border-gray-300 px-6 py-2 rounded-lg">
                  View Code
                </a>
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            {project.images.map((_image, index) => (
              <div key={index} className="bg-gray-200 h-64 rounded-lg"></div>
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Challenges</h3>
            <p className="mb-4">{project.challenges}</p>
            <h3 className="text-lg font-semibold mb-2">Solutions</h3>
            <p>{project.solutions}</p>
          </div>
        </div>
      </div>
    </section>
  )
}