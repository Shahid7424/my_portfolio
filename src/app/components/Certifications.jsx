"use client"
import { Award, Code, Trophy, Calendar, CheckCircle, ExternalLink } from 'lucide-react';

export default function Certifications() {
  const certifications = [
    {
      title: "Full Stack Web Development",
      provider: "AccioJob",
      year: "2023",
      description: "Comprehensive full-stack development program covering modern web technologies",
      achievements: [
        "Built 5+ full-stack applications",
        "Solved 70+ Data Structures & Algorithms problems",
        "Mastered React, Node.js, and database management"
      ],
      icon: <Code className="w-6 h-6" />,
      color: "bg-blue-500",
      verified: true
    },
    // You can add more certifications here
  ];

  return (
    <section className="py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-4xl font-bold text-gray-900">Certifications</h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Professional certifications and achievements that demonstrate expertise and continuous learning
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`${cert.color} p-3 rounded-lg text-white mr-4`}>
                      {cert.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-1">
                        {cert.title}
                      </h3>
                      <div className="flex items-center text-gray-600">
                        <span className="font-semibold">{cert.provider}</span>
                        <span className="mx-2">•</span>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {cert.year}
                        </div>
                      </div>
                    </div>
                  </div>
                  {cert.verified && (
                    <div className="flex items-center text-green-600 bg-green-50 px-3 py-1 rounded-full">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  {cert.description}
                </p>

                {/* Achievements */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {cert.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">5+</div>
                    <div className="text-sm text-blue-700">Full-Stack Apps</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">70+</div>
                    <div className="text-sm text-green-700">DSA Problems</div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex justify-end">
                  <button className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                    View Certificate
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </div>

              {/* Decorative bottom border */}
              <div className={`h-1 ${cert.color}`}></div>
            </div>
          ))}
        </div>

        {/* Add More Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-md p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors duration-200">
            <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              More Certifications Coming Soon
            </h3>
            <p className="text-gray-500">
              Continuously learning and expanding professional expertise
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}