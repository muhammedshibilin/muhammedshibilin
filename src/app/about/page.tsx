'use client';

export default function About() {
    const skills = [
      { name: "JavaScript", level: "90%" },
      { name: "React", level: "85%" },
      { name: "Next.js", level: "80%" },
    ];
  
    return (
      <section className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12">About Me</h1>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Who I Am</h2>
            <p className="text-lg mb-6">
              A detailed paragraph about your professional journey, 
              what drives you, and your approach to work.
            </p>
            <p className="text-lg">
              Additional information about your background, philosophy, 
              or anything else relevant to your professional identity.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">My Skills</h2>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span>{skill.name}</span>
                    <span>{skill.level}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: skill.level }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Experience Timeline */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-8">Experience</h2>
          {/* Add your experience timeline here */}
        </div>
      </section>
    )
  }