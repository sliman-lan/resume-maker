'use client';

import React, { useState } from 'react';
import { useResumeStore } from '../store/useResumeStore'; // أو المسار النسبي ../store/useResumeStore

export const SkillsForm = () => {
  const { resumeData, setSkills } = useResumeStore();
  const { skills } = resumeData;
  const [inputSkill, setInputSkill] = useState('');

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputSkill.trim()) return;

    if (!skills.includes(inputSkill.trim())) {
      setSkills([...skills, inputSkill.trim()]);
    }
    setInputSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">المهارات والتقنيات</h2>

      {/* الشارات المضافة حالياً */}
      <div className="flex flex-wrap gap-2 mb-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-50 text-blue-700 text-xs px-3 py-1.5 rounded-full font-medium flex items-center gap-2 border border-blue-100"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleRemoveSkill(skill)}
              className="text-blue-500 hover:text-red-500 font-bold focus:outline-none"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* حقل الإضافة */}
      <form onSubmit={handleAddSkill} className="flex gap-2">
        <input
          type="text"
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="مثال: React.js, Tailwind CSS..."
        />
        <button
          type="submit"
          className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
        >
          إضافة
        </button>
      </form>
    </div>
  );
};