"use client"
import React from 'react'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const segment = useSelectedLayoutSegment();
    const router = useRouter();

    const handleLogout = () => {
        router.replace('/auth/login');
    }

    return (
        <div className='flex flex-col h-[80vh]'>
            <ul className='mb-auto space-y-4'>
                <li className={`rounded-md p-2 ${segment == 'products' && 'bg-gray-100'}`}>
                    <Link href={"/dashboard/products"}>Products</Link>
                </li>
                <li className={`rounded-md p-2 ${segment == 'transactions' && 'bg-gray-100'}`}>
                    <Link href={"/dashboard/transactions"}>Transactions</Link>
                </li>
                <li className={`rounded-md p-2 ${segment == 'users' && 'bg-gray-100'}`}>
                    <Link href={"/dashboard/users"}>Users</Link>
                </li>
            </ul>
            <h2 className='mt-auto p-2 cursor-pointer' onClick={handleLogout}>Logout</h2>
        </div>
    )
}
