import {
    ProductVariantAttributeSchemaType,
    ProductVariantSchemaType
} from "@/lib/types/forms/create-product-form-schema";

export function generateVariants(
    attributes: {
        attr_id?: string
        name: string
        values?: { title: string; title_id?: string; properties?: string; image?: string }[]
    }[],
    defaultPrice: string = "0"
): ProductVariantSchemaType[] {
    const valueGroups: ProductVariantAttributeSchemaType[][] = attributes.map(attr =>
        (attr.values ?? []).map(val => ({
            attribute_id: String(attr.attr_id),
            attribute_name: attr.name,
            value: val.title,
            value_id: val.title_id || val.title,
            image: val.image || "",
        }))
    )

    const cartesian = <T,>(arr: T[][]): T[][] =>
        arr.reduce<T[][]>(
            (a, b) => a.flatMap(x => b.map(y => [...x, y])),
            [[]]
        )

    return cartesian(valueGroups).map((combo, idx) => ({
        idx,
        price: defaultPrice,
        attributes: combo,
    }))
}

export function mergeVariants(
    oldVariants: ProductVariantSchemaType[],
    newVariants: ProductVariantSchemaType[],
    defaultPrice: string
): ProductVariantSchemaType[] {
    return newVariants.map(nv => {
        const match = oldVariants.find(ov =>
            ov.attributes.every(attr =>
                nv.attributes.some(newAttr =>
                    newAttr.attribute_id === attr.attribute_id &&
                    newAttr.value_id === attr.value_id
                )
            )
        )
        return {
            ...nv,
            price: match ? match.price : defaultPrice,
        }
    })
}