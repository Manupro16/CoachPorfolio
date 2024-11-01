import { InferType } from 'yup';
import { validationSchema } from '@/app/story/edit/validationSchemas/validationSchema';

export type CareerFields = BaseCareerFields & {
  image: BaseCareerFields['image'] & {
    previewUrl?: string;
  };
};




type BaseCareerFields = InferType<typeof validationSchema>;
