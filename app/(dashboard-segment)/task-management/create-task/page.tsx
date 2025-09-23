"use client";

import React from 'react'
import Link from 'next/link';

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CalendarIcon } from 'lucide-react';
import { useAdminCreateTask } from '@/services/hooks/useAdminHomeManagement';
import { Textarea } from '@/components/ui/textarea';
import DisplayRespondsMessage from '@/components/DisplayResponse';


const formSchema = z.object({
    taskTitle: z.string().trim().nonempty("Task Title is required."),
    taskDescription: z.string().trim().nonempty("Task Description is required."),
    taskType: z.string().trim().nonempty("Task Type is required."),
    taskLink: z.string().trim().nonempty("Task link is required."),
    taskPlatform: z.string().trim().nonempty("Task platform is required."),
    participationCap: z.string().trim().nonempty("Participation Cap is required."),
    // expirationDate: z.string().trim().nonempty("Deadline or expiration date is required."),

    expirationDate: z.date("Deadline or expiration date is required."),

    pointValue: z.string().trim().nonempty("Point value is required."),
    cooldownPeriod: z.string().trim().nonempty("Cooldown period is required."),
    proofRequirement: z.string().trim().nonempty("Proof requirement is required."),
});

export default function Page() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { mutate: createAdminCreateTask, isPending, error, isError } = useAdminCreateTask();

    function onSubmit(values: z.infer<typeof formSchema>) {
        const createTaskPayload = {
            title: values.taskTitle,
            description: values.taskDescription,
            pointsReward: Number(values.pointValue),
            type: values.taskType,
            proofTypeRequirement: {
                link: values.proofRequirement === "link",
                image: values.proofRequirement === "image"
            },
            metadata: {
                link: values.taskLink,
                description: values.taskDescription,
                taskPlatform: values.taskPlatform
            },
            expirationTimestamp: values.expirationDate.toISOString(),
            cooldownPeriodHours: values.cooldownPeriod,
            maxParticipants: values.participationCap,
            // is_active: true,
            // week_id: null, // Week_id can be null
            endDate: values.expirationDate.toISOString() // Week_id can be null
        };
        createAdminCreateTask(
            createTaskPayload,
            {
                onSuccess: () => {
                    form.reset();

                    form.setValue("taskTitle", '');
                    form.setValue("taskDescription", '');
                    form.setValue("taskType", '');
                    form.setValue("taskLink", '');
                    form.setValue("taskPlatform", '');
                    form.setValue("participationCap", '');
                    // form.setValue("expirationDate", '');
                    // form.setValue("expirationDate", '');

                    form.setValue("pointValue", '');
                    form.setValue("cooldownPeriod", '');
                    form.setValue("proofRequirement", '');
                }
            }
        );
    }

    return (
        <Card className="bg-[#171717] text-white border-none shadow-lg min-w-[250px] max-w-[844px] p-[40px 32px] mx-auto">
            <CardHeader>
                <div className='flex items-center gap-3'>
                    <Link href={"/task-management"}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="25" viewBox="0 0 26 25" fill="none">
                            <path d="M13 25C11.2017 25 9.51166 24.6717 7.93 24.015C6.34833 23.3583 4.9725 22.4679 3.8025 21.3437C2.6325 20.2196 1.70647 18.8967 1.0244 17.375C0.342335 15.8533 0.000868312 14.2283 1.64557e-06 12.5C-0.00086502 10.7717 0.340602 9.14666 1.0244 7.625C1.7082 6.10333 2.63423 4.78042 3.8025 3.65625C4.97077 2.53208 6.3466 1.64167 7.93 0.985C9.5134 0.328333 11.2034 0 13 0C14.7966 0 16.4866 0.328333 18.07 0.985C19.6534 1.64167 21.0292 2.53208 22.1975 3.65625C23.3658 4.78042 24.2922 6.10333 24.9769 7.625C25.6616 9.14666 26.0026 10.7717 26 12.5C25.9974 14.2283 25.6559 15.8533 24.9756 17.375C24.2953 18.8967 23.3692 20.2196 22.1975 21.3437C21.0258 22.4679 19.6499 23.3587 18.07 24.0162C16.4901 24.6737 14.8001 25.0017 13 25ZM13 22.5C15.9033 22.5 18.3625 21.5312 20.3775 19.5937C22.3925 17.6562 23.4 15.2917 23.4 12.5C23.4 9.70833 22.3925 7.34375 20.3775 5.40625C18.3625 3.46875 15.9033 2.5 13 2.5C10.0967 2.5 7.6375 3.46875 5.6225 5.40625C3.6075 7.34375 2.6 9.70833 2.6 12.5C2.6 15.2917 3.6075 17.6562 5.6225 19.5937C7.6375 21.5312 10.0967 22.5 13 22.5Z" fill="#171717" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M9.29228 13.071L14.9493 18.728L16.3633 17.314L11.4133 12.364L16.3633 7.414L14.9493 6L9.29228 11.657C9.10481 11.8445 8.9995 12.0988 8.9995 12.364C8.9995 12.6292 9.10481 12.8835 9.29228 13.071Z" fill="white" />
                        </svg>
                    </Link>

                    <CardTitle className="text-lg">Create Task</CardTitle>
                </div>
            </CardHeader>

            <CardContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {/* Task Title */}
                        <FormField
                            control={form.control}
                            name="taskTitle"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Input task title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Task Description */}
                        <FormField
                            control={form.control}
                            name="taskDescription"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Describe Task" cols={4} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Task Type */}
                        <FormField
                            control={form.control}
                            name="taskType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Type</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full" style={{ height: "58px", background: "transparent" }}>
                                                <SelectValue placeholder="Select Task" />
                                            </SelectTrigger>

                                            <SelectContent className='border-none'>
                                                <SelectItem value="hot">Hot</SelectItem>
                                                <SelectItem value="normal">Normal</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Task Platform */}
                        <FormField
                            control={form.control}
                            name="taskPlatform"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Platform</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full" style={{ height: "58px", background: "transparent" }}>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='border-none'>
                                                <SelectItem value="facebook">Facebook Task</SelectItem>
                                                <SelectItem value="twitter">Twitter Task</SelectItem>
                                                <SelectItem value="x">X Task</SelectItem>
                                                <SelectItem value="discord">Discord Task</SelectItem>
                                                <SelectItem value="telegram">Telegram Task</SelectItem>
                                                <SelectItem value="instagram">Instagram Task</SelectItem>
                                                <SelectItem value="tiktok">Tiktok Task</SelectItem>
                                                <SelectItem value="other">Other Task</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Task Link */}
                        <FormField
                            control={form.control}
                            name="taskLink"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Task Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Input task link" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Participation Cap */}
                        <FormField
                            control={form.control}
                            name="participationCap"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Participation Cap</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Maximum participants" type='number' inputMode='numeric' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Deadline or expiration date */}
                        <FormField
                            control={form.control}
                            name="expirationDate"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                    <FormLabel>Deadline or expiration date</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button
                                                    variant="admin-form"
                                                    className={cn(
                                                        "w-full pl-3 text-left font-normal",
                                                        !field.value && "text-muted-foreground",
                                                        "input-gradient-text bg-transparent border-[#8AE5CF]",

                                                        // "input-gradient-text selection:bg-transparent selection:input-gradient-text border-[#8AE5CF] h-[58px] w-full min-w-0 rounded-[8px] border bg-transparent p-3 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex font-semibold disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                                                        // "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[1px]",
                                                        // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                                                    )}
                                                >
                                                    {field.value ? (
                                                        format(field.value, "PPP")
                                                    ) : (
                                                        <span>Select date</span>
                                                    )}
                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>

                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value}
                                                onSelect={field.onChange}

                                                disabled={(date) =>
                                                    // date > new Date() || date < new Date("1900-01-01")
                                                    date < new Date()
                                                }
                                                captionLayout="dropdown"
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {/* <FormDescription>
                                        Your date of birth is used to calculate your age.
                                    </FormDescription> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Point Value */}
                        <FormField
                            control={form.control}
                            name="pointValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Point Value</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Input point value" type='number' inputMode='numeric' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Cooldown Period */}
                        <FormField
                            control={form.control}
                            name="cooldownPeriod"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Cooldown Period (Hours) </FormLabel>
                                    <FormControl>
                                        <Input placeholder="Cooldown hours e.g 7" type='number' inputMode='numeric' {...field} />

                                        {/* <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full" style={{ height: "58px", background: "transparent" }}>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='border-none'>
                                                {[...Array(24)].map((_, i) => (
                                                    <SelectItem value={`${i + 1}`}>{i + 1}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select> */}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Proof Requirement */}
                        <FormField
                            control={form.control}
                            name="proofRequirement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Proof Requirement</FormLabel>
                                    <FormControl>
                                        <Select
                                            value={field.value}
                                            onValueChange={field.onChange}
                                        >
                                            <SelectTrigger className="w-full" style={{ height: "58px", background: "transparent" }}>
                                                <SelectValue placeholder="Select" />
                                            </SelectTrigger>

                                            <SelectContent className='border-none'>
                                                <SelectItem value="link">Link</SelectItem>
                                                <SelectItem value="image">Image</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <DisplayRespondsMessage
                            display={isError}
                            message={error?.message || ''}
                            errorMsg={error?.response?.data?.message ? [error?.response?.data?.message || ''] : undefined}
                            status={!isError}
                        />

                        <Button type="submit" size={"lg"} variant={"gradient"} className="w-full"
                            disabled={isPending}
                        >
                            {isPending ? "Submitting..." : "Create Task"}
                        </Button>
                    </form>
                </Form>

            </CardContent>
        </Card>
    )
}
