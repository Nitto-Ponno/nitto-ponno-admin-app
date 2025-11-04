'use client';

import React, { Activity, memo, useState } from 'react';
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
import {
  Eye,
  EyeClosedIcon,
  Lock,
  Mail,
  Phone,
  User,
  UserPlus,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { TSignupUser } from '@/types';
import { useSignupUserMutation } from '@/redux/api/auth/auth-api';
import VerificationSentCard from './verification-sent-card';
import { cn } from '@/lib/utils';

//  Zod Schema (matches TSignupUser)
export const signupFormSchema = z
  .object({
    name: z.object({
      firstName: z
        .string()
        .trim()
        .min(2, { error: 'First name must be at least 2 characters.' }),
      middleName: z.string().trim().optional(),
      lastName: z
        .string()
        .trim()
        .min(2, { error: 'Last name must be at least 2 characters.' }),
    }),

    email: z.email({ error: 'Please enter a valid email address.' }),

    phoneNumber: z
      .string()
      .trim()
      .regex(/^[0-9]+$/, { error: 'Phone number must contain only numbers' })
      .min(5, { error: 'Phone number must be at least 5 digits long' }),

    password: z
      .string()
      .min(8, { error: 'Password must be at least 8 characters long.' })
      .regex(/[A-Z]/, {
        error: 'Must contain at least one uppercase letter.',
      })
      .regex(/[a-z]/, {
        error: 'Must contain at least one lowercase letter.',
      })
      .regex(/[0-9]/, { error: 'Must contain at least one number.' })
      .regex(/[^A-Za-z0-9]/, {
        error: 'Must contain at least one special character.',
      }),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

//  Component
const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isVerificationSent, setIsVerificationSent] = useState(false);

  const [signUp] = useSignupUserMutation();

  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: {
        firstName: '',
        middleName: '',
        lastName: '',
      },
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (values: z.infer<typeof signupFormSchema>) => {
    const formattedData: TSignupUser = {
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      name: {
        firstName: values.name.firstName,
        middleName: values.name.middleName || '',
        lastName: values.name.lastName,
      },
    };

    const res = await signUp(formattedData);

    console.log(res);

    if (res.data.success) {
      //
      setIsVerificationSent(true);
    }
  };

  return (
    <>
      <div className={cn(!isVerificationSent ? 'visible' : 'hidden')}>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="text-sidebar-foreground space-y-6 rounded-lg border p-6"
          >
            <div className="text-center text-black">
              <p className="text-3xl font-bold">Sign Up</p>
              <p className="text-sm">
                Create an account by signing up with your email and password
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3">
              {/* First Name */}
              <FormField
                control={form.control}
                name="name.firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter first name"
                        {...field}
                        prefix={
                          <User className="text-sidebar-foreground size-4" />
                        }
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Middle Name */}
              <FormField
                control={form.control}
                name="name.middleName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Middle Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter middle name"
                        {...field}
                        prefix={
                          <User className="text-sidebar-foreground size-4" />
                        }
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Last Name */}
              <FormField
                control={form.control}
                name="name.lastName"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2 lg:col-span-1">
                    <FormLabel>
                      Last Name <span className="text-destructive">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter last name"
                        {...field}
                        prefix={
                          <User className="text-sidebar-foreground size-4" />
                        }
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Write your email"
                      {...field}
                      prefix={
                        <Mail className="text-sidebar-foreground size-4" />
                      }
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Phone Number <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      {...field}
                      prefix={
                        <Phone className="text-sidebar-foreground size-4" />
                      }
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
                  <FormLabel>
                    Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Enter your password"
                      {...field}
                      prefix={
                        <Lock className="text-sidebar-foreground size-4" />
                      }
                      suffix={
                        <span
                          onClick={() =>
                            setIsPasswordVisible(!isPasswordVisible)
                          }
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
                  <FormLabel>
                    Confirm Password <span className="text-destructive">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type={isConfirmPasswordVisible ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      {...field}
                      prefix={
                        <Lock className="text-sidebar-foreground size-4" />
                      }
                      suffix={
                        <span
                          onClick={() =>
                            setIsConfirmPasswordVisible(
                              !isConfirmPasswordVisible,
                            )
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
                      className="h-12"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <div className="space-y-3">
              <Button type="submit" size="xl" className="w-full font-bold">
                <UserPlus />
                Register
              </Button>

              <Separator className="font-bold" classNameForChildren="text-xs">
                OR
              </Separator>

              <Button
                type="button"
                size="xl"
                className="w-full font-bold"
                variant="tertiary"
              >
                <GoogleIcon />
                Sign Up With Google
              </Button>
            </div>

            <div className="flex justify-center gap-3 text-sm">
              Already have an account?
              <Link
                href="/auth/login"
                className="hover:text-chart-2 font-semibold text-black hover:underline"
              >
                Login
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className={cn(isVerificationSent ? 'visible' : 'hidden')}>
        <VerificationSentCard />
      </div>
    </>
  );
};

export default memo(SignupForm);
