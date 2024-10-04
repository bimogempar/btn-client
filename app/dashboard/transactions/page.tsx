"use client";
import AntdTable from '@/components/AntdTable';
import { column } from '@/domain/transaction/column';
import { fetchTransactions } from '@/domain/transaction/data';
import React from 'react';
import { useQuery } from 'react-query';

export default function TransactionsPage() {
    const { data, isLoading } = useQuery('transactions', fetchTransactions);
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Transactions</h1>
            <AntdTable
                rowKey="id"
                onclickRow={(record) => console.log(record)}
                onChangeRowSelect={(selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)}
                loading={isLoading}
                size="middle"
                tableLayout="fixed"
                dataSource={data}
                columns={column}
            />
        </div>
    )
}
