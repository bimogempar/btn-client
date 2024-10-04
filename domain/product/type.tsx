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

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string | null;
  stock: number;
  created_at: string;
  updated_at: string;
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

export interface ProductForm {
  name: string;
  description: string;
  stock: number;
  category_id: number;
}

export interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}