"use client"
import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user !== null) {
            redirect('/dashboard/products');
        }
    });

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className='bg-white min-w-[42vh] min-h-[38vh] p-8 rounded-md'>
                {children}
            </div>
        </div>

    )
}
