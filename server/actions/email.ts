"use server"
import {Resend} from "resend";
import getBaseUrl from "@/lib/base-url";

const resend = new Resend(process.env.RESND_API_KEY)
const domain = getBaseUrl()

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${domain}/auth/new-verification?token=${token}`

    const {data, error} = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: email,
        subject: "Please confirm your email",
        html: `
            <h1>Click the link below to confirm your email</h1>
            <a href="${confirmLink}">Confirm Email</a>
        `
    })
    if (error) return console.log(error)
    if (data) return data

}
