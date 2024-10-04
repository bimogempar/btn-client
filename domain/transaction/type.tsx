import { ProductTrx } from "../product/type";

export interface Transaction {
    id: number;
    type: string;
    created_at: string;
    updated_at: string;
    products: ProductTrx[];
}