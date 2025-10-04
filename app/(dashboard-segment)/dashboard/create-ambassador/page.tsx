"use client";

import React, { useEffect, useState } from 'react'

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
import { getCountries, getCountryNameByCca2 } from '@/lib/location';
import { restCountries } from '@/lib/countries';

const formSchema = z.object({
  fullName: z.string()
    .min(3, { message: "Please enter the full name." }),
  username: z.string()
    .min(3, { message: "Please enter the username." }),
  email: z.email({ message: "Please enter a valid email address" }),
  country: z.string().nonempty()
});

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [countries, setCountries] = useState(restCountries);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      username: "",
      country: ""
    },
  });


  const { mutate: createAmbassador, isPending } = useCreateAmbassador();

  function onSubmit(values: z.infer<typeof formSchema>) {
    createAmbassador(
      {
        email: values.email,
        name: values.fullName,
        username: values.username,
        role: "ambassador",
        country: values.country
      },
      {
        onSuccess: () => {
          form.reset();
          form.setValue("fullName", '');
          form.setValue("email", '');
          form.setValue("username", '');
        }
      }
    );
  }

  useEffect(() => {
    getCountries().then((res) => setCountries(res));
  }, []);

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
                    <Input placeholder="Enter the ambassador's full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the ambassador's username" {...field} />
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
                    <Input placeholder="Enter the ambassador's email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => {
            const handleSelect = (value: string) => {
              field.onChange(value);
              setSelected(value);
              setIsOpen(false);
            };

            return (
              <FormItem className="relative">
                <FormLabel className="text-sm font-medium">Country</FormLabel>
                <FormControl>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setIsOpen((prev: boolean) => !prev)}
                      className="w-full rounded-md border bg-transparent border-[#8AE5CF] px-4 py-4 text-left text-sm text-gray-400 shadow-sm focus:outline-none focus:ring-1"
                    >
                      {getCountryNameByCca2(selected, countries) ||
                        "Select your country"}
                      <span className="absolute right-3 top-4.5 text-gray-500">
                        ▼
                      </span>
                    </button>
                    {isOpen && (
                      <ul className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border-0.5 border-[#8AE5CF] bg-gray-500 shadow-lg">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {countries.map((country: any) => (
                          <li
                            key={country.cca3}
                            onClick={() => handleSelect(country.cca2)}
                            className={`cursor-pointer px-4 py-2 text-sm hover:bg-primary/50 ${
                              selected === country.cca2
                                ? "bg-blue-300 font-medium"
                                : ""
                            }`}
                          >
                            {country.name.common}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
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
