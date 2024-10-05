"use client"
import React, { useEffect } from "react";
import { ProductForm } from "../type";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Modal } from "antd";
import { useQuery } from "react-query";
import { fetchCategories } from "@/domain/category_product/data";
import { postUpdateProduct } from "../data";
import { useProductsPage } from "@/app/dashboard/products/page";
import { Category } from "@/domain/category_product/type";

export default function ModalEditProduct() {
    const { register, handleSubmit, reset, setValue } = useForm<ProductForm>();
    const { data: categories, isLoading } = useQuery('categories', fetchCategories);
    const { refetch, product, isOpenModalEdit, setModalEditOpen, setModalEditClose } = useProductsPage();

    useEffect(() => {
        if (product != null) {
            setValue('name', product.name);
            setValue('description', product.description);
            setValue('stock', product.stock);
            setValue('category_id', product.category_product.id);
        }
    })

    const handleOk = async (data: ProductForm) => {
        try {
            if (confirm('sure update ?')) {
                await postUpdateProduct({ ...data, id: product.id, });
                toast.success('Product updated successfully!');
                reset();
                setModalEditOpen();
                setModalEditClose();
                refetch();
            }
        } catch {
            toast.error('Failed to update product.');
        }
    };

    return (
        <Modal
            title="Edit Product"
            open={isOpenModalEdit}
            onOk={handleSubmit(handleOk)}
            onCancel={setModalEditClose}
            okText="Update"
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
                        categories.map((category: Category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))
                    }
                </select>
            </div>
        </Modal>
    );
}