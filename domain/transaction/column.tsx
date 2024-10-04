/* eslint-disable @next/next/no-img-element */
import Table, { ColumnsType } from "antd/es/table";
import { Transaction } from "./type";
import { ProductTrx } from "../product/type";
import moment from "moment";

export const column: ColumnsType<Transaction> = [
    {
        title: 'Transaction ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        fixed: 'left',
        render: (type: string) => (type === 'stock_out' ? 'Stock Out' : 'Stock In'),
    },
    {
        title: 'Created At',
        dataIndex: 'created_at',
        key: 'created_at',
        render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: 'Updated At',
        dataIndex: 'updated_at',
        key: 'updated_at',
        render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
        title: 'Products',
        key: 'products',
        render: (_, record: Transaction) => (
            <Table
                columns={productColumns}
                dataSource={record.products}
                pagination={false}
                rowKey="id"
            />
        ),
    },
];

const productColumns: ColumnsType<ProductTrx> = [
    {
        title: 'Product ID',
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
        title: 'Quantity in Transaction',
        dataIndex: ['pivot', 'quantity'],
        key: 'quantity',
    },
];