'use client';

import React from 'react';
import { PersonalInfoForm } from '@/components/builder/PersonalInfoForm';
import { ExperienceForm } from '@/components/builder/ExperienceForm';
import { EducationForm } from '@/components/builder/EducationForm';
import { ProjectsForm } from '@/components/builder/ProjectsForm';
import { CertificatesForm } from '@/components/builder/CertificatesForm';
import { SkillsForm } from '@/components/builder/SkillsForm';
import { TemplateCustomizer } from '@/components/builder/TemplateCustomizer';
import { ResumeStrength } from '@/components/builder/ResumeStrength';
import { ResumePreview } from '@/components/preview/ResumePreview';

export default function Home() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8 text-gray-900 dark:text-gray-100 transition-colors" dir="rtl">
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">منشئ السيرة الذاتية الاحترافي</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">إدارة متكاملة، مقياس قوة الـ CV، قوالب متعددة، ودعم كامل للوضع الليلي</p>
        </div>
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>📥 تحميل PDF نظيف</span>
        </button>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* لوحة التحكم والمدخلات */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <ResumeStrength />
          <TemplateCustomizer />
          <PersonalInfoForm />
          <ProjectsForm />
          <ExperienceForm />
          <EducationForm />
          <CertificatesForm />
          <SkillsForm />
        </div>

        {/* المعاينة الحية */}
        <div className="lg:col-span-7 bg-gray-200 dark:bg-gray-800 p-6 rounded-xl overflow-auto max-h-[85vh] sticky top-4 print:p-0 print:bg-white print:overflow-visible print:max-h-none print:w-full print:col-span-12 transition-colors">
          <ResumePreview />
        </div>
      </div>
    </main>
  );
}