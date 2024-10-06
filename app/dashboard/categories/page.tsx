"use client"
import AntdTable from '@/components/AntdTable';
import { columns } from '@/domain/category_product/column';
import ModalCreateCategory from '@/domain/category_product/components/ModalCreateCategoryProduct';
import ModalEditCategoryProduct from '@/domain/category_product/components/ModalEditCategoryProduct';
import { fetchCategories } from '@/domain/category_product/data';
import { Category } from '@/domain/category_product/type';
import React, { useState } from 'react'
import { useQuery } from 'react-query'

export default function CategoriesProduct() {
    const { data, isLoading, refetch } = useQuery('categories', fetchCategories);
    const [isModalOpen, setModalOpen] = useState({
        category: null as unknown as Category || null,
        createCategory: false,
        editCategory: false,
    });

    const valueCtx = {
        refetch,
        category: isModalOpen.category,
        isOpenModalCreate: isModalOpen.createCategory,
        isOpenModalEdit: isModalOpen.editCategory,
        setCategory: (category: Category) => setModalOpen(prev => ({ ...prev, category })),
        setModalCreateOpen: () => setModalOpen(prev => ({ ...prev, createCategory: true })),
        setModalCreateClose: () => setModalOpen(prev => ({ ...prev, createCategory: false })),
        setModalEditOpen: () => setModalOpen(prev => ({ ...prev, editCategory: true })),
        setModalEditClose: () => setModalOpen(prev => ({ ...prev, editCategory: false })),
    }
    const tableColumns = columns(valueCtx)

    return (
        <CategoryPageContext.Provider value={valueCtx}>
            <h1 className="text-xl font-semibold mb-4">Categories Product</h1>
            <div className='mb-4'>
                <button className="text-white rounded p-2 bg-[#FF8225] hover:bg-[#e57521]" onClick={valueCtx.setModalCreateOpen}>Create</button>
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
            {isModalOpen.createCategory && <ModalCreateCategory />}
            {isModalOpen.editCategory && <ModalEditCategoryProduct />}
        </CategoryPageContext.Provider>
    )
}

export interface CategoryPageContextType {
    refetch: () => void;
    category: Category;
    isOpenModalCreate: boolean;
    isOpenModalEdit: boolean;
    setCategory: (category: Category) => void;
    setModalCreateOpen: () => void
    setModalCreateClose: () => void;
    setModalEditOpen: () => void;
    setModalEditClose: () => void;
}

const CategoryPageContext = React.createContext<CategoryPageContextType | undefined>(undefined)

export const useCategoryPage = () => {
    const ctx = React.useContext(CategoryPageContext);
    if (!ctx) {
        throw new Error('useCategoryPage must be used within a CategoryPageProvider');
    }
    return ctx;
};