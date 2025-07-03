// // app/components/AboutUsSection.jsx or src/components/AboutUsSection.jsx

// export default function AboutUsSection() {
//   return (
//     <section className="bg-gray-50 py-20">
//       <div className="container mx-auto px-6">
//         {/* What We Do Section */}
//         <div className="max-w-4xl mx-auto mb-20">
//           <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 hover:translate-y-[-8px] transition duration-300 ease-in-out hover:shadow-2xl">
//             <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
//               What We Do
//             </h2>
//             <p className="text-lg text-gray-600 leading-relaxed mb-6">
//               We specialize in creating exceptional digital experiences through thoughtful UI/UX design and cutting-edge web development.
//             </p>
//             <p className="text-lg text-gray-600 leading-relaxed">
//               Every project we undertake is driven by a deep understanding of user behavior, design principles, and the latest technologies.
//             </p>
//           </div>
//         </div>

//         {/* Services */}
//         <div className="grid md:grid-cols-3 gap-8 mb-20">
//           {[
//             {
//               title: "UI/UX Design",
//               description:
//                 "Creating intuitive and visually stunning user interfaces that prioritize user experience and accessibility.",
//               color: "bg-primary",
//               iconPath: "M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
//             },
//             {
//               title: "Web Development",
//               description:
//                 "Building responsive and performant web applications using modern technologies like Next.js and React.",
//               color: "bg-secondary",
//               iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
//             },
//             {
//               title: "Performance Optimization",
//               description:
//                 "Ensuring fast loading times and smooth interactions through optimized code and best practices.",
//               color: "bg-accent",
//               iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
//             },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:translate-y-[-8px] hover:shadow-2xl"
//             >
//               <div
//                 className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}
//               >
//                 <svg
//                   className="w-6 h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d={item.iconPath}
//                   />
//                 </svg>
//               </div>
//               <h3 className="text-xl font-semibold text-gray-800 mb-3">
//                 {item.title}
//               </h3>
//               <p className="text-gray-600">{item.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
