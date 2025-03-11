'use client'

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { GetFormatterForCurrency } from '@/lib/helpers';
import { Period, TimeFrame } from '@/lib/types'
import { UserSettings } from '@prisma/client'
import React, { useMemo, useState } from 'react'

function History({userSettings}: {userSettings : UserSettings}) {

    const [timeframe, setTimeframe] = useState<TimeFrame>("month");
    const [period, setPeriod] = useState<Period>({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    });

    const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency);
    }, [userSettings.currency])

  return (
    <div className="container mx-auto px-4 md:px-6">
        <h2 className="mt-12 text-3xl font-bold">History</h2>
        <Card className='col-span-12 mt-2 w-full bg-gray-300/5'>
            <CardHeader className='gap-2'>
                <CardTitle className='grid grid-flow-row justify-between gap-2 md:grid-flow-col'>
                    {/* <HistoryPeriodSelector period={period} setPeriod={setPeriod} timeframe={timeframe} setTimeframe={setTimeframe} /> */}


                </CardTitle>
            </CardHeader>
        </Card>
    </div>
  )
}

export default History