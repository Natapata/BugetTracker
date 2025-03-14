"use client"
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MAX_DATE_RANGE_DAYS } from '@/lib/constants';
import { differenceInDays, startOfMonth } from 'date-fns';
import React, { useState } from 'react'
import { toast } from 'sonner';
import TransactionTable from './_components/TransactionTable';

function Transactionspage() {
      const [dateRange, setDateRange] = useState<{from: Date; to: Date}>({
        from: startOfMonth(new Date()),
        to: new Date(),
      });

  return (
    <>
    <div className="border-b bg-gray-600/5">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-6 py-6 px-4 md:px-6">
            <div>
                <p className='text-3xl font-bold'> Transaction history</p>
            </div>
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
    <div className="container mx-auto px-4 md:px-6">
        <TransactionTable from={dateRange.from} to={dateRange.to}></TransactionTable>
    </div>
    </>
  )
}

export default Transactionspage