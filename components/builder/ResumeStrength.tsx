'use client';

import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

export const ResumeStrength = () => {
  const { resumeData } = useResumeStore();
  const { personalInfo, experience, education, skills, projects, certificates } = resumeData;

  let score = 0;
  const tips: string[] = [];

  if (personalInfo.fullName && personalInfo.email) score += 25;
  else tips.push('أضف الاسم الكامل والبريد الإلكتروني.');

  if (personalInfo.summary && personalInfo.summary.length > 20) score += 20;
  else tips.push('أضف نبذة مهنية واضحة (أكثر من 20 حرفاً).');

  if (experience && experience.length > 0) score += 20;
  else tips.push('أضف خبرة عمل واحدة على الأقل.');

  if (skills && skills.length >= 3) score += 15;
  else tips.push('أضف 3 مهارات تقنية على الأقل.');

  if (projects && projects.length > 0) score += 10;
  else tips.push('أضف مشروعاً برمجياً واحداً لتعزيز فرصك.');

  if (certificates && certificates.length > 0) score += 10;
  else tips.push('إضافة الشهادات والدورات تزيد قوة سيرتك الذاتية.');

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-3 transition-colors">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-gray-800 dark:text-white">مقياس قوة السيرة الذاتية</h3>
        <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${score >= 80 ? 'bg-green-100 text-green-700' : score >= 50 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
          {score}%
        </span>
      </div>

      <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden">
        <div className={`h-full transition-all duration-500 ${score >= 80 ? 'bg-green-500' : score >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
      </div>

      {tips.length > 0 && (
        <ul className="text-xs text-gray-500 dark:text-gray-400 space-y-1 list-disc list-inside pt-1">
          {tips.slice(0, 2).map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
};