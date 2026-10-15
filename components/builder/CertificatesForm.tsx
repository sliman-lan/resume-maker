'use client';

import React, { useState } from 'react';
import { useResumeStore, CertificateItem } from '../store/useResumeStore';

export const CertificatesForm = () => {
  const { resumeData, addCertificate, removeCertificate } = useResumeStore();
  const certificates = resumeData.certificates || [];

  const [newCert, setNewCert] = useState<Omit<CertificateItem, 'id'>>({
    title: '',
    issuer: '',
    date: '',
    link: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewCert((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.title || !newCert.issuer) return;

    const item: CertificateItem = {
      id: Date.now().toString(),
      ...newCert,
    };

    addCertificate(item);
    setNewCert({ title: '', issuer: '', date: '', link: '' });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6 transition-colors">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white">الشهادات والدورات (Certificates)</h2>

      <div className="space-y-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-lg text-sm">
            <div>
              <span className="font-bold text-gray-800 dark:text-gray-200">{cert.title}</span> - <span className="text-blue-600 dark:text-blue-400">{cert.issuer}</span>
            </div>
            <button
              type="button"
              onClick={() => removeCertificate(cert.id)}
              className="text-red-500 hover:text-red-700 font-medium text-xs px-2 py-1 bg-red-50 dark:bg-red-900/30 rounded"
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleAdd} className="space-y-4 border-t dark:border-gray-700 pt-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">إضافة شهادة جديدة</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">اسم الشهادة / الدورة</label>
            <input
              type="text"
              name="title"
              value={newCert.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: Advanced React"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">الجهة المانحة</label>
            <input
              type="text"
              name="issuer"
              value={newCert.issuer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="مثال: Udemy / Coursera"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">سنة الحصول عليها</label>
            <input
              type="text"
              name="date"
              value={newCert.date}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="2024"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">رابط الشهادة (اختياري)</label>
            <input
              type="text"
              name="link"
              value={newCert.link}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-transparent dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://credly.com/..."
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white py-2 rounded-lg text-sm font-medium transition-all"
        >
          + إضافة الشهادة
        </button>
      </form>
    </div>
  );
};