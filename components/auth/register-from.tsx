"use client"
import AuthCard from "@/components/auth/auth-card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useAction} from "next-safe-action/hooks";
import {emailSignIn} from "@/server/actions/email-signin";
import {cn} from "@/lib/utils";
import {useState} from "react";
import {RegisterSchema} from "@/app/types/register-schema";
import {emailRegister} from "@/server/actions/email-register";
import FormSuccess from "@/components/auth/form-success";
import FormError from "@/components/auth/form-error";

export default function RegisterFrom() {

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    });

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const {execute, status} = useAction(emailRegister, {
        onSuccess(data) {
            if (data.error) {
                setError(data.error)
            }
            if (data.success) {
                setSuccess(data.success)
            }
        }
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        execute(values);
    }
    return (
        <>
            <AuthCard
                cardTitle={"Create an account"}
                backButtonHref={"/auth/login"}
                backButtonLabel={"Already have an account?"}
                showSocials={true}
            >
                <div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div>

                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder={"Name"}
                                                    type={'text'}
                                                />
                                            </FormControl>
                                            <FormDescription/>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />

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
                                <FormSuccess message={success}/>
                                <FormError message={error}/>
                                <Button variant={"link"} size={"sm"}>
                                    <Link href={"/auth/reset"}>Forgot Password</Link>
                                </Button>

                            </div>

                            <Button type={"submit"}
                                    className={cn("w-full", status === "executing" ? "animate-pulse" : "")}>
                                Register
                            </Button>
                        </form>
                    </Form>
                </div>
            </AuthCard>
        </>
    )
}
