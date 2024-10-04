"use client"
import AntdTable from '@/components/AntdTable';
import { column } from '@/domain/user/column';
import { fetchUsers } from '@/domain/user/data'
import React from 'react'
import { useQuery } from 'react-query'

export default function UsersPage() {
    const { data, isLoading } = useQuery('users', fetchUsers);
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Users</h1>
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
