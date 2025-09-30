'use server'

import {mutateClientData} from "@/lib/data/mutate-data";
import {getCpsPodServiceApiURL} from "@/lib/constants/utils";
import {FormSchemaType} from "@/lib/types/forms/create-product-form-schema";
import {GetProductsParams} from "@/lib/types/utils/filter";

export const getProductsServices = async (params?: GetProductsParams) => {
    const query = new URLSearchParams()

    if (params?.page) query.append("page", params.page.toString())
    if (params?.per_page) query.append("per_page", params.per_page.toString())
    if (params?.category) query.append("category", params.category)
    if (params?.search) query.append("search", params.search)
    if (params?.sortBy) query.append("sortBy", params.sortBy)
    if (params?.sortOrder) query.append("sortOrder", params.sortOrder)

    const url = `${getCpsPodServiceApiURL()}/api/1/supplier/products?${query.toString()}`

    return await mutateClientData("GET", url)
}

export const createProductService = async (data: FormSchemaType) => {
    return await mutateClientData("post", `${getCpsPodServiceApiURL()}/api/1/supplier/products`, data)
}

export const getDetailsProductService = async (id: string) => {
    return await mutateClientData("get", `${getCpsPodServiceApiURL()}/api/1/supplier/products/${id}`)
}

export const updateProductService = async (productId: string, data: FormSchemaType) => {
    return await mutateClientData("put", `${getCpsPodServiceApiURL()}/api/1/supplier/products/${productId}`, data)
}