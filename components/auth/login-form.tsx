"use client"
import AuthCard from "@/components/auth/auth-card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {LoginSchema} from "@/app/types/login-schema";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useAction} from "next-safe-action/hooks";
import {emailSignIn} from "@/server/actions/email-signin";
import {cn} from "@/lib/utils";


export default function LoginForm() {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });


    const {execute, result, status} = useAction(emailSignIn, {})

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        execute(values);
    }

    return (
        <>
            <AuthCard
                cardTitle={"Welcome back!"}
                backButtonHref={"/auth/register"}
                backButtonLabel={"Create a new account"}
                showSocials={true}
            >
                <div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={"Email"}
                                                    type={'email'}
                                                    autoComplete={"email"}
                                                />
                                            </FormControl>
                                            <FormDescription/>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={"Password"}
                                                    type={'password'}
                                                    autoComplete={"current-password"}
                                                />
                                            </FormControl>
                                            <FormDescription/>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

                                <Button variant={"link"} size={"sm"}>
                                    <Link href={"/"}>Forgot Password</Link>
                                </Button>

                            </div>

                            <Button type={"submit"}
                                    className={cn("w-full", status === "executing" ? "animate-pulse" : "")}>
                                Login
                            </Button>
                        </form>
                    </Form>
                </div>
            </AuthCard>
        </>
    )
}
