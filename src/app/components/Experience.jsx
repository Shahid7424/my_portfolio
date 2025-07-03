"use client";

export default function Experience() {
  return (
    <section className="py-8 md:py-16 bg-gradient-to-br from-slate-50 to-slate-200 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Experience Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 uppercase tracking-wider mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
        </div>
        
        {/* Experience Card */}
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-200 overflow-hidden">
          {/* Top Border Gradient */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-6 md:p-8">
            {/* Job Header */}
            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
                Software Developer
              </h3>
              <span className="text-lg font-semibold text-blue-600">
                AIN Software Solution
              </span>
            </div>
            
            {/* Job Details */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6 text-sm md:text-base">
              <span className="text-slate-600 font-medium">
                Feb 2024 - Present
              </span>
              <span className="hidden md:inline text-slate-400">|</span>
              <span className="text-slate-600">
                Pune, India
              </span>
            </div>
            
            {/* Achievements List */}
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-700 hover:text-slate-900 transition-colors duration-200">
                <span className="text-blue-500 font-bold text-lg mt-0.5 flex-shrink-0">▸</span>
                <span className="leading-relaxed">
                  Developed scalable React/Next.js apps with 30% performance gains.
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 hover:text-slate-900 transition-colors duration-200">
                <span className="text-blue-500 font-bold text-lg mt-0.5 flex-shrink-0">▸</span>
                <span className="leading-relaxed">
                  Built mobile-friendly UIs using TailwindCSS, Bootstrap.
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 hover:text-slate-900 transition-colors duration-200">
                <span className="text-blue-500 font-bold text-lg mt-0.5 flex-shrink-0">▸</span>
                <span className="leading-relaxed">
                  Integrated REST APIs ensuring 99.5% uptime.
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 hover:text-slate-900 transition-colors duration-200">
                <span className="text-blue-500 font-bold text-lg mt-0.5 flex-shrink-0">▸</span>
                <span className="leading-relaxed">
                  Deployed to AWS (S3, EC2) and Vercel with CI/CD setup.
                </span>
              </li>
              <li className="flex items-start gap-3 text-slate-700 hover:text-slate-900 transition-colors duration-200">
                <span className="text-blue-500 font-bold text-lg mt-0.5 flex-shrink-0">▸</span>
                <span className="leading-relaxed">
                  Optimized Next.js apps via lazy loading & code splitting.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}