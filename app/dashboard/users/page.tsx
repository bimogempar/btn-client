"use client"
import AntdTable from '@/components/AntdTable';
import { useModal } from '@/context/ModalContext';
import { column } from '@/domain/user/column';
import ModalCreateUser from '@/domain/user/components/ModalCreateUser';
import { fetchUsers } from '@/domain/user/data'
import React from 'react'
import { useQuery } from 'react-query'

export default function UsersPage() {
    const { data, isLoading, refetch } = useQuery('users', fetchUsers);
    const { isModalVisible, showModal, hideModal } = useModal();
    return (
        <div>
            <h1 className="text-xl font-semibold mb-4">Users</h1>
            <button
                className="text-white rounded p-2 bg-[#FF8225] hover:bg-[#e57521] mb-4"
                onClick={showModal}
            >
                Create
            </button>
            <AntdTable
                rowKey="id"
                onclickRow={() => { }}
                onChangeRowSelect={(selectedRowKeys, selectedRows) => console.log(selectedRowKeys, selectedRows)}
                loading={isLoading}
                size="middle"
                tableLayout="fixed"
                dataSource={data}
                columns={column}
            />
            {isModalVisible && (
                <ModalCreateUser
                    visible={isModalVisible}
                    onClose={hideModal}
                    onSuccess={refetch}
                />
            )}
        </div>
    )
}
