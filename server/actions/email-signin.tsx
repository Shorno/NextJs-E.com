"use server"

import {LoginSchema} from "@/app/types/login-schema";
import {createSafeActionClient} from "next-safe-action";

const action = createSafeActionClient()


export const emailSignIn = action(
    LoginSchema,
    async ({email, password, code}) => {
        console.log(email, password, code)

        return {email}
    }
)
