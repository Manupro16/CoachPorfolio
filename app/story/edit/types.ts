import { InferType } from 'yup';
import createConditionalSchema from '@/app/story/edit/validationSchemas/validationSchema';

export type BaseCareerFields = InferType<ReturnType<typeof createConditionalSchema>>;

export type CareerFields = BaseCareerFields & {
  image: BaseCareerFields['image'] & {
    previewUrl?: string;
  };
};