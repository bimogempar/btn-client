import api from "@/libs/api"
import toast from "react-hot-toast";

export const fetchProducts = async () => {
    try {
        const res = await api.get('/products');
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
}