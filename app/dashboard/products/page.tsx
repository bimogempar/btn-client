"use client"
import { fetchProducts } from '@/api/products';
import AntdTable from '@/components/AntdTable';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React from 'react';
import { useQuery } from 'react-query';

export default function ProductsPage() {
    const { data, isLoading } = useQuery('products', fetchProducts)
    console.log('this data', data);

    return (
        <div>
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

interface DataType {
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

const columns: ColumnsType<DataType> = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text: string) => <img src={text} alt={text} width={50} height={50} />,
    },
    {
        title: 'Stock',
        dataIndex: 'stock',
        key: 'stock',
    },
    {
        title: 'Category',
        dataIndex: ['category_product', 'name'],
        key: 'category_product_name',
        render: (categoryName: string) => categoryName || 'Unknown Category',
    },
    {
        title: 'Category Description',
        dataIndex: ['category_product', 'description'],
        key: 'category_product_description',
        render: (description: string) => description || 'No Description',
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (date: string | null) => (date ? moment(date).format('YYYY-MM-DD HH:mm:ss') : 'N/A'),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
];