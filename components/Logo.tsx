import { PiggyBank } from 'lucide-react'
import React from 'react'

function Logo() {
  return (
    <a href='/' className='flex items-center gab-2'>
        <PiggyBank className='stroke h-11 w-11 stroke-amber-500 stroke-[1.5]' />
        <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>BugetTracker</p>
    </a>
  )
}

export default Logo

export function LogoMobile() {
  return (
    <a href='/' className='flex items-center gab-2'>
        <p className='bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent'>BugetTracker</p>
    </a>
  )
}