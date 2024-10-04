import api from "@/libs/api";
import toast from "react-hot-toast";
import { TransactionForm } from "./type";

export const fetchTransactions = async () => {
    try {
        const res = await api.get("/transactions");
        const { transactions } = res.data;
        return transactions;
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

export const postCreateTransaction = async (payload: TransactionForm) => {
    try {
        const res = await api.post("/transactions/new", payload);
        const { transaction } = res.data;
        return transaction;
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