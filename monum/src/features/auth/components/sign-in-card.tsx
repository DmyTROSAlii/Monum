import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const formScheme = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required"),
});

export const SignInCard = () => {
    const form = useForm<z.infer<typeof formScheme>>({
        resolver: zodResolver(formScheme),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formScheme>) => {
        console.log(values);
    }

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
                        <Button disabled={false} size="lg" className="w-full">
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
                    disabled={false}
                    variant="secondary"
                    size="lg"
                    className="w-full"
                >
                    <FcGoogle className="mr-2 size-5" />
                    Login with Google
                </Button>
                <Button
                    disabled={false}
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
                    Don't have an account?
                    <Link href="/sign-up">
                        <span className="text-blue-700"> Sign Up</span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    );
}