import { ColumnsType } from "antd/es/table";
import { Category } from "./type";
import { Product } from "../product/type";
import moment from "moment";

export const columns: ColumnsType<Category> = [
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
];