import Logo from '@/components/Logo';
import { CurrencyComboBox } from '@/components/CurrencyComboBox';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

async function page() {
  const user = await currentUser();
    if (!user) {
        redirect('/sign-in');
    }
  
    return (
    <div className='container flex max-w-2xl flex-col items-center justify-between gap-4'>
        
        <div>
            <h1 className='text-center text-3xl'>
                Welcome, <span className='ml-2 font-bold'>{user.firstName}!👋</span>
            </h1>
            <h2 className='text-center mt-4 text-base text-muted-foreground'>
                Let&apos;s get started by settign up your currency
            </h2>
            <h3 className='text-center mt-2  text-sm text-muted-foreground'>
                You can change this later in your settings
            </h3>
        </div>
        <Separator />
        <Card className='w-full'>
         <CardHeader>
            <CardTitle>Currency</CardTitle>
            <CardDescription>
                Set your default currency for transactions
            </CardDescription>
         </CardHeader>
         <CardContent>
            <CurrencyComboBox />
         </CardContent>
        </Card>
        <Separator />
         <Button className='w-full' asChild>
            <Link href='/'>I&apos;m done! Take me to dashboard</Link>
         </Button>
         <div className="mt-8">
            <Logo />
         </div>
        </div>
  )
}

export default page