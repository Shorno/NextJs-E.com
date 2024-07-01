"use server"


import {createSafeActionClient} from "next-safe-action";
import {RegisterSchema} from "@/app/types/register-schema";
import bcrypt from "bcrypt"
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";

const action = createSafeActionClient();

export const emailRegister = action(RegisterSchema, async ({email, name, password}) => {
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword)

    const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
    })
    if (existingUser) {
        // if (!existingUser.emailVerified) {
        //     const verificationToken =
        // }
        return {error: "User already exists"}
    }
    return {success: "Success"}

})
