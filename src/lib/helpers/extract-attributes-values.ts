import {AttributeSchemaType, AttributeValueSchemaType} from "../types/forms/create-product-form-schema";

export function extractAttributeValues(
    attributes: AttributeSchemaType[]
): AttributeValueSchemaType[] {
    return attributes.flatMap((attr) =>
        (attr.values ?? []).map((val) => ({
            title: val.title,
            prop_id: Number(attr.id ?? 0),
            title_id: val.title_id ?? val.title,
            prop_name: attr.name,
            properties: `${attr.id ?? ""}:${val.properties ?? ""}`,
            image: val.image,
        }))
    )
}