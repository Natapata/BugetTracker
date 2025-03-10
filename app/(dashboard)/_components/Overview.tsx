"use client"

import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';
import { UserSettings } from '@prisma/client'
import { differenceInDays, startOfMonth } from 'date-fns';
import React, { useState } from 'react'
import { toast } from 'sonner';
import StatsCards from './StatsCards';
import CategoriesStats from './CategoriesStats';

function Overview({userSettings} : {userSettings: UserSettings}) {
  const [dateRange, setDateRange] = useState<{from: Date; to: Date}>({
    from: startOfMonth(new Date()),
    to: new Date(),
  });


    return (
    < >
    <div className="container mx-auto flex flex-wrap items-end justify-between gap-3 py-6 px-4 md:px-6">
        <h2 className='text-3xl font-bold'>Overview</h2>
        <div className="flex items-center gap-3">
            <DateRangePicker
                initialDateFrom={dateRange.from}
                initialDateTo={dateRange.to}
                showCompare={false}
                onUpdate={(values) => {
                    const {from, to} = values.range;
                    // Only updates ranges if both dates are set

                    if(!from || !to) return;
                    if (from && to && differenceInDays(to, from) > MAX_DATE_RANGE_DAYS){
                        toast.error(`The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE_DAYS} days!`);
                        return;
                    }

                    if(from && to)
                    setDateRange({from, to});
                }}
            />
        </div>
    </div>
    <div className="container mx-auto flex w-full flex-col gap-2 px-4 md:px-6">  
        <StatsCards 
        userSettings={userSettings}
        from={dateRange.from}
        to={dateRange.to} 
         />
        <CategoriesStats
        userSettings={userSettings}
        from={dateRange.from}
        to={dateRange.to} 
         /> 
    </div>
    </>
  );
}

export default Overview
