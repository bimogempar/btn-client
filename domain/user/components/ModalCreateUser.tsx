"use client"
import React from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { UserCreateForm } from "../type"; // Adjust the path as needed
import { postCreateUser } from "../data"; // Ensure you have this function to post data
import { useUsersPage } from "@/app/dashboard/users/page";

export default function ModalCreateUser() {
    const { register, handleSubmit, reset } = useForm<UserCreateForm>();
    const { refetch, isOpenModalCreate, setModalCreateClose } = useUsersPage();

    const handleOk = async (data: UserCreateForm) => {
        try {
            await postCreateUser(data);
            toast.success("User created successfully!");
            reset();
            refetch();
            setModalCreateClose();
        } catch {
            toast.error("Failed to create user.");
        }
    };

    return (
        <Modal
            title="Create User"
            open={isOpenModalCreate}
            onOk={handleSubmit(handleOk)}
            onCancel={setModalCreateClose}
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
                </select>
            </div>
        </Modal>
    );
}
