"use client"
import AntdTable from '@/components/AntdTable';
import { columns } from '@/domain/product/column';
import { fetchProducts } from '@/domain/product/data';
import React from 'react';
import { useQuery } from 'react-query';

export default function ProductsPage() {
    const { data, isLoading } = useQuery('products', fetchProducts)
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Products</h1>
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
        </div>
    )
}