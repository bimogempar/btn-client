"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { CategoryUpdateForm } from "../type";
import { postUpdateCategory } from "../data";
import { useCategoryPage } from "@/app/dashboard/categories/page";

export default function ModalEditCategoryProduct() {
    const { register, handleSubmit, reset, setValue } = useForm<CategoryUpdateForm>();
    const { refetch, category, isOpenModalEdit, setModalEditClose } = useCategoryPage();

    useEffect(() => {
        if (category != null) {
            setValue('id', category.id);
            setValue('name', category.name);
            setValue('description', category.description);
        }
    })

    const handleOk = async (data: CategoryUpdateForm) => {
        try {
            await postUpdateCategory(data);
            toast.success("Category updated successfully!");
            reset();
            refetch();
            setModalEditClose();
        } catch {
            toast.error("Failed to update category.");
        }
    };

    return (
        <Modal
            title="Update Category"
            open={isOpenModalEdit}
            onOk={handleSubmit(handleOk)}
            onCancel={setModalEditClose}
            okText="Update"
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
