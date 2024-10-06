import api from "@/libs/api";
import toast from "react-hot-toast";
import { UserCreateForm } from "./type";

export const fetchUsers = async () => {
    try {
        const res = await api.get("/users");
        const { users } = res.data;
        return users;
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

export const postUpdateProfile = async (payload: UserCreateForm) => {
    try {
        const res = await api.post("/users/update", payload);
        const { user } = res.data;
        return user;
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

export const postCreateUser = async (payload: UserCreateForm) => {
    try {
        const res = await api.post("/users/store", payload);
        const { user } = res.data;
        return user;
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

export const postDeleteUser = async (email: string) => {
    try {
        const res = await api.post("/users/delete", { email });
        const { user } = res.data;
        return user;
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

