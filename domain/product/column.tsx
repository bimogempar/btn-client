/* eslint-disable @next/next/no-img-element */
import { ColumnsType } from "antd/es/table"
import { MoreOutlined } from '@ant-design/icons';
import { Product } from "./type"
import moment from "moment";
import { Dropdown, MenuProps, } from "antd";
import { ProductsPageContextType } from "@/app/dashboard/products/page";
import { postDeleteProduct } from "./data";

export const columns = (ctx: ProductsPageContextType): ColumnsType<Product> => [
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
        ctx: ProductsPageContextType;
        row: Product;
    }) => {
    switch (key) {
        case 'edit':
            ctx.setProduct(row);
            ctx.setModalEditOpen();
            break;
        case 'delete':
            if (confirm('sure delete ?')) {
                postDeleteProduct(row.id);
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