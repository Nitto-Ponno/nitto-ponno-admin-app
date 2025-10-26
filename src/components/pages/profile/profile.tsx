'use client';

import React, { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface ProfileFormData {
  fullName: string;
  email: string;
  mobileNumber: string;
  address: string;
}

const Profile = () => {
  const [imagePreview, setImagePreview] = useState<string>('');

  const form = useForm<ProfileFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      address: '',
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (data: ProfileFormData) => {
    // console.log('Profile updated:', { ...data, imagePreview });
    // Handle profile update logic here
  };

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            Your Profile
          </h1>
          <p className="text-muted-foreground text-lg">
            Update your personal information
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Profile Image Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-6">
                <div className="group relative">
                  <Avatar className="border-primary/20 h-32 w-32 border-4">
                    <AvatarImage
                      src={imagePreview || '/placeholder.svg'}
                      alt="Profile"
                    />
                    <AvatarFallback className="bg-secondary text-2xl">
                      {form.watch('fullName')
                        ? form
                            .watch('fullName')
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()
                            .slice(0, 2)
                        : 'UN'}
                    </AvatarFallback>
                  </Avatar>

                  {/* Hover overlay with camera icon */}
                  <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Camera className="h-8 w-8 text-white" />
                  </div>

                  {/* Hidden input (still clickable via full overlay) */}
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your full name"
                          {...field}
                          className="h-12"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mobileNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your mobile number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-fit font-bold">
                Save Profile
              </Button>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default memo(Profile);
