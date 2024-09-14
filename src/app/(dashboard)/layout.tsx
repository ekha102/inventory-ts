import { AuthGuard } from '@/auth/guard/auth-guard'
import React from 'react'
import NavBar from './navBar'

type Props = {
  children: React.ReactNode
}

export default function Layout({children}: Props) {
  return (
    <AuthGuard>
      <NavBar/>
      {children}
    </AuthGuard>
  )
}
