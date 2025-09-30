import {searchCategoryService} from "@/lib/data/services/category-services";

export const searchCategoryAction = async (search: string) => {
    try {
        const response = await searchCategoryService(search);
        return response.data;
    } catch (error) {
        console.error("Error fetch category:", error);
        throw error;
    }
};