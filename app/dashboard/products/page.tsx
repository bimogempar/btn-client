"use client"
import AntdTable from '@/components/AntdTable';
import { useModal } from '@/context/ModalContext';
import { columns } from '@/domain/product/column';
import ModalCreateProduct from '@/domain/product/components/ModalCreateProduct';
import { fetchProducts } from '@/domain/product/data';
import React from 'react';
import { useQuery } from 'react-query';

export default function ProductsPage() {
    const { data, isLoading, refetch } = useQuery('products', fetchProducts)
    const { isModalVisible, showModal, hideModal } = useModal();
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Products</h1>
            <div className='mb-4'>
                <button className="text-white rounded p-2 bg-[#FF8225] hover:bg-[#e57521]" onClick={showModal}>Create </button>
            </div>
            <AntdTable
                rowKey="id"
                onclickRow={(record) => console.log(record)}
                onChangeRowSelect={(selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)}
                loading={isLoading}
                size="middle"
                tableLayout="auto"
                dataSource={data}
                columns={columns}
            />
            {
                isModalVisible && (
                    <ModalCreateProduct
                        visible={isModalVisible}
                        onClose={hideModal}
                        onSuccess={refetch}
                    />
                )
            }
        </div>
    )
}