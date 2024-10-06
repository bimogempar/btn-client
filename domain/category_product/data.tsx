import api from "@/libs/api";
import toast from "react-hot-toast";
import { CategoryCreateForm, CategoryUpdateForm } from "./type";

export const fetchCategories = async () => {
    try {
        const res = await api.get("/category-products");
        const { categories } = res.data;
        return categories;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
            return error.message;
        } else {
            toast.error("An unknown error occurred.");
            return "An unknown error occurred.";
        }
    }
};

export const postCreateCategory = async (payload: CategoryCreateForm) => {
    try {
        const res = await api.post("/category-products/store", payload);
        const { category } = res.data;
        return category;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
            return error.message;
        } else {
            toast.error("An unknown error occurred.");
            return "An unknown error occurred.";
        }
    }
};

export const postUpdateCategory = async (payload: CategoryUpdateForm) => {
    try {
        const res = await api.post("/category-products/update", payload);
        const { category } = res.data;
        return category;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
            return error.message;
        } else {
            toast.error("An unknown error occurred.");
            return "An unknown error occurred.";
        }
    }
};

export const postDeleteCategory = async (id: number) => {
    try {
        const res = await api.post("/category-products/delete", { id });
        const { message } = res.data;
        return message;
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.error(error.message);
            return error.message;
        } else {
            toast.error("An unknown error occurred.");
            return "An unknown error occurred.";
        }
    }
};