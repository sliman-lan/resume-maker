import { create } from 'zustand';
import { ResumeData, ExperienceItem, EducationItem, PersonalInfo } from '@/types/resume';

interface ResumeStore {
  resumeData: ResumeData;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  addExperience: (item: ExperienceItem) => void;
  removeExperience: (id: string) => void;
  addEducation: (item: EducationItem) => void;
  removeEducation: (id: string) => void;
  setSkills: (skills: string[]) => void;
}

const initialData: ResumeData = {
  personalInfo: {
    fullName: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+963 900 000 000',
    location: 'دمشق، سوريا',
    website: 'https://github.com',
    summary: 'مطور واجهات أمامية (Frontend Developer) شغوف ببناء تطبيقات ويب تفاعلية وسريعة باستخدام Next.js و React.',
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
  skills: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Git & GitHub', 'JavaScript'],
};

export const useResumeStore = create<ResumeStore>((set) => ({
  resumeData: initialData,
  
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

  setSkills: (skills) =>
    set((state) => ({
      resumeData: {
        ...state.resumeData,
        skills,
      },
    })),
}));