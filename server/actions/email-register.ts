"use server"

import {createSafeActionClient} from "next-safe-action";
import {RegisterSchema} from "@/app/types/register-schema";
import bcrypt from "bcrypt"
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";
import {generateEmailVerificationToken} from "@/server/actions/tokens";
import {sendVerificationEmail} from "@/server/actions/email";


const action = createSafeActionClient();


export const emailRegister = action(RegisterSchema, async ({email, name, password}) => {
    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    })
    if (existingUser) {
        if (!existingUser.emailVerified) {
            const verificationToken = await generateEmailVerificationToken(email)
            await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)

            return {success: "Email Confirmation sent again"}
        }
        return {error: "User already exists"}
    }

    await db.insert(users).values({
        email,
        name,
    })
    const verificationToken = await generateEmailVerificationToken(email)
    await sendVerificationEmail(verificationToken[0].email, verificationToken[0].token)
    return {success: "Confirmation email sent"}

})
