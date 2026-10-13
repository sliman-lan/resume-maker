'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore'; // أو المسار النسبي ../store/useResumeStore
import { EducationItem } from '@/types/resume';

export const EducationForm = () => {
  const { resumeData, addEducation, removeEducation } = useResumeStore();
  const { education } = resumeData;

  const [newEdu, setNewEdu] = useState<Omit<EducationItem, 'id'>>({
    institution: '',
    degree: '',
    graduationDate: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEdu((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEdu.institution || !newEdu.degree) return;

    const item: EducationItem = {
      id: Date.now().toString(),
      ...newEdu,
    };

    addEducation(item);

    setNewEdu({
      institution: '',
      degree: '',
      graduationDate: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">التعليم والمؤهلات</h2>

      {/* قائمة المؤهلات المضافة */}
      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <div>
              <span className="font-bold text-gray-800">{edu.degree}</span> - <span className="text-gray-600">{edu.institution}</span>
            </div>
            <button
              type="button"
              onClick={() => removeEducation(edu.id)}
              className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 bg-red-50 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* نموذج إضافة مؤهل جديد */}
      <form onSubmit={handleAdd} className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700">إضافة مؤهل تعليمي</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">الدرجة العلمية / التخصص</label>
            <input
              type="text"
              name="degree"
              value={newEdu.degree}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: بكالوريوس في علوم الحاسوب"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">الجامعة / المؤسسة</label>
            <input
              type="text"
              name="institution"
              value={newEdu.institution}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: جامعة تشرين"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">سنة التخرج</label>
            <input
              type="text"
              name="graduationDate"
              value={newEdu.graduationDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2023"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm font-medium transition-all"
        >
          + إضافة المؤهل التعليمي
        </button>
      </form>
    </div>
  );
};