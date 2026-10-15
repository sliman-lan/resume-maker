import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { ResumeData, ExperienceItem, EducationItem, PersonalInfo } from '@/types/resume';

export interface ProjectItem {
  id: string;
  title: string;
  techStack: string;
  githubLink?: string;
  liveLink?: string;
  description: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  link?: string;
}

interface ResumeStore {
  resumeData: ResumeData & { projects: ProjectItem[]; certificates: CertificateItem[] };
  template: 'classic' | 'modern' | 'minimal';
  accentColor: string;
  language: 'ar' | 'en';
  setTemplate: (template: 'classic' | 'modern' | 'minimal') => void;
  setAccentColor: (color: string) => void;
  setLanguage: (lang: 'ar' | 'en') => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (item: ExperienceItem) => void;
  removeExperience: (id: string) => void;
  addEducation: (item: EducationItem) => void;
  removeEducation: (id: string) => void;
  addProject: (item: ProjectItem) => void;
  removeProject: (id: string) => void;
  addCertificate: (item: CertificateItem) => void;
  removeCertificate: (id: string) => void;
  setSkills: (skills: string[]) => void;
}

const initialData = {
  personalInfo: {
    fullName: 'اسمك الكامل',
    email: 'email@example.com',
    phone: '+963 000 000 000',
    location: 'المدينة، الدولة',
    website: 'https://github.com',
    summary: 'اكتب نبذة مهنية عامة هنا...',
  },
  experience: [
    {
      id: '1',
      company: 'اسم الشركة',
      position: 'المسمى الوظيفي',
      startDate: '2024-01',
      endDate: 'Present',
      current: true,
      description: 'وصف المهام والخبرات...',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'اسم الجامعة أو المعهد',
      degree: 'الدرجة العلمية',
      graduationDate: '2024',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'اسم المشروع',
      techStack: 'React, Next.js',
      githubLink: 'https://github.com',
      liveLink: '',
      description: 'وصف موجز للمشروع...',
    },
  ],
  certificates: [
    {
      id: '1',
      title: 'اسم الشهادة',
      issuer: 'الجهة المانحة',
      date: '2024',
    },
  ],
  skills: ['JavaScript', 'React.js', 'Next.js', 'Tailwind CSS'],
};
export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resumeData: initialData,
      template: 'classic',
      accentColor: 'blue',
      language: 'ar',

      setTemplate: (template) => set({ template }),
      setAccentColor: (accentColor) => set({ accentColor }),
      setLanguage: (language) => set({ language }),

      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info },
          },
        })),

      addExperience: (item) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, item],
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: (item) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, item],
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      addProject: (item) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...(state.resumeData.projects || []), item],
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: (state.resumeData.projects || []).filter((proj) => proj.id !== id),
          },
        })),

      addCertificate: (item) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certificates: [...(state.resumeData.certificates || []), item],
          },
        })),

      removeCertificate: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            certificates: (state.resumeData.certificates || []).filter((cert) => cert.id !== id),
          },
        })),

      setSkills: (skills) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            skills,
          },
        })),
    }),
    {
      name: 'resume-builder-storage',
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : sessionStorage)),
    }
  )
);