"use server";

import { prisma } from "@/lib/prisma";
import { CreateTransactionSchema, CreateTransactionSchemaType } from "@/schema/transaction";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateTransaction(form: CreateTransactionSchemaType) {

    const parsedDate = CreateTransactionSchema.safeParse(form);
    if (!parsedDate.success) {
        throw new Error('Invalid Transaction data');
    }

    const user = await currentUser();
        if(!user) {
            redirect('/sign-in');
    }

    const { amount, category, date, description, type } = parsedDate.data;
    const categoryRow = await prisma.category.findFirst({
        where: {
            userId: user.id,
            name: category,
        },
    });

    if(!categoryRow) {
        throw new Error('Category not found');
    }

    // NOTE: don't confuse $transaction (primsa) with prima.transaction (table)

    await prisma.$transaction([
        //Create user transaction
        prisma.transaction.create({
            data: {
                userId: user.id,
                amount,
                date,
                description : description || "",
                type,
                category: categoryRow.name,
                categoryIcon : categoryRow.icon,
            },
        }),

        //Update month aggegate table
        prisma.monthHistory.upsert({
            where: {
                day_month_year_userId: {
                    userId: user.id,
                    day: date.getUTCDay(),
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                },
            },
            create: {
                userId: user.id,
                day: date.getUTCDay(),
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
                expense: type === 'expense' ? amount : 0,
                income: type === 'income' ? amount : 0,
            },
            update: {
                expense: {
                    increment: type === 'expense' ? amount : 0,
                },
                income: {
                    increment: type === 'income' ? amount : 0,
                },
            },
        }),

        //Update year aggegate table
        prisma.yearHistory.upsert({
            where: {
                month_year_userId: {
                    userId: user.id,
                    month: date.getUTCMonth(),
                    year: date.getUTCFullYear(),
                },
            },
            create: {
                userId: user.id,
                month: date.getUTCMonth(),
                year: date.getUTCFullYear(),
                expense: type === 'expense' ? amount : 0,
                income: type === 'income' ? amount : 0,
            },
            update: {
                expense: {
                    increment: type === 'expense' ? amount : 0,
                },
                income: {
                    increment: type === 'income' ? amount : 0,
                },
            },
        })
    ])
}