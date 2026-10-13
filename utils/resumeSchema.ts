import { z } from 'zod';

export const resumeSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(2, 'الاسم الكامل مطلوب'),
    email: z.string().email('البريد الإلكتروني غير صالح'),
    phone: z.string().min(8, 'رقم الهاتف مطلوب'),
    location: z.string().min(2, 'المدينة/الدولة مطلوبة'),
    website: z.string().url('رابط غير صالح').optional().or(z.literal('')),
    summary: z.string().max(500, 'النزهة المختصرة يجب أن تكون أقصى حد 500 حرف').optional(),
  }),
  experience: z.array(
    z.object({
      id: z.string(),
      company: z.string().min(1, 'اسم الشركة مطلوب'),
      position: z.string().min(1, 'المسمى الوظيفي مطلوب'),
      startDate: z.string().min(1, 'تاريخ البداية مطلوب'),
      endDate: z.string().optional(),
      current: z.boolean(),
      description: z.string().optional(),
    })
  ),
  education: z.array(
    z.object({
      id: z.string(),
      institution: z.string().min(1, 'اسم المؤسسة/الجامعة مطلوب'),
      degree: z.string().min(1, 'الدرجة العلمية مطلوبة'),
      graduationDate: z.string().min(1, 'تاريخ التخرج مطلوب'),
    })
  ),
  skills: z.array(z.string()),
});