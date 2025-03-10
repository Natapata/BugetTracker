'use client'

import { UserSettings } from '@prisma/client'
import React from 'react'

interface Props{
    from: Date,
    to: Date,
    userSettings: UserSettings,
}

function CategoriesStats({from, to, userSettings}: Props){

    
  return (
    <div>
      
    </div>
  )
}

export default CategoriesStats
