"use client";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { CategoryCreateForm } from "../type";
import { postCreateCategory } from "../data";
import { useCategoryPage } from "@/app/dashboard/categories/page";

export default function ModalCreateCategory() {
    const { register, handleSubmit, reset } = useForm<CategoryCreateForm>();
    const { refetch, isOpenModalCreate, setModalCreateClose } = useCategoryPage();

    const handleOk = async (data: CategoryCreateForm) => {
        try {
            await postCreateCategory(data);
            toast.success("Category created successfully!");
            reset();
            refetch();
            setModalCreateClose();
        } catch {
            toast.error("Failed to create category.");
        }
    };

    return (
        <Modal
            title="Create Category"
            open={isOpenModalCreate}
            onOk={handleSubmit(handleOk)}
            onCancel={setModalCreateClose}
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
