'use client'

import FilterWidget from "@/components/features/widgets/FilterWidget";
import {ProductFilterItem, ProductFilterPayload} from "@/lib/types/utils/filter";
import {ItemProduct} from "@/components/utils/ItemProduct";
import {ProductListType, ProductType} from "@/lib/types/product";
import PaginationWidget from "@/components/features/widgets/PaginationWidget";
import {useEffect, useState} from "react";
import {getProductByIdAction, getProductsAction} from "@/lib/data/actions/product-actions";
import {PaginationType} from "@/lib/types/utils/pagination";

const filters: ProductFilterItem[] = [
    {
        type: "category",
        options: [
            { value: "", label: "Tất cả", quantity: "190" },
            { value: "t-shirt", label: "T-Shirt", quantity: "90" },
            { value: "hoodies", label: "Hoodies", quantity: "60" },
            { value: "jackets", label: "Jackets", quantity: "40" },
        ],
        value: "",
    },
    {
        type: "search",
        placeholder: "Tìm kiếm sản phẩm",
        value: "",
    },
    {
        type: "sort",
        options: [
            { value: "asc", label: "Giá tăng dần" },
            { value: "desc", label: "Giá giảm dần" },
        ],
        value: "",
    },
    {
        type: "view",
        options: ["grid", "list"],
        value: "grid",
    },
];

export default function ProductList() {
    const [products, setProducts] = useState<ProductType[]>([]);

    const [pagination, setPagination] = useState<PaginationType>({current_page: 1, per_page: 10, total: 0});

    const [filtersProduct, setFiltersProduct] = useState<ProductFilterPayload>({
        category: "",
        searchQuery: "",
        sortBy: undefined,
        sortOrder: undefined,
        view: "grid",
    })

    const handleFilterChange = (payload: ProductFilterPayload) => {
        setFiltersProduct((prev) => ({
            ...prev,
            ...payload,
        }))
        setPagination((prev) => ({
            ...prev,
            current_page: 1,
        }))
    }

    const handlePageChange = (page: number) => {
        setPagination((prev) => ({
            ...prev,
            current_page: page,
        }))
    }

    useEffect(() => {
        (async () => {
            const response: ProductListType = await getProductsAction({
                page: pagination.current_page,
                per_page: pagination.per_page,
            })

            setProducts(response.products)
            setPagination({
                current_page: response.current_page,
                per_page: response.per_page,
                total: response.total,
            })
        })()
    }, [pagination.current_page, pagination.per_page]);

    return (
        <>
            <FilterWidget filters={filters} onChange={handleFilterChange} />
            <div className={'grid grid-cols-6 gap-4'}>
                {products?.map((product, index) => (
                    <ItemProduct key={index} item={product} />
                ))}
            </div>
            <PaginationWidget
                total={pagination.total}
                perPage={pagination.per_page}
                currentPage={pagination.current_page}
                onPageChange={handlePageChange}
            />
        </>
    )
}