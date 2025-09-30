'use server'

import {
    createProductService,
    getDetailsProductService,
    getProductsServices, updateProductService
} from "@/lib/data/services/product-services";
import {FormSchemaType} from "@/lib/types/forms/create-product-form-schema";
import {GetProductsParams} from "@/lib/types/utils/filter";

export const getProductsAction = async (params?: GetProductsParams) => {
    try {
        const response = await getProductsServices(params)
        return response?.data
    } catch (error) {
        console.error("❌ Error fetch products:", error)
        throw error
    }
}

export const createProductAction = async (data: FormSchemaType) => {
    try {
        const response = await createProductService(data);
        return response;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
}

export const getProductByIdAction = async (id: string) => {
    try {
        const response = await getDetailsProductService(id);
        return response.data;
    } catch (error) {
        console.error("Error getting product:", error);
        throw error;
    }
}

export const updateProductAction = async (productId: string, data: FormSchemaType) => {
    try {
        const response = await updateProductService(productId, data);
        return response;
    } catch (error) {
        console.error("Error editing product:", error);
        throw error;
    }
}
