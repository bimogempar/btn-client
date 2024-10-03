"use client"
import { useAuth } from '@/context/AuthContext';
import React from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

export default function LoginPage() {
    const { login } = useAuth();
    const { register, handleSubmit } = useForm();

    const handleLogin: SubmitHandler<FieldValues> = async (payload) => {
        await login(payload.email, payload.password);
    }

    return (
        <div>
            <div className="text-center">
                LOGIN INVENTORY STOCKS
            </div>
            <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4 w-full mt-8 h-[24vh]">
                <input {...register('email')} type="email" placeholder="email@example.com" className='rounded-md bg-slate-50 p-2' />
                <input {...register('password')} type="password" placeholder="password" className='rounded-md bg-slate-50 p-2' />
                <div className='mt-auto'>
                    <button type='submit' className='p-2 w-full rounded-md bg-slate-400 text-white'>LOGIN</button>
                </div>
            </form>
        </div>
    )
}
