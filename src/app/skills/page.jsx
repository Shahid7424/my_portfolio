"use client";
import {
  Code,
  Database,
  Cloud,
  GitBranch,
  Palette,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else {
        setCardsPerView(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: <Code className="w-6 h-6" />,
      skills: [
        { name: "React.js", level: 90, color: "bg-blue-500" },
        { name: "Next.js", level: 85, color: "bg-gray-800" },
        { name: "TypeScript", level: 80, color: "bg-blue-600" },
        { name: "JavaScript", level: 95, color: "bg-yellow-500" },
        { name: "Redux", level: 75, color: "bg-purple-600" },
      ],
    },
    {
      title: "Styling & UI",
      icon: <Palette className="w-6 h-6" />,
      skills: [
        { name: "TailwindCSS", level: 90, color: "bg-cyan-500" },
        { name: "Bootstrap", level: 85, color: "bg-purple-700" },
        { name: "Shadcn/ui", level: 80, color: "bg-gray-700" },
        { name: "Aceternity/ui", level: 70, color: "bg-gray-700" },
      ],
    },
    {
      title: "Backend & Database",
      icon: <Database className="w-6 h-6" />,
      skills: [
        { name: "Node.js", level: 50, color: "bg-red-600" },
        { name: "Java", level: 40, color: "bg-red-600" },
        { name: "MongoDB", level: 80, color: "bg-green-600" },
        { name: "MySQL", level: 70, color: "bg-blue-700" },
      ],
    },
    {
      title: "Cloud & Deployment",
      icon: <Cloud className="w-6 h-6" />,
      skills: [
        { name: "AWS EC2", level: 70, color: "bg-orange-500" },
        { name: "AWS S3", level: 75, color: "bg-orange-600" },
        { name: "Vercel", level: 95, color: "bg-blue-600" },
        { name: "Hostinger", level: 50, color: "bg-black" },
      ],
    },
    {
      title: "Development Tools",
      icon: <GitBranch className="w-6 h-6" />,
      skills: [
        { name: "Github", level: 95, color: "bg-red-500" },
        { name: "VS Code", level: 95, color: "bg-blue-500" },
        { name: "Postman", level: 85, color: "bg-orange-500" },
      ],
    },
  ];

  const maxIndex = skillCategories.length - cardsPerView;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
        <span className="text-xs text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );

  return (
    <section className="w-full bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-3">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          <p className="text-white text-lg">My expertise across different technologies</p>
        </div>

        <div className="relative px-4 md:px-16">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 z-10"
          >
            <ChevronLeft className="text-gray-600 w-5 h-5" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full p-3 z-10"
          >
            <ChevronRight className="text-gray-600 w-5 h-5" />
          </button>

          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${(skillCategories.length / cardsPerView) * 100}%`,
                transform: `translateX(-${(100 / skillCategories.length) * currentIndex}%)`,
              }}
            >
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className="px-4 flex-shrink-0"
                  style={{ width: `${100 / skillCategories.length}%` }}
                >
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full">
                    <div className="flex items-center mb-4">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg text-white mr-4">
                        {category.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">{category.title}</h3>
                    </div>
                    <div>
                      {category.skills.map((skill, i) => (
                        <SkillBar key={i} skill={skill} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex
                    ? "bg-gradient-to-r from-blue-500 to-purple-600"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
