"use server"

import {LoginSchema} from "@/app/types/login-schema";
import {createSafeActionClient} from "next-safe-action";
import {db} from "@/server";
import {eq} from "drizzle-orm";
import {users} from "@/server/schema";

const action = createSafeActionClient()


export const emailSignIn = action(
    LoginSchema,
    async ({email, password, code}) => {
        console.log(email, password, code)
        const existingUSer = await db.query.users.findFirst({
            where: eq(users.email, email)
        })

        if (existingUSer?.email !== email){
            return {error: "Email not found"}
        }
        // if (existingUSer?.emailVerified){
        //
        // }

        return {success: email}
    }
)
