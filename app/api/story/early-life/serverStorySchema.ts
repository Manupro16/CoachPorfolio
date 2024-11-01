// src/shared/storySchema.ts

import * as yup from 'yup';

export const serverStorySchema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string().required('Content is required'),
  date: yup.string().optional(),
  imageSource: yup
    .string()
    .oneOf(['URL', 'UPLOAD'], 'Invalid image source')
    .required('Image source is required'),
  imageUrl: yup
    .string()
    .url('Invalid image URL')
    .when('imageSource', (imageSource, schema) => {
      if (imageSource.toString() === 'URL') {
        return schema.required('Image URL is required when image source is URL');
      }
      return schema.notRequired();
    }),
  imageData: yup
    .mixed<Buffer>()
    .test('is-buffer', 'Invalid image data', (value) => value instanceof Buffer || value === undefined)
    .when('imageSource', (imageSource, schema) => {
      if (imageSource.toString() === 'UPLOAD') {
        return schema.required('Image data is required when image source is UPLOAD');
      }
      return schema.notRequired();
    }),
  imageType: yup
    .string()
    .when('imageSource', (imageSource, schema) => {
      if (imageSource.toString() === 'UPLOAD') {
        return schema.required('Image type is required when image source is UPLOAD');
      }
      return schema.notRequired();
    }),
});


