"use server";

import { prisma } from "@/lib/prisma";
import { UpdateUserCurrencySchema } from "@/schema/userSettings";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function UpdateUserCurrency(currency: string) {
    const parsedCurrency = UpdateUserCurrencySchema.safeParse({ currency });

    if (!parsedCurrency.success) {
        throw parsedCurrency.error;
    }

    const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }

    const userSettings = await prisma.userSettings.update({
        where: {
            userId: user.id,
        },
        data: {
            currency: parsedCurrency.data.currency,
        },
    });

    return userSettings;
}