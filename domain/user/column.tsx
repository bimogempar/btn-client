
import { ColumnsType } from "antd/es/table";
import { MoreOutlined } from '@ant-design/icons';
import { User } from "./type";
import moment from "moment";
import { Dropdown, MenuProps } from "antd";
import { UsersPageContextType } from "@/app/dashboard/users/page";
import { postDeleteUser } from "./data";

export const columns = (ctx: UsersPageContextType): ColumnsType<User> => [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 100,
    },
    {
        title: 'Name',
        dataIndex: 'name',
        fixed: 'left',
        key: 'name',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
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
    {
        title: 'Action',
        key: 'action',
        fixed: 'right',
        width: '10vh',
        align: 'center',
        render: (row) => {
            return (
                <div className="flex justify-center">
                    <Dropdown menu={{
                        items: menuAction,
                        onClick: (props) => onClickAction({ ...props, ctx, row }),
                    }} trigger={['click']}>
                        <MoreOutlined className="hover:cursor-pointer" />
                    </Dropdown>
                </div>
            )
        },
    },
]

const onClickAction = (
    {
        key,
        ctx,
        row
    }: {
        key: string;
        ctx: UsersPageContextType;
        row: User;
    }) => {
    switch (key) {
        case 'edit':
            ctx.setUser(row);
            ctx.setModalEditOpen();
            break;
        case 'delete':
            if (confirm('sure delete ?')) {
                postDeleteUser(row.email);
                ctx.refetch();
            }
            break;
        default:
            break;
    }
}

const menuAction: MenuProps['items'] = [
    {
        label: 'Edit',
        key: 'edit',
    },
    {
        label: 'Delete',
        key: 'delete',
    },
];