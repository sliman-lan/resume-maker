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

interface ResumeStore {
  resumeData: ResumeData & { projects: ProjectItem[] };
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
  setSkills: (skills: string[]) => void;
}

const initialData = {
  personalInfo: {
    fullName: 'ريم علي',
    email: 'reemali250@gmail.com',
    phone: '+963 930 059 465',
    location: 'اللاذقية، سوريا',
    website: 'https://github.com',
    summary: 'مطور واجهات أمامية Frontend Developer شغوف ببناء تطبيقات ويب تفاعلية وسريعة باستخدام Next.js و React.',
  },
  experience: [
    {
      id: '1',
      company: 'شركة التقنية المتقدمة',
      position: 'مطور Frontend',
      startDate: '2023-04',
      endDate: 'Present',
      current: true,
      description: 'تطوير واجهات المستخدم باستخدام React و Next.js مع ربطها بالـ APIs المختلفة.',
    },
  ],
  education: [
    {
      id: '1',
      institution: 'جامعة تشرين',
      degree: 'بكالوريوس في هندسة علوم الحاسوب',
      graduationDate: '2023',
    },
  ],
  projects: [
    {
      id: '1',
      title: 'Resume & Portfolio Builder',
      techStack: 'Next.js, TypeScript, Zustand, Tailwind CSS',
      githubLink: 'https://github.com',
      liveLink: 'https://resume-maker.vercel.app',
      description: 'منصة تفاعلية لإنشاء وتصدير السيرة الذاتية مع معاينة حية وتصدير PDF بدون مكتبات ثقيلة.',
    },
  ],
  skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git & GitHub', 'JavaScript'],
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
      storage: createJSONStorage(() => (typeof window !== 'undefined' ? localStorage : sessionStorage)), // 🛡️ حماية الـ SSR من الوصول للـ LocalStorage
    }
  )
);