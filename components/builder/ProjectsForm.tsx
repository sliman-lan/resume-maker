'use client';

import React, { useState } from 'react';
import { useResumeStore, ProjectItem } from '../store/useResumeStore';

export const ProjectsForm = () => {
  const { resumeData, addProject, removeProject } = useResumeStore();
  const projects = resumeData.projects || [];

  const [newProject, setNewProject] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    techStack: '',
    githubLink: '',
    liveLink: '',
    description: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title) return;

    const item: ProjectItem = {
      id: Date.now().toString(),
      ...newProject,
    };

    addProject(item);

    setNewProject({
      title: '',
      techStack: '',
      githubLink: '',
      liveLink: '',
      description: '',
    });
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
      <h2 className="text-xl font-bold text-gray-800">المشاريع البرمجية (Projects)</h2>

      {/* قائمة المشاريع المضافة */}
      <div className="space-y-3">
        {projects.map((proj) => (
          <div key={proj.id} className="flex justify-between items-center p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm">
            <div>
              <span className="font-bold text-gray-800">{proj.title}</span>
              {proj.techStack && <span className="text-xs text-gray-500 block">{proj.techStack}</span>}
            </div>
            <button
              type="button"
              onClick={() => removeProject(proj.id)}
              className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 bg-red-50 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {/* نموذج إضافة مشروع */}
      <form onSubmit={handleAdd} className="space-y-4 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700">إضافة مشروع جديد</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">اسم المشروع</label>
            <input
              type="text"
              name="title"
              value={newProject.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: E-Commerce Web App"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">التقنيات المستخدمة</label>
            <input
              type="text"
              name="techStack"
              value={newProject.techStack}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Next.js, Tailwind, Supabase"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">رابط GitHub</label>
            <input
              type="text"
              name="githubLink"
              value={newProject.githubLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://github.com/user/project"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">رابط المعاينة المباشرة (Live Demo)</label>
            <input
              type="text"
              name="liveLink"
              value={newProject.liveLink}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://myproject.vercel.app"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-medium text-gray-700 mb-1">وصف المشروع والإنجازات</label>
            <textarea
              name="description"
              rows={2}
              value={newProject.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="تطوير تطبيق متكامل مع دعم الدفع الإلكتروني وحفظ البيانات..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg text-sm font-medium transition-all"
        >
          + إضافة المشروع
        </button>
      </form>
    </div>
  );
};