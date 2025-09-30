import {mutateClientData} from "@/lib/data/mutate-data";
import {getCpsPodServiceApiURL} from "@/lib/constants/utils";

export const searchCategoryService = async (search: string) => {
    return await mutateClientData(
        "get",
        `${getCpsPodServiceApiURL()}/api/1/category/search?q=${encodeURIComponent(search || "")}`
    )
}