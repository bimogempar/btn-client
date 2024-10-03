"use client"
import Loading from '@/components/Loading';
import Navbar from '@/components/Navbar'
import { useAuth } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && user == null) {
            redirect('/auth/login');
        }
    });

    if (loading) return <Loading />
    return (
        <div className="bg-gray-100 min-h-screen p-8 md:p-16 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md h-[26vh] md:h-[84vh] overflow-auto md:col-span-1">
                <Navbar />
            </div>
            <div className="bg-white p-4 rounded-md h-[84vh] overflow-auto md:col-span-3">
                {children}
            </div>
        </div>
    )
}
