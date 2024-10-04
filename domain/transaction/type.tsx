import { ProductTrx } from "../product/type";

export interface Transaction {
    id: number;
    type: string;
    created_at: string;
    updated_at: string;
    products: ProductTrx[];
}

export interface TransactionForm {
    type: 'stock_in' | 'stock_out';
    products: { product_id: number; quantity: number }[];
}

export interface TransactionModalProps {
    visible: boolean;
    onClose: () => void;
    onSuccess: () => void;
}