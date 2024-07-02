"use server"

import {db} from "@/server";
import {eq} from "drizzle-orm";
import {emailTokens} from "@/server/schema";


export const getVerificationToken = async (email: string) => {
    try {
        const verificationToken = await db.query.emailTokens.findFirst({
            where: eq(emailTokens, email)
        })
    } catch (error) {
        return {error: null}
    }
}

export const generateEmailVerificationToken = async (email: string) => {
    const token = crypto.randomUUID()
    const expires = new Date(new Date().getTime() + 3600 * 1000)

    const existingToken = await getVerificationToken(email)

    if (existingToken) {
        await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id))
    }

    return db.insert(emailTokens).values({
        email,
        token,
        expires,
    }).returning();
}
