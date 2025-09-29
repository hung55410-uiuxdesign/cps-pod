'use client'

import FilterWidget from "@/components/features/widgets/FilterWidget";
import {ProductFilterItem, ProductFilterPayload} from "@/lib/types/utils/filter";
import {ItemProduct} from "@/components/utils/ItemProduct";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import {ProductListType} from "@/lib/types/product";

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

type Props = {
    data: ProductListType;
}

export default function ProductList({ data }: Props) {
    const handleFilterChange = (payload: ProductFilterPayload) => {
        console.log("Filter changed:", payload);
    };

    const products = data?.products || [];

    return (
        <>
            <FilterWidget filters={filters} onChange={handleFilterChange} />
            <div className={'grid grid-cols-6 gap-4'}>
                {products?.map((product, index) => (
                    <ItemProduct key={index} item={product} />
                ))}
            </div>
            <Pagination className={'w-full justify-end'}>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>
                            2
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}