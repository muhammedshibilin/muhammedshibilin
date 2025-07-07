
'use client';

export default function Contact() {
    return (
      <section className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-12">Get In Touch</h1>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Form</h2>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Other Ways to Connect</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Email</h3>
                  <p>your.email@example.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Social Media</h3>
                  <div className="flex gap-4">
                    <a href="#" className="text-primary hover:underline">LinkedIn</a>
                    <a href="#" className="text-primary hover:underline">GitHub</a>
                    <a href="#" className="text-primary hover:underline">Twitter</a>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Location</h3>
                  <p>City, Country</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }