"use client"
import React from "react";
import { ProductForm, ProductModalProps } from "../type";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useQuery } from "react-query";
import { fetchCategories } from "@/domain/category_product/data";
import { postCreateProduct } from "../data";

export default function ModalCreateProduct({
    visible,
    onClose,
    onSuccess
}: ProductModalProps) {
    const { register, handleSubmit, reset } = useForm<ProductForm>();
    const { data: categories, isLoading } = useQuery('categories', fetchCategories);

    const handleOk = async (data: ProductForm) => {
        try {
            await postCreateProduct(data)
            toast.success('Product created successfully!');
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            toast.error('Failed to create product.');
        }
    };

    return (
        <Modal
            title="Create Product"
            open={visible}
            onOk={handleSubmit(handleOk)}
            onCancel={onClose}
            okText="Create"
            cancelText="Cancel"
        >
            <div className="space-y-4 flex flex-col">
                <input className="p-2 border rounded p-2" type="text" {...register('name', { required: true })} placeholder="Product Name" />
                <input className="p-2 border rounded p-2" type="text" {...register('description', { required: true })} placeholder="Product Description" />
                <input className="p-2 border rounded p-2" type="number" {...register('stock', { required: true })} placeholder="Stock Quantity" />
                <select
                    id="category_id"
                    {...register("category_id")}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled selected hidden>Select Category</option>
                    {!isLoading
                        &&
                        categories.map((category: any) => (
                            <option value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
        </Modal>
    );
}