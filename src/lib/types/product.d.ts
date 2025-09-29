import {PaginationType} from "@/lib/types/utils/pagination";

export type AttributeType = {
    id: number
    name: string
    values: AttributeValueType[]
}

export type AttributeValueType = {
    title: string
    prop_id: number
    title_id: string
    prop_name: string
    properties: string
}

export type ProductVariantAttributeType = {
    value: string
    value_id: string
    attribute_id: string
    attribute_name: string
}

export type ProductVariantType = {
    id: string
    sku: string
    user_id: string | null
    product_id: number
    price: string
    stock: number | null
    sku_id: string | null
    image: string | null
    attributes: ProductVariantAttributeType[]
    created_at: string
}

export type PodPositionType = {
    id: number
    product_id: number
    position: string
    name: string
    print_width_mm: number
    print_height_mm: number
    required_dpi: number
    mockup_image_url: string
    mask_image_url: string
    size_overrides: string[]
    created_at: string
    updated_at: string
    price: string
}

export type ProductType = {
    id: number
    sku: string
    supplier_id: string
    product_id: number | null
    marketplace_id: number | null
    marketplace: string | null
    title: string
    price: string
    meta_title: string | null
    images: string[]
    product_variants: ProductVariantType[]
    pod_positions: PodPositionType[]
    attributes: AttributeType[]
    attribute_values: AttributeValueType[]
    configs: string[]
    description: string | null
    meta_description: string | null
    state: string
    stock: number
    created_at: string
}

export type ProductListType = {
    products: ProductType[]
    pagination: PaginationType
    total: number
    per_page: number
    current_page: number
}
