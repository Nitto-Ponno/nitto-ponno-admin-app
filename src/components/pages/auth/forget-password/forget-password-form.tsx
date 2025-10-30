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
import { Mail, RotateCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

// Forget PasswordForm Form Schema (Zod)
// ===========================
export const forgetPasswordFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
});

/* ---------------- Component ---------------- */
const ForgetPasswordForm = () => {
  const form = useForm<z.infer<typeof forgetPasswordFormSchema>>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof forgetPasswordFormSchema>) => {
    // console.log(values)
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-sidebar-foreground space-y-6 rounded-lg border p-6"
      >
        <div className="text-center text-black">
          <p className="text-3xl font-bold">Forget Password</p>
          <p className="text-sm">Reset Your Password</p>
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Write your register email"
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

        <div className="flex justify-end">
          <Link
            href={'/auth/login'}
            className="hover:text-chart-2 text-left text-sm hover:underline"
          >
            Login?
          </Link>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <Button type="submit" size={'xl'} className="w-full font-bold">
            <RotateCw />
            Recover password
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
            Signup With Google
          </Button>
        </div>

        <div className="flex justify-center gap-3 text-sm">
          Don&apos;t have an account?
          <Link
            href={'/auth/signup'}
            className="hover:text-chart-2 font-semibold text-black hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default memo(ForgetPasswordForm);
