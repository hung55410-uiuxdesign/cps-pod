'use server'

import {
    createProductService,
    getDetailsProductService,
    getProductsServices
} from "@/lib/data/services/product-services";
import {FormSchemaType} from "@/lib/types/forms/create-product-form-schema";

export const getProductsAction = async () => {
    try {
        const response = await getProductsServices();
        return response.data;
    } catch (error) {
        console.error("Error fetch products:", error);
        throw error;
    }
};

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