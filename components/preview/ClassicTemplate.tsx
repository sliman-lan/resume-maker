'use client';

import React from 'react';
// import { useResumeStore } from '@/store/useResumeStore';
import { useResumeStore } from '../store/useResumeStore';

export const ClassicTemplate = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, experience, education, skills } = resumeData;

  return (
    <div 
      className="bg-white w-full max-w-[210mm] min-h-[297mm] p-8 shadow-md border border-gray-200 mx-auto font-sans text-gray-900 text-right print:shadow-none print:border-none print:p-0 print:m-0" 
      dir="rtl"
    >
      {/* Header */}
      <header className="border-b-2 border-blue-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'الاسم الكامل'}</h1>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-2">
          {personalInfo.email && <span>📧 {personalInfo.email}</span>}
          {personalInfo.phone && <span>📱 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          {personalInfo.website && <span>🔗 {personalInfo.website}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2 border-b border-gray-200 pb-1">النبذة المهنية</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-200 pb-1">الخبرات العملية</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-gray-800">{exp.position} - <span className="font-semibold text-gray-600">{exp.company}</span></h3>
                  <span className="text-xs text-gray-500">{exp.startDate} - {exp.current ? 'حتى الآن' : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-3 border-b border-gray-200 pb-1">التعليم</h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-sm text-gray-800">{edu.degree}</h3>
                  <p className="text-xs text-gray-600">{edu.institution}</p>
                </div>
                <span className="text-xs text-gray-500">{edu.graduationDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-bold text-blue-600 mb-2 border-b border-gray-200 pb-1">المهارات</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded font-medium print:bg-gray-200">
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};