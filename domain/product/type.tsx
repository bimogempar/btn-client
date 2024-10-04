export interface DataType {
  id: number;
  category_id: number;
  name: string;
  description: string;
  image: string;
  stock: number;
  created_at: string | null;
  updated_at: string;
  category_product: {
    id: number;
    name: string;
    description: string;
    created_at: string | null;
    updated_at: string | null;
  };
}

export interface ProductTrx {
  id: number;
  category_id: number;
  name: string;
  description: string;
  image: string;
  stock: number;
  created_at: string;
  updated_at: string;
  pivot: {
    transaction_id: number;
    product_id: number;
    quantity: number;
  };
}
