export type CategoryType = {
    id: string | number | null;
    name: {
        "en": string;
        "vi": string;
    };
    slug: string | null;
    path: string | null;
    parent_id: number | null;
    parent_name: {
        "en": string;
        "vn": string;
    } | null;
    position: number | null;
    has_children: boolean;
}