import api from "@/libs/api";
import toast from "react-hot-toast";
import { ProductForm } from "./type";

export const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    const { products } = res.data;
    return products;
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

export const postCreateProduct = async (payload: ProductForm) => {
  try {
    const res = await api.post("/products/store", payload);
    const { product } = res.data;
    return product;
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

export const postUpdateProduct = async (payload: ProductForm) => {
  try {
    const res = await api.post("/products/update", payload);
    const { product } = res.data;
    return product;
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

export const postDeleteProduct = async (id: number) => {
  try {
    const res = await api.post("/products/delete", { id });
    const { message } = res.data;
    return toast.success(message);
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

