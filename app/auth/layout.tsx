import React from 'react';

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className='bg-white min-w-[42vh] min-h-[38vh] p-8 rounded-md'>
                {children}
            </div>
        </div>

    )
}
