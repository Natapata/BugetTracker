"use client";

import { ThemeProvider } from 'next-themes';
import React from 'react'

function RootProviders({ children } : { children: React.ReactNode }) {
  return (
    <div>
      <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </div>
  )
}

export default RootProviders
