export default function Resume() {
    const experiences = [
      {
        id: 1,
        role: "Frontend Developer",
        company: "Tech Company Inc.",
        period: "2020 - Present",
        description: "Developed and maintained web applications using React..."
      },
      // Add more experiences
    ];
  
    return (
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-4xl font-bold">Your Name</h1>
              <p className="text-xl text-gray-600">Your Professional Title</p>
            </div>
            <button className="bg-primary text-white px-6 py-2 rounded-lg">
              Download PDF
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Experience</h2>
              <div className="space-y-8">
                {experiences.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary pl-4">
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <div className="flex justify-between text-gray-600 mb-2">
                      <span>{exp.company}</span>
                      <span>{exp.period}</span>
                    </div>
                    <p>{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6 border-b pb-2">Skills</h2>
              {/* Add skills section */}
              
              <h2 className="text-2xl font-semibold mb-6 border-b pb-2 mt-8">Education</h2>
              {/* Add education section */}
            </div>
          </div>
        </div>
      </section>
    )
  }