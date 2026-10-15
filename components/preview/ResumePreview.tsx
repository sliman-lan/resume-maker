'use client';

import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

export const ResumePreview = () => {
  const { resumeData, template, accentColor, language } = useResumeStore();
  const { personalInfo, experience, education, skills, projects, certificates } = resumeData;

  const isAr = language === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  // العناوين المترجمة حسب اللغة
  const labels = {
    summary: isAr ? 'النبذة المهنية' : 'Professional Summary',
    experience: isAr ? 'الخبرات العملية' : 'Work Experience',
    projects: isAr ? 'المشاريع البرمجية' : 'Key Projects',
    education: isAr ? 'التعليم والمؤهلات' : 'Education',
    skills: isAr ? 'المهارات والتقنيات' : 'Technical Skills',
    present: isAr ? 'حتى الآن' : 'Present',
    certificates: isAr ? 'الشهادات والدورات التدريبية' : 'Certificates',
  };

  const colorClasses: Record<string, { text: string; border: string; bgBadge: string }> = {
    blue: { text: 'text-blue-600', border: 'border-blue-600', bgBadge: 'bg-blue-50 text-blue-700 border-blue-100' },
    slate: { text: 'text-slate-800', border: 'border-slate-800', bgBadge: 'bg-slate-100 text-slate-800 border-slate-200' },
    emerald: { text: 'text-emerald-600', border: 'border-emerald-600', bgBadge: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    purple: { text: 'text-purple-600', border: 'border-purple-600', bgBadge: 'bg-purple-50 text-purple-700 border-purple-100' },
  };

  const currentTheme = colorClasses[accentColor] || colorClasses.blue;

  return (
    <div
      className="bg-white w-full max-w-[210mm] min-h-[297mm] p-8 shadow-md border border-gray-200 mx-auto font-sans text-gray-900 print:shadow-none print:border-none print:p-0 print:m-0"
      dir={dir}
    >
      {/* Header */}
      <header className={`border-b-2 ${currentTheme.border} pb-4 mb-6`}>
        <h1 className="text-3xl font-bold text-gray-900">{personalInfo.fullName || 'Full Name'}</h1>
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
          <h2 className={`text-lg font-bold ${currentTheme.text} mb-2 border-b border-gray-200 pb-1`}>{labels.summary}</h2>
          <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-lg font-bold ${currentTheme.text} mb-3 border-b border-gray-200 pb-1`}>{labels.experience}</h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-gray-800">{exp.position} - <span className="font-semibold text-gray-600">{exp.company}</span></h3>
                  <span className="text-xs text-gray-500">{exp.startDate} - {exp.current ? labels.present : exp.endDate}</span>
                </div>
                {exp.description && <p className="text-xs text-gray-600 mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-lg font-bold ${currentTheme.text} mb-3 border-b border-gray-200 pb-1`}>{labels.projects}</h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-sm text-gray-800">{proj.title} <span className="text-xs text-gray-500 font-normal">({proj.techStack})</span></h3>
                  <div className="flex gap-2 text-xs">
                    {proj.githubLink && <a href={proj.githubLink} target="_blank" className="text-blue-600 underline">GitHub</a>}
                    {proj.liveLink && <a href={proj.liveLink} target="_blank" className="text-blue-600 underline">Demo</a>}
                  </div>
                </div>
                {proj.description && <p className="text-xs text-gray-600 mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-lg font-bold ${currentTheme.text} mb-3 border-b border-gray-200 pb-1`}>{labels.education}</h2>
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
  {/* Certificates */}
{certificates && certificates.length > 0 && (
  <section className="mb-6">
    <h2 className={`text-lg font-bold ${currentTheme.text} mb-3 border-b border-gray-200 pb-1`}>
      {language === 'ar' ? 'الشهادات والدورات التدريبية' : 'Certificates'}
    </h2>
    <div className="space-y-2">
      {certificates.map((cert) => (
        <div key={cert.id} className="flex justify-between items-baseline">
          <div>
            <h3 className="font-bold text-sm text-gray-800">{cert.title}</h3>
            <p className="text-xs text-gray-600">{cert.issuer}</p>
          </div>
          <span className="text-xs text-gray-500">{cert.date}</span>
        </div>
      ))}
    </div>
  </section>
)}
      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 className={`text-lg font-bold ${currentTheme.text} mb-2 border-b border-gray-200 pb-1`}>{labels.skills}</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span key={index} className={`text-xs px-2.5 py-1 rounded font-medium border ${currentTheme.bgBadge}`}>
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};