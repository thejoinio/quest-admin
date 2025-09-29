"use client";

import React from 'react'

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
// import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';
import Link from 'next/link';
import { useCreateAmbassador } from '@/services/hooks/useAdminHomeManagement';

const formSchema = z.object({
  fullName: z.string()
    .min(3, { message: "Please enter your full name." }),
  email: z.email({ message: "Please enter a valid email address" }),
});

export default function Page() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });


  const { mutate: createAmbassador, isPending } = useCreateAmbassador();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAmbassador(
      {
        email: values.email,
        name: values.fullName,
        role: "ambassador"
      },
      {
        onSuccess: () => {
          form.reset();

          form.setValue("fullName", '');
          form.setValue("email", '');
        }
      }
    );
  }

  return (
    <Card className="bg-[#171717] text-white border-none shadow-lg min-w-[250px] max-w-[844px] p-[40px 32px] mx-auto">
      <CardHeader>
        <div className='flex justify-between items-center gap-5'>
          <CardTitle className="text-lg">Create Ambassadors User</CardTitle>

          <Link href={"/dashboard"}>
            <X />
          </Link>
        </div>
      </CardHeader>

      <CardContent>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email Address */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size={"lg"} variant={"gradient"} className="w-full"
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Create User"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
