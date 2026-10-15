'use client';

import React from 'react';
import { useResumeStore } from '../store/useResumeStore';

export const TemplateCustomizer = () => {
  const { template, setTemplate, accentColor, setAccentColor, language, setLanguage } = useResumeStore();

  const colors = [
    { name: 'أزرق كلاسيكي', value: 'blue', class: 'bg-blue-600' },
    { name: 'رمادي احترافي', value: 'slate', class: 'bg-slate-800' },
    { name: 'زمردي', value: 'emerald', class: 'bg-emerald-600' },
    { name: 'بنفسجي', value: 'purple', class: 'bg-purple-600' },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">تخصيص القالب والمظهر</h2>

      {/* تبديل اللغة والاتجاه */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">لغة السيرة الذاتية / الاتجاه</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              language === 'ar' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            العربية (RTL)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              language === 'en' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            English (LTR)
          </button>
        </div>
      </div>

      {/* اختيار القالب */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">اختر القالب (Template)</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setTemplate('classic')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              template === 'classic' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            كلاسيكي
          </button>
          <button
            type="button"
            onClick={() => setTemplate('modern')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              template === 'modern' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            عصري
          </button>
          <button
            type="button"
            onClick={() => setTemplate('minimal')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              template === 'minimal' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            بسيط
          </button>
        </div>
      </div>

      {/* اختيار اللون */}
      <div>
        <label className="block text-xs font-medium text-gray-700 mb-2">لون العناوين والأيقونات</label>
        <div className="flex gap-3">
          {colors.map((color) => (
            <button
              key={color.value}
              type="button"
              onClick={() => setAccentColor(color.value)}
              className={`w-7 h-7 rounded-full ${color.class} transition-transform ${
                accentColor === color.value ? 'ring-2 ring-offset-2 ring-blue-600 scale-110' : 'opacity-70 hover:opacity-100'
              }`}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};