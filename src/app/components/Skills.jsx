// "use client";

// import { Code, Database, Cloud, GitBranch, Smartphone, Palette, Server, Globe, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState, useEffect } from "react";

// export default function Skills() {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isAutoPlaying, setIsAutoPlaying] = useState(true);
//   const [cardsPerView, setCardsPerView] = useState(3);

//   // Responsive cards per view
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setCardsPerView(1);
//       } else if (window.innerWidth < 1024) {
//         setCardsPerView(2);
//       } else {
//         setCardsPerView(3);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const skillCategories = [
//     {
//       title: "Frontend Development",
//       icon: <Code className="w-6 h-6" />,
//       skills: [
//         { name: "React.js", level: 90, color: "bg-blue-500" },
//         { name: "Next.js", level: 85, color: "bg-gray-800" },
//         { name: "TypeScript", level: 80, color: "bg-blue-600" },
//         { name: "JavaScript", level: 95, color: "bg-yellow-500" },
//         { name: "Redux", level: 75, color: "bg-purple-600" }
//       ]
//     },
//     {
//       title: "Styling & UI",
//       icon: <Palette className="w-6 h-6" />,
//       skills: [
//         { name: "TailwindCSS", level: 90, color: "bg-cyan-500" },
//         { name: "Bootstrap", level: 85, color: "bg-purple-700" },
//         { name: "Shadcn/ui", level: 80, color: "bg-gray-700" },
//          { name: "Aceternity/ui", level: 70, color: "bg-gray-700" },
//       ]
//     },
//     {
//       title: "Backend & Database",
//       icon: <Database className="w-6 h-6" />,
//       skills: [
//         { name: "Node.js", level: 50, color: "bg-red-600" },
//         { name: "Java", level: 40, color: "bg-red-600" },
//         { name: "MongoDB", level: 80, color: "bg-green-600" },
//         { name: "MySQL", level: 70, color: "bg-blue-700" }
//       ]
//     },
//     {
//       title: "Cloud & Deployment",
//       icon: <Cloud className="w-6 h-6" />,
//       skills: [
//         { name: "AWS EC2", level: 70, color: "bg-orange-500" },
//         { name: "AWS S3", level: 75, color: "bg-orange-600" },
//         { name: "Vercel", level: 95, color: "bg-blue-600" },
//         { name: "Hostinger", level: 50, color: "bg-black" },
//       ]
//     },
//     {
//       title: "Development Tools",
//       icon: <GitBranch className="w-6 h-6" />,
//       skills: [
//         { name: "Github", level: 95, color: "bg-red-500" },
//         { name: "VS Code", level: 95, color: "bg-blue-500" },
//         { name: "Postman", level: 85, color: "bg-orange-500" }
//       ]
//     }
//   ];

//   const maxIndex = Math.max(0, skillCategories.length - cardsPerView);

//   // // Auto-play functionality
//   // useEffect(() => {
//   //   if (!isAutoPlaying) return;
    
//   //   const interval = setInterval(() => {
//   //     setCurrentIndex((prevIndex) => 
//   //       prevIndex >= maxIndex ? 0 : prevIndex + 1
//   //     );
//   //   }, 5000);

//   //   return () => clearInterval(interval);
//   // }, [isAutoPlaying, maxIndex]);

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex >= maxIndex ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? maxIndex : prevIndex - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   const SkillBar = ({ skill }) => (
//     <div className="mb-4">
//       <div className="flex justify-between items-center mb-1">
//         <span className="text-sm font-medium text-gray-700">{skill.name}</span>
//         <span className="text-xs text-gray-500">{skill.level}%</span>
//       </div>
//       <div className="w-full bg-gray-200 rounded-full h-2">
//         <div
//           className={`h-2 rounded-full ${skill.color} transition-all duration-1000 ease-out`}
//           style={{ width: `${skill.level}%` }}
//         ></div>
//       </div>
//     </div>
//   );

//   return (
//     <section className=" w-full bg-gray-900 py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-white mb-3">Technical Skills</h2>
//           <div className="w-25 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
//           <p className="text-white text-lg">My expertise across different technologies</p>
//         </div>

//         {/* Carousel Container */}
//         <div className="relative px-16">
//           {/* Navigation Arrows - Outside the carousel */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-colors duration-200 z-10"
//             aria-label="Previous skill category"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-600" />
//           </button>
          
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-colors duration-200 z-10"
//             aria-label="Next skill category"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-600" />
//           </button>

//           {/* Carousel Content */}
//           <div 
//             className="overflow-hidden rounded-2xl"
//             onMouseEnter={() => setIsAutoPlaying(false)}
//             onMouseLeave={() => setIsAutoPlaying(true)}
//           >
//             <div 
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ 
//                 transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
//                 width: `${(skillCategories.length * 100) / cardsPerView}%`
//               }}
//             >
//               {skillCategories.map((category, index) => (
//                 <div
//                   key={index}
//                   className="flex-shrink-0 px-4"
//                   style={{ width: `${100 / skillCategories.length}%` }}
//                 >
//                   <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100 h-full">
//                     <div className="flex items-center mb-6">
//                       <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-lg text-white mr-4">
//                         {category.icon}
//                       </div>
//                       <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
//                     </div>
                    
//                     <div className="space-y-3">
//                       {category.skills.map((skill, skillIndex) => (
//                         <SkillBar key={skillIndex} skill={skill} />
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Dot Indicators */}
//           <div className="flex justify-center mt-8 space-x-2">
//             {Array.from({ length: maxIndex + 1 }).map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-colors duration-200 ${
//                   index === currentIndex 
//                     ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
//                     : 'bg-gray-300 hover:bg-gray-400'
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Overall Stats */}
//         <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
//             <div className="bg-white rounded-lg p-4 shadow-sm">
//               <div className="text-3xl font-bold text-blue-600 mb-1">7+</div>
//               <div className="text-gray-600 text-sm">Frontend Frameworks</div>
//             </div>
//             <div className="bg-white rounded-lg p-4 shadow-sm">
//               <div className="text-3xl font-bold text-green-600 mb-1">3+</div>
//               <div className="text-gray-600 text-sm">Databases</div>
//             </div>
//             <div className="bg-white rounded-lg p-4 shadow-sm">
//               <div className="text-3xl font-bold text-purple-600 mb-1">5+</div>
//               <div className="text-gray-600 text-sm">Cloud Platforms</div>
//             </div>
//             <div className="bg-white rounded-lg p-4 shadow-sm">
//               <div className="text-3xl font-bold text-orange-600 mb-1">7+</div>
//               <div className="text-gray-600 text-sm">Dev Tools</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }