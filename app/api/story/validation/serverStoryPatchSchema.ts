import * as yup from 'yup';

export const playerStoryPatchSchema = yup.object({
  title: yup.string().trim().optional(),
  content: yup.string().trim().optional(),
  date: yup.string().trim().optional(),
  imageSource: yup
    .string()
    .oneOf(['URL', 'UPLOAD'], 'Invalid image source')
    .optional(),
  imageUrl: yup
    .string()
    .url('Invalid image URL')
    .when('imageSource', (imageSource, schema) => {
      if (imageSource[0] === 'URL') {
        return schema.required('Image URL is required when image source is URL');
      }
      return schema.notRequired();
    }),
  imageData: yup
    .mixed<Buffer>()
    .test('is-buffer', 'Invalid image data', (value) => value instanceof Buffer || value === undefined)
    .when('imageSource', (imageSource, schema) => {
      if (imageSource[0] === 'UPLOAD') {
        return schema.required('Image data is required when image source is UPLOAD');
      }
      return schema.notRequired();
    }),
  imageType: yup
    .string()
    .oneOf(['image/jpeg', 'image/png', 'image/gif'], 'Unsupported image type')
    .when('imageSource', (imageSource, schema) => {
      if (imageSource[0] === 'UPLOAD') {
        return schema.required('Image type is required when image source is UPLOAD');
      }
      return schema.notRequired();
    }),
});