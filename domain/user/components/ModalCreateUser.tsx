"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { UserCreateForm, UserModalProps } from "../type"; // Adjust the path as needed
import { postCreateUser } from "../data"; // Ensure you have this function to post data

export default function ModalCreateUser({
    visible,
    onClose,
    onSuccess,
}: UserModalProps) {
    const { register, handleSubmit, reset } = useForm<UserCreateForm>();

    const handleOk = async (data: UserCreateForm) => {
        try {
            await postCreateUser(data); // Call your API to create the user
            toast.success("User created successfully!");
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to create user.");
        }
    };

    return (
        <Modal
            title="Create User"
            open={visible}
            onOk={handleSubmit(handleOk)}
            onCancel={onClose}
            okText="Create"
            cancelText="Cancel"
        >
            <div className="space-y-4 flex flex-col">
                <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="User Name"
                    className="p-2 border rounded"
                />
                <input
                    type="email"
                    {...register("email", { required: true })}
                    placeholder="Email"
                    className="p-2 border rounded"
                />
                <input
                    type="password"
                    {...register("password", { required: true })}
                    placeholder="Password"
                    className="p-2 border rounded"
                />
                <select
                    {...register("role", { required: true })}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled hidden>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    {/* Add other roles as needed */}
                </select>
            </div>
        </Modal>
    );
}
