import Navbar from '@/components/Navbar'
import React from 'react'

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-gray-100 min-h-screen p-8 md:p-16 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-md max-h-[84vh] overflow-auto md:col-span-1">
                <Navbar />
            </div>
            <div className="bg-white p-4 rounded-md max-h-[84vh] overflow-auto md:col-span-3">
                {children}
            </div>
        </div>
    )
}
