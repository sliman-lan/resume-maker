'use client';

import React from 'react';
import { PersonalInfoForm } from '@/components/builder/PersonalInfoForm'; // أو المسار النسبي
import { ExperienceForm } from '@/components/builder/ExperienceForm';     // أو المسار النسبي
import { EducationForm } from '@/components/builder/EducationForm';       // أو المسار النسبي
import { SkillsForm } from '@/components/builder/SkillsForm';           // أو المسار النسبي
import { ClassicTemplate } from '@/components/preview/ClassicTemplate';   // أو المسار النسبي

export default function Home() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8" dir="rtl">
      {/* شريط العنوان وزر التحميل */}
      <header className="max-w-7xl mx-auto mb-6 flex justify-between items-center border-b pb-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">منشئ السيرة الذاتية الاحترافي</h1>
          <p className="text-sm text-gray-500">قم بتعبئة البيانات ومشاهدة النتيجة مباشرة</p>
        </div>
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>📥 تحميل PDF / طباعة</span>
        </button>
      </header>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* لوحة التحكم والمدخلات اليسرى */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <PersonalInfoForm />
          <ExperienceForm />
          <EducationForm />
          <SkillsForm />
        </div>

        {/* لوحة المعاينة الحية اليمنى */}
        <div className="lg:col-span-7 bg-gray-200 p-6 rounded-xl overflow-auto max-h-[85vh] sticky top-4 print:p-0 print:bg-white print:overflow-visible print:max-h-none print:w-full print:col-span-12">
          <ClassicTemplate />
        </div>
      </div>
    </main>
  );
}