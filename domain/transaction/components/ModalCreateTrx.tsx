"use client";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Modal } from "antd";
import toast from "react-hot-toast";
import { TransactionForm, TransactionModalProps } from "../type";
import { postCreateTransaction } from "../data";
import { fetchProducts } from "@/domain/product/data";
import { useQuery } from "react-query";

export default function ModalCreateTransaction({
    visible,
    onClose,
    onSuccess,
}: TransactionModalProps) {
    const { register, handleSubmit, reset, control } = useForm<TransactionForm>({
        defaultValues: {
            products: [{ product_id: 0, quantity: 1 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "products",
    });

    const handleRemove = (index: number) => {
        if (fields.length > 1) {
            remove(index);
        } else {
            toast.error("Min 1 product");
        }
    };


    const { data: products, isLoading: loadingProducts } = useQuery("products", fetchProducts);

    const handleOk = async (data: TransactionForm) => {
        try {
            await postCreateTransaction(data);
            toast.success("Transaction created successfully!");
            reset();
            onSuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to create transaction.");
        }
    };

    return (
        <Modal
            title="Create Transaction"
            open={visible}
            onOk={handleSubmit(handleOk)}
            onCancel={onClose}
            okText="Create"
            cancelText="Cancel"
        >
            <div className="space-y-4 flex flex-col">
                <select
                    {...register("type", { required: true })}
                    className="w-full border rounded p-2"
                >
                    <option value="" disabled hidden>Select Transaction Type</option>
                    <option value="stock_in">Stock In</option>
                    <option value="stock_out">Stock Out</option>
                </select>

                {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-4">
                        <select
                            {...register(`products.${index}.product_id`, { required: true })}
                            className="w-full border rounded p-2 mr-2"
                        >
                            <option value="" disabled hidden>Select Product</option>
                            {!loadingProducts &&
                                products.map((product: any) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name}
                                    </option>
                                ))}
                        </select>
                        <input
                            type="number"
                            {...register(`products.${index}.quantity`, { required: true, min: 1 })}
                            placeholder="Quantity"
                            className="border rounded p-2 w-24"
                            min={1}
                        />
                        <button type="button" onClick={() => handleRemove(index)} className="ml-2 text-red-500">
                            Remove
                        </button>
                    </div>
                ))}

                <button type="button" onClick={() => append({ product_id: 0, quantity: 1 })} className="mt-2 text-blue-500">
                    Add Product
                </button>
            </div>
        </Modal>
    );
}