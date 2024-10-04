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
            <div className="grid grid-cols-3 gap-4">
                {record.products.map((product) => (
                    <div key={product.id} className="p-2 border rounded-md">
                        <div><strong>{product.name}</strong></div>
                        <div>Quantity: {product.pivot?.quantity}</div>
                        <div>Stock: {product.stock}</div>
                    </div>
                ))}
            </div>
        ),
    },
];