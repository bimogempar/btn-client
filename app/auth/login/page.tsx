"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = () => {
        router.push('/dashboard/products');
    }

    return (
        <div>
            <div className="text-center">
                LOGIN INVENTORY STOCKS
            </div>
            <div className="flex flex-col gap-4 w-full mt-8 h-[24vh]">
                <input type="email" placeholder="email@example.com" className='rounded-md bg-slate-50 p-2' />
                <input type="password" placeholder="password" className='rounded-md bg-slate-50 p-2' />
                <div className='mt-auto'>
                    <button className='p-2 w-full rounded-md bg-slate-400 text-white' onClick={handleLogin}>LOGIN</button>
                </div>
            </div>
        </div>
    )
}
