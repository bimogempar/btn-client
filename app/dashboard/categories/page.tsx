"use client"
import AntdTable from '@/components/AntdTable';
import { useModal } from '@/context/ModalContext';
import { columns } from '@/domain/category_product/column';
import ModalCreateCategory from '@/domain/category_product/components/ModalCreateCategoryProduct';
import { fetchCategories } from '@/domain/category_product/data';
import React from 'react'
import { useQuery } from 'react-query'

export default function CategoriesProduct() {
    const { data, isLoading, refetch } = useQuery('categories', fetchCategories);
    const { isModalVisible, showModal, hideModal } = useModal();

    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Categories Product</h1>
            <div className='mb-4'>
                <button className="text-white rounded p-2 bg-[#FF8225] hover:bg-[#e57521]" onClick={showModal}>Create</button>
            </div>
            <AntdTable
                rowKey="id"
                onclickRow={() => { }}
                onChangeRowSelect={(selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)}
                loading={isLoading}
                size="middle"
                tableLayout="auto"
                dataSource={data}
                columns={columns}
            />
            {isModalVisible && (
                <ModalCreateCategory
                    visible={isModalVisible}
                    onClose={hideModal}
                    onSuccess={refetch}
                />
            )}
        </div>
    )
}
