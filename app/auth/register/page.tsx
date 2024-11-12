'use client';

import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useRouter} from 'next/navigation';
import {Box, Button, Flex, Heading, Text} from '@radix-ui/themes';

import {EyeClosedIcon, EyeOpenIcon} from '@radix-ui/react-icons';
import WebsiteBackgroundColor from '@/components/WebsiteBackgroundColor';

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  image: FileList;
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  // State variable for image preview
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegistrationFormData>();

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('password', data.password);
      formData.append('image', data.image[0]);

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        router.push('/auth/signin');
      } else {
        const errorData = await res.json();
        setError('email', { message: errorData.error });
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <Flex as="div" align="center" justify="center" className="min-h-screen">
      <WebsiteBackgroundColor />
      <Box className="shadow-md rounded-lg p-8 w-full max-w-md bg-gray-900">
        <Heading
          as="h2"
          size="4"
          className="text-2xl font-semibold text-blue-500 mb-6 text-center"
        >
          Create an Account
        </Heading>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Name Field */}
          <Flex as="div" direction="column" gap="2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-200">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <input
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  className="block w-full border rounded-md shadow-sm p-2 bg-gray-700 text-white focus:outline-none focus:ring-primary focus:border-primary"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <Text as="p" className="text-red-500 mt-2">
                {errors.name.message}
              </Text>
            )}
          </Flex>

          {/* Email Field */}
          <Flex as="div" direction="column" gap="2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Email is required',
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
              }}
              render={({ field }) => (
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="block w-full border rounded-md shadow-sm p-2 bg-gray-700 text-white focus:outline-none focus:ring-primary focus:border-primary"
                  {...field}
                />
              )}
            />
            {errors.email && (
              <Text as="p" className="text-red-500 mt-2">
                {errors.email.message}
              </Text>
            )}
          </Flex>

          {/* Password Field */}
          <Flex as="div" direction="column" gap="2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <Flex as="div" className="relative">
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field }) => (
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Your Password"
                    className="block w-full border rounded-md shadow-sm p-2 bg-gray-700 text-white focus:outline-none focus:ring-primary focus:border-primary pr-10"
                    {...field}
                  />
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400"
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            </Flex>
            {errors.password && (
              <Text as="p" className="text-red-500 mt-2">
                {errors.password.message}
              </Text>
            )}
          </Flex>

          {/* Profile Image Upload Field */}
          <Flex as="div" direction="column" gap="2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-200">
              Profile Image
            </label>
            <Controller
              control={control}
              name="image"
              rules={{ required: 'Profile image is required' }}
              render={({ field }) => (
                <>
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files && files.length > 0) {
                        const file = files[0];
                        field.onChange(files);

                        // Generate image preview
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result as string);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="mt-1 block w-full text-white"
                  />
                  {/* Display Image Preview */}
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Image Preview"
                      className="mt-4 w-32 h-32 object-cover rounded-full mx-auto"
                    />
                  )}
                </>
              )}
            />
            {errors.image && (
              <Text as="p" className="text-red-500 mt-2">
                {errors.image.message}
              </Text>
            )}
          </Flex>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="solid"
            disabled={isSubmitting}
            className="w-full py-2 rounded-md text-white bg-primary hover:bg-primaryDark transition-colors duration-300"
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </Button>

          {/* Sign In Link */}
          <Text as="p" className="text-center text-gray-200 mt-4">
            Already have an account?{' '}
            <a href="/auth/signin" className="text-primary hover:underline">
              Sign In
            </a>
          </Text>
        </form>
      </Box>
    </Flex>
  );
}
