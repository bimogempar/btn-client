"use client"

import { useAuth } from '@/context/AuthContext';
import { postUpdateProfile } from '@/domain/user/data';
import { User } from '@/domain/user/type';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function ProfilePage() {
    const { user, update } = useAuth();
    const { register, handleSubmit, setValue } = useForm<User>();

    useEffect(() => {
        if (user) {
            setValue("id", user.id);
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("role", user.role);
        }
    }, [user, setValue]);

    const onSubmit = async (data: User) => {
        try {
            const { password, ...rest } = data;
            const payload = password ? data : rest;

            const user = await postUpdateProfile(payload);
            update(user);
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Failed to update profile.");
        }
    };

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Update Profile</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input type="hidden" {...register("id", { required: true })} />
                <div>
                    <label htmlFor="name" className="block mb-1">Name</label>
                    <input
                        type="text"
                        id="name"
                        {...register("name", { required: true })}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input
                        type="email"
                        id="email"
                        {...register("email", { required: true })}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block mb-1">Role</label>
                    <select
                        id="role"
                        {...register("role")}
                        className="w-full border rounded p-2"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        {/* Add other roles if needed */}
                    </select>
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input
                        autoComplete="off"
                        placeholder='*******'
                        type="password"
                        {...register("password")}
                        className="w-full border rounded p-2"
                    />
                </div>
                <div>
                    <button type="submit" className="text-white rounded p-2 bg-[#FF8225] hover:bg-[#e57521]">Update Profile</button>
                </div>
            </form>
        </div>
    );
}