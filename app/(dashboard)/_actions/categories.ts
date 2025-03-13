"use server";

import { prisma } from "@/lib/prisma";
import { CreateCategorySchema, CreateCategorySchemaType, DeleteCategorySchema, DeleteCategorySchemaType } from "@/schema/categories";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function CreateCategory(form: CreateCategorySchemaType) {
    const parsedCategory = CreateCategorySchema.safeParse(form);
    if(!parsedCategory.success) {
        throw new Error('Invalid category data');
    }

    const user = await currentUser();
    if(!user) {
        redirect('/sign-in');
    }

    const {name, icon, type} = parsedCategory.data;

    return await prisma.category.create({
        data: {
            userId: user.id,
            name,
            icon,
            type,
        },
    })
}


export async function DeleteCategory(form: DeleteCategorySchemaType) {
    const parsedCategory = DeleteCategorySchema.safeParse(form);
    if(!parsedCategory.success) {
        throw new Error('Invalid category data');
    }

    const user = await currentUser();
    if(!user) {
        redirect('/sign-in');
    }

    const {name, type} = parsedCategory.data;

    return (
        await prisma.category.delete({
            where: {
                name_userId_type: {
                    userId: user.id,
                    name,
                    type
                },
            },
        })
    )

}