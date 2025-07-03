"use client";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

export default function Education() {
  const educationData = [
    {
      degree: "B.Tech",
      field: "Electronics & Communication Engineering",
      institution: "RR Institute Of Modern Technology",
      university: "AKTU",
      year: "2023",
      type: "Bachelor's",
      icon: GraduationCap,
      gradient: "from-blue-500 to-purple-600",
      bgGradient: "from-blue-50 to-purple-50"
    },
    {
      degree: "Diploma",
      field: "Electronics Engineering",
      institution: "Ambalika Institute Of Management And Technology",
      university: "",
      year: "2020",
      type: "Diploma",
      icon: Award,
      gradient: "from-emerald-500 to-teal-600",
      bgGradient: "from-emerald-50 to-teal-50"
    }
  ];

  return (
    <section className="py-12 px-6 bg-gray-900">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Education</h2>
          <p className="text-white text-lg">Academic Journey & Qualifications</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Education Cards */}
        <div className="space-y-8">
          {educationData.map((edu, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${edu.bgGradient} p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2`}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-x-12"></div>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-r ${edu.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <edu.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 bg-gradient-to-r ${edu.gradient} text-white text-sm font-medium rounded-full shadow-md`}>
                        {edu.type}
                      </span>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">{edu.year}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {edu.degree}
                      {edu.field && <span className="text-gray-700"> in {edu.field}</span>}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-700 mb-4">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{edu.institution}</span>
                      {edu.university && (
                        <span className="text-gray-500">({edu.university})</span>
                      )}
                    </div>

                    {/* Progress Bar Animation */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 bg-gradient-to-r ${edu.gradient} rounded-full transition-all duration-1000 delay-500 group-hover:w-full`}
                        style={{ width: index === 0 ? '100%' : '100%' }}
                      ></div>
                    </div>

                    {/* Additional Details */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm rounded-full font-medium shadow-sm">
                        Electronics Engineering
                      </span>
                      <span className="px-3 py-1 bg-white/70 text-gray-700 text-sm rounded-full font-medium shadow-sm">
                        {index === 0 ? 'Engineering Graduate' : 'Technical Diploma'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${edu.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                   style={{ padding: '2px' }}>
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${edu.bgGradient}`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-blue-600 mb-2">4+</div>
            <div className="text-gray-600">Years of Study</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
            <div className="text-gray-600">Degrees Earned</div>
          </div>
          <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-3xl font-bold text-emerald-600 mb-2">100%</div>
            <div className="text-gray-600">Completion Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}