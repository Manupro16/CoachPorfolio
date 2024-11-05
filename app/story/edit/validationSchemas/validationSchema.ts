// validationSchemas.ts
import * as yup from 'yup';

// Utility to conditionally require fields based on form mode
const createConditionalSchema = (isEditMode: boolean) => yup.object({
    title: yup.string()
              .required('Title is required')
              .min(6, 'Title must be at least 6 characters long'),
    date: yup.string()
             .required('Date is required')
             .test('is-valid-date', 'Invalid date format', (value) => !isNaN(Date.parse(value || ''))),
    content: yup.string()
                .required('Content is required')
                .min(8, 'Content must be at least 8 characters long'),
    image: yup.object({
        source: yup.string().oneOf(['URL', 'UPLOAD']).required('Image source is required'),
        url: yup.string().when('source', {
            is: 'URL',
            then: schema => !isEditMode
                ? schema.required('Image URL is required').url('Invalid URL')
                : schema.url('Invalid URL'),
            otherwise: schema => schema.notRequired()
        }),
        file: yup.array().of(yup.mixed<File>()).when('source', {
            is: 'UPLOAD',
            then: schema => !isEditMode
                ? schema
                    .required('Image file is required')
                    .test('fileExists', 'Image file is required', (value) => value && value.length > 0)
                    .test('fileType', 'Unsupported file type', (value) => {
                        if (!value || !value[0]) return false;
                        const file = value[0];
                        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                        return allowedTypes.includes(file.type);
                    })
                    .test('fileSize', 'File size exceeds 5 MB', (value) => {
                        if (!value || !value[0]) return false;
                        const file = value[0];
                        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
                        return file.size <= maxSizeInBytes;
                    })
                : schema
                    .nullable() // Allow null or undefined
                    .test('fileExists', 'No image file selected', (value) => {
                        if (!value || value.length === 0) return true; // No file selected is ok in edit mode
                        return true;
                    })
                    .test('fileType', 'Unsupported file type', (value) => {
                        if (!value || value.length === 0) return true; // No file selected is ok in edit mode
                        const file = value[0];
                        if (!file) return true; // Handle case where file is undefined
                        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
                        return allowedTypes.includes(file.type);
                    })
                    .test('fileSize', 'File size exceeds 5 MB', (value) => {
                        if (!value || value.length === 0) return true; // No file selected is ok in edit mode
                        const file = value[0];
                        if (!file) return true; // Handle case where file is undefined
                        const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB
                        return file.size <= maxSizeInBytes;
                    }),
            otherwise: schema => schema.notRequired()
        }),
    }).required(),
});

export default createConditionalSchema;