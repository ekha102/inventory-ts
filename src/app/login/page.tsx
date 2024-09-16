'use client'
import GuestGuard from "@/auth/guard/guest-guard";
import { LoginPage } from "@/sections/login/view";


export default function Login() {
  return (
    <GuestGuard>
      <LoginPage/>
    </GuestGuard>
  );
}