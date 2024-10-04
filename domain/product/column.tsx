/* eslint-disable @next/next/no-img-element */
import { ColumnsType } from "antd/es/table"
import { DataType } from "./type"
import moment from "moment";

export const columns: ColumnsType<DataType> = [
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
        hidden: true
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