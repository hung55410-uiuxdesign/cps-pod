import {Home, Calculator, Package, ShoppingCart, Users, Plus} from "lucide-react"

export type RouteItem = {
    path: string
    label: string
    icon: React.ElementType
    children?: RouteItem[]
}

export const routes: RouteItem[] = [
    { path: "/", label: "Trang chủ", icon: Home },
    {
        path: "/san-pham",
        label: "Sản phẩm",
        icon: Package,
        children: [
            { path: "/san-pham/them-san-pham", label: "Thêm sản phẩm", icon: Plus },
            { path: "/san-pham/danh-sach", label: "Danh sách sản phẩm", icon: Package },
        ]
    },
    // {
    //     path: "/san-pham-tron",
    //     label: "Sản phẩm trơn",
    //     icon: Shirt,
    //     children: [
    //         { path: "/san-pham-tron/[slug]", label: "Chi tiết", icon: Plus },
    //     ]
    // },
    { path: "/tinh-toan", label: "Tính toán", icon: Calculator },
    { path: "/don-hang", label: "Đơn hàng", icon: ShoppingCart },
    { path: "/khach-hang", label: "Khách hàng", icon: Users },
]
