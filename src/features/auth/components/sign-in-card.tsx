"use client";

import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-dropdown-menu";

import { loginScheme } from "../schemas";
import { useLogin } from "../api/use-login";

import { signUpWithGithub } from "@/lib/oauth";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const SignInCard = () => {
    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginScheme>>({
        resolver: zodResolver(loginScheme),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof loginScheme>) => {
        mutate({ json: values });
    };

    return (
        <Card className="w-full h-full md:w-[478px] border-none shadow-none">
            <CardHeader className="flex items-center justify-center text-center p-7">
                <CardTitle className="text-2xl">
                    Welcome Back!
                </CardTitle>
            </CardHeader>
            <div className="px-7 h-0.5 bg-gray-200">
                <Separator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type="email"
                                            placeholder="Enter email address"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="password"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="Enter password"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isPending} size="lg" className="w-full dark:text-neutral-200">
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className="px-7 h-0.5 bg-gray-200">
                <Separator />
            </div>
            <CardContent className="p-7 flex flex-col gap-y-4">
                <Button
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FcGoogle className="mr-2 size-5" />
                    Login with Google
                </Button>
                <Button
                    onClick={() => signUpWithGithub()}
                    disabled={isPending}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FaGithub className="mr-2 size-5" />
                    Login with Github
                </Button>
            </CardContent>
            <div className="px-7 h-0.5 bg-gray-200">
                <Separator />
            </div>
            <CardContent className="p-7 flex items-center justify-center">
                <p>
                    Don`t have an account?
                    <Link href="/sign-up">
                        <span className="text-blue-700"> Sign Up</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}