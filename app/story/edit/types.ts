import { InferType } from 'yup';
import createConditionalSchema from '@/app/story/edit/validationSchemas/validationSchema';
import { EarlyLife, PlayerCareer, CoachingCareer} from "@prisma/client";

export type BaseCareerFields = InferType<ReturnType<typeof createConditionalSchema>>;

export type CareerFields = BaseCareerFields & {
  image: BaseCareerFields['image'] & {
    previewUrl?: string;
  };
};

export type ApiTypesCalls = EarlyLife | PlayerCareer | CoachingCareer;