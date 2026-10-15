'use client';

import React, { useEffect, useState } from 'react';
import { useResumeStore } from '../store/useResumeStore';

export const TemplateCustomizer = () => {
  const { template, setTemplate, accentColor, setAccentColor, language, setLanguage } = useResumeStore();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleExportJSON = () => {
    const state = localStorage.getItem('resume-builder-storage');
    if (!state) return;
    const blob = new Blob([state], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-resume-data.json';
    a.click();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        localStorage.setItem('resume-builder-storage', content);
        window.location.reload();
      } catch (err) {
        alert('ملف غير صالح');
      }
    };
    reader.readAsText(file);
  };

  const colors = [
    { name: 'أزرق كلاسيكي', value: 'blue', class: 'bg-blue-600' },
    { name: 'رمادي احترافي', value: 'slate', class: 'bg-slate-800' },
    { name: 'زمردي', value: 'emerald', class: 'bg-emerald-600' },
    { name: 'بنفسجي', value: 'purple', class: 'bg-purple-600' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-4 transition-colors">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">تخصيص القالب والمظهر</h2>
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="text-xs px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium"
        >
          {darkMode ? '☀️ النهاري' : '🌙 الوضع الداكن'}
        </button>
      </div>

      {/* تبديل اللغة والاتجاه */}
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">لغة السيرة الذاتية / الاتجاه</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLanguage('ar')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              language === 'ar'
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            العربية (RTL)
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              language === 'en'
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            English (LTR)
          </button>
        </div>
      </div>

      {/* اختيار القالب */}
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">اختر القالب (Template)</label>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => setTemplate('classic')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              template === 'classic'
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            كلاسيكي
          </button>
          <button
            type="button"
            onClick={() => setTemplate('modern')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              template === 'modern'
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            عصري
          </button>
          <button
            type="button"
            onClick={() => setTemplate('minimal')}
            className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all ${
              template === 'minimal'
                ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            بسيط
          </button>
        </div>
      </div>

      {/* اختيار اللون الأساسي */}
      <div>
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-2">لون العناوين والأيقونات</label>
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

      {/* أزرار تصدير واستيراد JSON */}
      <div className="border-t dark:border-gray-700 pt-4 space-y-2">
        <label className="block text-xs font-medium text-gray-700 dark:text-gray-300">إدارة البيانات (JSON)</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleExportJSON}
            className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1.5 rounded-lg text-xs font-medium transition-all"
          >
            تصدير كملف 💾
          </button>
          <label className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-1.5 rounded-lg text-xs font-medium text-center cursor-pointer transition-all">
            استيراد ملف 📂
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
};