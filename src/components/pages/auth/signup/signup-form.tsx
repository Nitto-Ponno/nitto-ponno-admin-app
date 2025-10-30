'use client';

import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import GoogleIcon from '@/components/shared/svg/google-Icon';
import { Eye, EyeClosedIcon, Lock, Mail, User, UserPlus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Signup Form Schema (Zod)
// ===========================
export const signupFormSchema = z
  .object({
    // Full name validation
    fullName: z.string().trim().min(2, {
      message: 'Full name must be at least 2 characters.',
    }),

    // Email validation
    email: z.email({ message: 'Please enter a valid email address.' }),

    // Strong password validation rules
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^A-Za-z0-9]/, {
        message: 'Password must contain at least one special character.',
      }),

    // Confirm password (must match password)
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

/* ---------------- Component ---------------- */
const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof signupFormSchema>) => {
    // console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-sidebar-foreground space-y-6 rounded-lg border p-6"
      >
        <div className="text-center text-black">
          <p className="text-3xl font-bold">Sign Up</p>
          <p className="text-sm">
            Create an account by sign up with provider or email, password
          </p>
        </div>
        {/* Full Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your full name"
                  {...field}
                  prefix={<User className="text-sidebar-foreground size-4" />}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your email"
                  type="email"
                  {...field}
                  prefix={<Mail className="text-sidebar-foreground size-4" />}
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  {...field}
                  prefix={<Lock className="text-sidebar-foreground size-4" />}
                  suffix={
                    <span
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="cursor-pointer"
                    >
                      {isPasswordVisible ? (
                        <Eye className="text-sidebar-foreground size-4" />
                      ) : (
                        <EyeClosedIcon className="text-sidebar-foreground size-4" />
                      )}
                    </span>
                  }
                  className="h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirm Password */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password again"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  {...field}
                  prefix={<Lock className="text-sidebar-foreground size-4" />}
                  className="h-12"
                  suffix={
                    <span
                      onClick={() =>
                        setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                      }
                      className="cursor-pointer"
                    >
                      {isConfirmPasswordVisible ? (
                        <Eye className="text-sidebar-foreground size-4" />
                      ) : (
                        <EyeClosedIcon className="text-sidebar-foreground size-4" />
                      )}
                    </span>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Link
            href={'/auth/login'}
            className="hover:text-chart-2 text-left text-sm hover:underline"
          >
            Already have account?
          </Link>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <Button type="submit" size={'xl'} className="w-full font-bold">
            <UserPlus />
            Register
          </Button>
          <Separator
            className="font-bold text-red-500"
            classNameForChildren=" text-xs"
          >
            OR
          </Separator>
          <Button
            type="submit"
            size={'xl'}
            className="w-full font-bold"
            variant={'tertiary'}
          >
            <GoogleIcon />
            Sign Up With Google
          </Button>
        </div>

        <div className="flex justify-center gap-3 text-sm">
          Already have account?
          <Link
            href={'/auth/login'}
            className="hover:text-chart-2 font-semibold text-black hover:underline"
          >
            Login
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default memo(SignupForm);
