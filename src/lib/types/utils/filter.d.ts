export type ProductListView = "grid" | "list";

export type FilterCategory = {
    type: "category";
    value?: string;
    options: { label: string; value: string, quantity?: string }[];
};

export type FilterSearch = {
    type: "search";
    value: string;
    placeholder?: string;
};

export type FilterSort = {
    type: "sort";
    value?: string;
    options: { label: string; value: string }[];
};

export type FilterView = {
    type: "view";
    value: ProductListView;
    options: ProductListView[];
};

export type ProductFilterItem =
    | FilterCategory
    | FilterSearch
    | FilterSort
    | FilterView;

export type ProductFilterPayload = {
    category?: string;
    searchQuery?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    view?: ProductListView;
};

export type GetProductsParams = {
    page?: number
    per_page?: number
    category?: string
    search?: string
    sortBy?: string
    sortOrder?: "asc" | "desc"
}