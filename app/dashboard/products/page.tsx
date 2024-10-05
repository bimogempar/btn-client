"use client"
import AntdTable from '@/components/AntdTable';
import { columns } from '@/domain/product/column';
import ModalCreateProduct from '@/domain/product/components/ModalCreateProduct';
import ModalEditProduct from '@/domain/product/components/ModalEditProduct';
import { fetchProducts } from '@/domain/product/data';
import { Product } from '@/domain/product/type';
import React, { useContext, useState, createContext } from 'react';
import { useQuery } from 'react-query';

export default function ProductsPage() {
    const { data, isLoading, refetch } = useQuery('products', fetchProducts)
    const [isModalOpen, setModalOpen] = useState({
        product: null as unknown as Product || null,
        createProduct: false,
        editProduct: false,
    });

    const valueCtx = {
        refetch,
        product: isModalOpen.product,
        isOpenModalCreate: isModalOpen.createProduct,
        isOpenModalEdit: isModalOpen.editProduct,
        setProduct: (product: Product) => setModalOpen(prev => ({ ...prev, product })),
        setModalCreateOpen: () => setModalOpen(prev => ({ ...prev, createProduct: true })),
        setModalCreateClose: () => setModalOpen(prev => ({ ...prev, createProduct: false })),
        setModalEditOpen: () => setModalOpen(prev => ({ ...prev, editProduct: true })),
        setModalEditClose: () => setModalOpen(prev => ({ ...prev, editProduct: false })),
    }
    const tableColumns = columns(valueCtx)

    return (
        <ProductsPageContext.Provider value={valueCtx}>
            <h1 className="text-xl font-semibold mb-4">Products</h1>
            <div className='mb-4'>
                <button className="text-white rounded p-2 bg-[#FF8225] hover:bg-[#e57521]" onClick={valueCtx.setModalCreateOpen}>Create </button>
            </div>
            <AntdTable
                rowKey="id"
                onclickRow={() => { }}
                onChangeRowSelect={(selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)}
                loading={isLoading}
                size="middle"
                tableLayout="auto"
                dataSource={data}
                columns={tableColumns}
            />
            {isModalOpen.createProduct && <ModalCreateProduct />}
            {isModalOpen.editProduct && <ModalEditProduct />}
        </ProductsPageContext.Provider>
    )
}

export interface ProductsPageContextType {
    refetch: () => void;
    product: Product;
    isOpenModalCreate: boolean;
    isOpenModalEdit: boolean;
    setProduct: (product: Product) => void;
    setModalCreateOpen: () => void
    setModalCreateClose: () => void;
    setModalEditOpen: () => void;
    setModalEditClose: () => void;
}

const ProductsPageContext = createContext<ProductsPageContextType | undefined>(undefined)

export const useProductsPage = () => {
    const ctx = useContext(ProductsPageContext);
    if (!ctx) {
        throw new Error('useProductsPage must be used within a ProductsPageProvider');
    }
    return ctx;
};