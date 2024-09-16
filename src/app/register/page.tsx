'use client'
import GuestGuard from "@/auth/guard/guest-guard";
import { Register } from "@/sections/register/view";


export default function RegisterPage() {
  return (
    <GuestGuard>      
      <Register/>
    </GuestGuard>    
  );
}