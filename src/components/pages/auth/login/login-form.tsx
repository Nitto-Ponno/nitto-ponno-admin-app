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
import Cookies from 'js-cookie';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import GoogleIcon from '@/components/shared/svg/google-Icon';
import { Eye, EyeClosedIcon, Lock, LogIn, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useLoginUserMutation } from '@/redux/api/auth/auth-api';
import { toast } from 'sonner';
import { useAppDispatch } from '@/redux/hook';
import { setUser } from '@/redux/features/auth/authReducer';
import { useRouter } from 'next/navigation';

// Login Form Schema (Zod)
// ===========================
export const loginFormSchema = z.object({
  email: z.email({ message: 'Please enter a valid email address.' }),
  password: z.string(),
});

/* ---------------- Props ---------------- */

/* ---------------- Component ---------------- */
const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [login] = useLoginUserMutation();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: 'user@example.com',
      password: 'password123',
    },
  });

  const handleSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    const res = await login(values);
    console.log({ res });

    if (res.data.data) {
      //
      dispatch(setUser(res.data.data));

      toast.success(res.data.message);
      router.push('/');
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="text-sidebar-foreground space-y-6 rounded-lg border p-6"
      >
        <div className="text-center text-black">
          <p className="text-3xl font-bold">Login</p>
          <p className="text-sm">Login with your email and password</p>
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
                  placeholder="Write your email"
                  type="email"
                  defaultValue={'user@example.com'}
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
                  defaultValue="password123"
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

        <div className="flex justify-end">
          <Link
            href={'/auth/forget-password'}
            className="hover:text-chart-2 text-left text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <div className="space-y-3">
          <Button type="submit" size={'xl'} className="w-full font-bold">
            <LogIn />
            Login
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
            Login With Google
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

export default memo(LoginForm);
