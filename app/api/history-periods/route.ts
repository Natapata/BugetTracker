import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function GET() {
    const user = await currentUser();
    if(!user) redirect('/sign-in');

    const periods =  await getHistoryPeriods(user.id);
    return(
        Response.json(periods)
    )
}

export type GetHistoryPeriodsType = Awaited<ReturnType<typeof getHistoryPeriods>>;

async function getHistoryPeriods(userId:string) {
    const resulte = await prisma.monthHistory.findMany({
        where: {
            userId,
        },
        select:{
            year: true,
        },
        distinct: ["year"],
        orderBy: [
            {
                year: "asc",
            },
        ],

    });

    const years = resulte.map(el => el.year);
    if(years.length === 0){
        //Retrun current year
        return [new Date().getFullYear()];
    }
    return years;
}