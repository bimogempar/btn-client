"use client";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { CategoryCreateForm, CategoryModalProps } from "../type";
import { postCreateCategory } from "../data";

export default function ModalCreateCategory({
    visible,
    onClose,
    onSuccess
}: CategoryModalProps) {
    const { register, handleSubmit, reset } = useForm<CategoryCreateForm>();

    const handleOk = async (data: CategoryCreateForm) => {
        try {
            await postCreateCategory(data);
            toast.success("Category created successfully!");
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to create category.");
        }
    };

    return (
        <Modal
            title="Create Category"
            open={visible}
            onOk={handleSubmit(handleOk)}
            onCancel={onClose}
            okText="Create"
            cancelText="Cancel"
        >
            <div className="space-y-4 flex flex-col">
                <input
                    className="p-2 border rounded"
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Category Name"
                />
                <textarea
                    className="p-2 border rounded"
                    {...register("description", { required: true })}
                    placeholder="Category Description"
                />
            </div>
        </Modal>
    );
}
