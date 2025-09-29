'use server'

import {mutateClientData} from "@/lib/data/mutate-data";
import {getCpsPodServiceApiURL} from "@/lib/constants/utils";
import {FormSchemaType} from "@/lib/types/forms/create-product-form-schema";

export const getProductsServices = async () => {
    return await mutateClientData("get", `${getCpsPodServiceApiURL()}/api/1/supplier/products`)
}

export const createProductService = async (data: FormSchemaType) => {
    return await mutateClientData("post", `${getCpsPodServiceApiURL()}/api/1/supplier/products`, data)
}

export const getDetailsProductService = async (id: string) => {
    return await mutateClientData("get", `${getCpsPodServiceApiURL()}/api/1/supplier/products/${id}`)
}