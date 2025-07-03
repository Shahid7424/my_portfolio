"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react";

export default function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const projects = [
    {
      title: "ReservationKart.com",
      description: "A comprehensive full-stack airline booking system with advanced filtering and state management capabilities.",
      technologies: ["Next.js", "MongoDB", "TailwindCSS", "API Routes"],
      features: [
        "Built full-stack booking system with modern tech stack",
        "Implemented dynamic routes and server-side API",
        "Advanced booking filters and state management",
        "Responsive design with optimal user experience"
      ],
      githubUrl: "https://github.com/AINSoftwareSolution/airline-site.git",
      liveUrl: "http://reservationkart.com/",
      category: "Full Stack"
    },
    {
      title: "Vehicle Motors Buy & Sell",
      description: "A scalable vehicle marketplace platform with cloud infrastructure and SEO optimization.",
      technologies: ["Next.js", "AWS S3", "AWS EC2", "SSR"],
      features: [
        "Secure media storage using AWS S3",
        "Deployed on AWS EC2 for reliability",
        "Server-side rendering for optimal SEO",
        "Optimized performance and loading speeds"
      ],
      githubUrl: "https://github.com/AINSoftwareSolution/motors.git",
      liveUrl: "https://motors-mocha.vercel.app/",
      category: "E-commerce"
    },
    {
      title: "EarthconnTravels.com",
      description: "A modern project management tool with real-time collaboration features and intuitive design.",
      technologies: ["Next.js", "Tailwindcss", "MongoDb", "TypeScript", "Aceternity ui", "Vercel"],
      features: [
        "Product Development ",
        "Digital Modernization",
        "Technology Partner Consulting",
        "Advanced analytics and reporting"
      ],
      githubUrl: "https://github.com/ainsoftware690/ain_software.git",
      liveUrl: "https://www.earthconntravels.com/",
      category: "Productivity"
    },
    {
      title: "DigitalMarketMart.com",
      description: "DigitalMarket — your go-to online store for a wide range of quality products including books, eBooks, healthcare items, and stylish clothing. Our mission is to make shopping easy.",
      technologies: ["Javascript", "Bootstrap", "Mysql", "Php", "Hostinger"],
      features: [
       "Wide Product Range",
       "User-Friendly Interface",
       "Affordable Prices",
       "Quality Assurance",
      ],
      githubUrl: "#",
      liveUrl: "https://example.com/demo",
      category: "Education"
    },
    {
      title: "Quantisys",
      description: "Quantisys delivers cutting-edge B2B solutions that empower travel and tourism businesses to thrive in a dynamic, innovation-driven marketplace.",
      technologies: ["Next.js", "Tailwindcss", "TypeScript", "Vercel", "Github"],
      features: [
      "Cutting-edge Solutions",
      "Empowering Travel Businesses",
      "Modern Travel Technology",
      "Business-to-Business Travel Services",
      "Travel Industry Growth"
      ],
      githubUrl: "https://github.com/AINSoftwareSolution/quantisys-app.git",
      liveUrl: "https://quantisys-app.vercel.app/",
      category: "B2B Marketing"
    },
   
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 3 >= projects.length ? 0 : prevIndex + 3
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 3 < 0 ? Math.max(projects.length - 3, 0) : prevIndex - 3
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-slate-50 to-blue-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover my latest work showcasing innovative solutions across various technologies and industries
          </p>
        </div>

        <div className="relative overflow-x-visible">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${(currentIndex * 100) / 3}%)` }}
            >
              {projects.map((project, index) => (
                <div
                  key={index}
                  className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 h-full min-h-[650px] flex flex-col">
                    <div className="p-8 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 rounded-full mb-3">
                          {project.category}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-6">
                          {project.description}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, techIndex) => (
                              <span
                                key={techIndex}
                                className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="text-sm font-semibold text-gray-700 mb-3">Key Features</h4>
                          <ul className="space-y-2">
                            {project.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start">
                                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span className="text-gray-600 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Button Section Bottom Left/Right */}
                      <div className="flex justify-between items-center gap-4 mt-8">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200 font-medium"
                        >
                          <Github className="w-4 h-4" />
                          View Code
                        </a>
                        {project.liveUrl && project.liveUrl !== "#" && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-2 border-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 hover:text-white transition-colors duration-200 font-medium"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white z-10 rounded-full p-2 shadow hover:shadow-md border border-gray-200"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white z-10 rounded-full p-2 shadow hover:shadow-md border border-gray-200"
            aria-label="Next project"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(projects.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index * 3)}
                className={`h-3 rounded-full transition-all duration-200 ${
                  currentIndex === index * 3
                    ? "bg-blue-600 w-8"
                    : "bg-gray-300 hover:bg-gray-400 w-3"
                }`}
                aria-label={`Go to project set ${index + 1}`}
              />
            )
          )}
        </div>

        {/* Counter */}
        <div className="text-center mt-6">
          <span className="text-sm text-gray-500">
            {Math.min(currentIndex + 1, projects.length)}–{Math.min(
              currentIndex + 3,
              projects.length
            )}{" "}
            of {projects.length} projects
          </span>
        </div>
      </div>
    </section>
  );
}
