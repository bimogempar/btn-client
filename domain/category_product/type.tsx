import { Product } from "../product/type";

export interface Category {
    id: number;
    name: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
    product: Product[];
}

export interface CategoryCreateForm {
    name: string;
    description: string;
}

export interface CategoryModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}