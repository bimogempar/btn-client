import { ColumnsType } from "antd/es/table";
import { Category } from "./type";
import { Product } from "../product/type";
import moment from "moment";
import { CategoryPageContextType } from "@/app/dashboard/categories/page";
import { Dropdown, MenuProps } from "antd";
import { MoreOutlined } from '@ant-design/icons';
import { postDeleteCategory } from "./data";

export const columns = (ctx: CategoryPageContextType): ColumnsType<Category> => [
    {
        title: "ID",
        dataIndex: "id",
        key: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
        fixed: 'left',
        key: "name",
    },
    {
        title: "Description",
        dataIndex: "description",
        key: "description",
    },
    {
        title: "Products",
        dataIndex: "product",
        key: "product",
        render: (products: Product[]) => (
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - Stock: {product.stock}
                    </li>
                ))}
            </ul>
        ),
    },
    {
        title: "Created At",
        dataIndex: "created_at",
        key: "created_at",
        render: (date: string | null) =>
            date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : "N/A",
    },
    {
        title: "Updated At",
        dataIndex: "updated_at",
        key: "updated_at",
        render: (date: string | null) =>
            date ? moment(date).format("YYYY-MM-DD HH:mm:ss") : "N/A",
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
];

const onClickAction = (
    {
        key,
        ctx,
        row
    }: {
        key: string;
        ctx: CategoryPageContextType;
        row: Category;
    }) => {
    switch (key) {
        case 'edit':
            ctx.setCategory(row);
            ctx.setModalEditOpen();
            break;
        case 'delete':
            if (confirm('sure delete ?')) {
                postDeleteCategory(row.id)
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