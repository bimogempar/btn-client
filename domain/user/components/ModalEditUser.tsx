"use client"
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { UserUpdateForm } from "../type"; // Adjust the path as needed
import { postUpdateProfile } from "../data"; // Ensure you have this function to post data
import { useUsersPage } from "@/app/dashboard/users/page";

export default function ModalEditUser() {
    const { register, handleSubmit, reset, setValue } = useForm<UserUpdateForm>();
    const { refetch, user, isOpenModalEdit, setModalEditClose } = useUsersPage();

    useEffect(() => {
        if (user != null) {
            setValue("id", user.id);
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("role", user.role);
        }
    })

    const handleOk = async (data: UserUpdateForm) => {
        try {
            await postUpdateProfile(data);
            toast.success("User updated successfully!");
            reset();
            refetch();
            setModalEditClose();
        } catch {
            toast.error("Failed to update user.");
        }
    };

    return (
        <Modal
            title="Update User"
            open={isOpenModalEdit}
            onOk={handleSubmit(handleOk)}
            onCancel={setModalEditClose}
            okText="Update"
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
