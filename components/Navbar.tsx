"use client"
import React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const segment = useSelectedLayoutSegment();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        if (confirm('sure logout ?')) {
            logout()
        }
    }

    return (
        <div className='flex flex-col h-[22vh] md:h-[80vh]'>
            <ul className='mb-auto space-y-2'>
                <li className={`rounded-md p-2 ${segment == 'products' && 'bg-[#FF8225] text-white'}`}>
                    <Link href={"/dashboard/products"}>Products</Link>
                </li>
                <li className={`rounded-md p-2 ${segment == 'transactions' && 'bg-[#FF8225] text-white'}`}>
                    <Link href={"/dashboard/transactions"}>Transactions</Link>
                </li>
                <li className={`rounded-md p-2 ${segment == 'users' && 'bg-[#FF8225] text-white'}`}>
                    <Link href={"/dashboard/users"}>Users</Link>
                </li>
            </ul>
            <div className='mt-auto p-2'>
                <h2>{user?.email}</h2>
                <h2 className='cursor-pointer' onClick={handleLogout}>Logout</h2>
            </div>
        </div>
    )
}
