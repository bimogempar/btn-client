"use client"
import AntdTable from '@/components/AntdTable';
import { columns } from '@/domain/user/column';
import ModalCreateUser from '@/domain/user/components/ModalCreateUser';
import ModalEditUser from '@/domain/user/components/ModalEditUser';
import { fetchUsers } from '@/domain/user/data'
import { User } from '@/domain/user/type';
import React, { createContext, useContext, useState } from 'react'
import { useQuery } from 'react-query'

export default function UsersPage() {
    const { data, isLoading, refetch } = useQuery('users', fetchUsers);
    const [isModalOpen, setModalOpen] = useState({
        user: null as unknown as User || null,
        createUser: false,
        editUser: false,
    });

    const valueCtx = {
        refetch,
        user: isModalOpen.user,
        isOpenModalCreate: isModalOpen.createUser,
        isOpenModalEdit: isModalOpen.editUser,
        setUser: (user: User) => setModalOpen(prev => ({ ...prev, user })),
        setModalCreateOpen: () => setModalOpen(prev => ({ ...prev, createUser: true })),
        setModalCreateClose: () => setModalOpen(prev => ({ ...prev, createUser: false })),
        setModalEditOpen: () => setModalOpen(prev => ({ ...prev, editUser: true })),
        setModalEditClose: () => setModalOpen(prev => ({ ...prev, editUser: false })),
    }
    const tableColumns = columns(valueCtx);
    return (
        <UsersPageContext.Provider value={valueCtx}>
            <h1 className="text-xl font-semibold mb-4">Users</h1>
            <button
                className="text-white rounded p-2 bg-[#FF8225] hover:bg-[#e57521] mb-4"
                onClick={valueCtx.setModalCreateOpen}
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
                columns={tableColumns}
            />
            {isModalOpen.createUser && <ModalCreateUser />}
            {isModalOpen.editUser && <ModalEditUser />}
        </UsersPageContext.Provider>
    )
}

export interface UsersPageContextType {
    refetch: () => void;
    user: User;
    isOpenModalCreate: boolean;
    isOpenModalEdit: boolean;
    setUser: (user: User) => void;
    setModalCreateOpen: () => void
    setModalCreateClose: () => void;
    setModalEditOpen: () => void;
    setModalEditClose: () => void;
}

const UsersPageContext = createContext<UsersPageContextType | undefined>(undefined)

export const useUsersPage = () => {
    const ctx = useContext(UsersPageContext);
    if (!ctx) {
        throw new Error('useUsersPage must be used within a UsersPageProvider');
    }
    return ctx;
}