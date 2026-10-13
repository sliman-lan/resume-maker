'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore'; // أو المسار النسبي ../store/useResumeStore
import { ExperienceItem } from '@/types/resume';

export const ExperienceForm = () => {
  const { resumeData, addExperience, removeExperience } = useResumeStore();
  const { experience } = resumeData;

  // حالة محلية للخبرة الجديدة التي يتم كتابتها
  const [newExp, setNewExp] = useState<Omit<ExperienceItem, 'id'>>({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewExp((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setNewExp((prev) => ({ ...prev, current: checked, endDate: checked ? '' : prev.endDate }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExp.company || !newExp.position) return;

    const item: ExperienceItem = {
      id: Date.now().toString(), // معرف فريد مؤقت
      ...newExp,
    };

    addExperience(item);

    // إعادة تعيين الحقول
    setNewExp({
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">الخبرات العملية</h2>

      {/* قائمة الخبرات المضافة مسبقاً */}
      <div className="space-y-3">
        {experience.map((exp) => (
          <div key={exp.id} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <div>
              <span className="font-bold text-gray-800">{exp.position}</span> في <span className="text-blue-600">{exp.company}</span>
            </div>
            <button
              type="button"
              onClick={() => removeExperience(exp.id)}
              className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 bg-red-50 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* نموذج إضافة خبرة جديدة */}
      <form onSubmit={handleAdd} className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700">إضافة خبرة جديدة</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">المسمى الوظيفي</label>
            <input
              type="text"
              name="position"
              value={newExp.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: Frontend Developer"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">اسم الشركة</label>
            <input
              type="text"
              name="company"
              value={newExp.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: شركة التقنية"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">تاريخ البداية</label>
            <input
              type="text"
              name="startDate"
              value={newExp.startDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2023-04"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">تاريخ النهاية</label>
            <input
              type="text"
              name="endDate"
              disabled={newExp.current}
              value={newExp.endDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              placeholder="2025-01"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-2">
            <input
              type="checkbox"
              id="currentJob"
              checked={newExp.current}
              onChange={handleCheckboxChange}
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="currentJob" className="text-xs text-gray-700 font-medium">أعمل هنا حالياً</label>
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">وصف المهام والنجاحات</label>
            <textarea
              name="description"
              rows={2}
              value={newExp.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="تطوير واجهات المستخدم..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm font-medium transition-all"
        >
          + إضافة الخبرة للقائمة
        </button>
      </form>
    </div>
  );
};