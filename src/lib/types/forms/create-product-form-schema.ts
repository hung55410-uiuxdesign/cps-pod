import {z} from "zod";

const AttributeValueUISchema = z.object({
    title: z.string().min(1, "Vui lòng nhập giá trị"),
    title_id: z.string().optional(),
    properties: z.string().optional(),
    image: z.string().optional(),
})

const AttributeSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Tên thuộc tính không được để trống"),
    values: z.array(AttributeValueUISchema).optional()
})

const AttributeValueSchema = z.object({
    title: z.string(),
    prop_id: z.number(),
    title_id: z.string(),
    prop_name: z.string(),
    properties: z.string(),
    image: z.string().optional(),
})

const ProductVariantAttributeSchema = z.object({
    value: z.string(),
    value_id: z.string(),
    attribute_id: z.string().optional(),
    attribute_name: z.string(),
})

const ProductVariantSchema = z.object({
    idx: z.number().optional(),
    price: z.string()
        .nonempty({ message: "Giá sản phẩm không được để trống." })
        .refine(value => {
            const numValue = Number(value)
            return !isNaN(numValue) && numValue >= 0
        }, { message: "Giá sản phẩm phải là một số không âm." }),
    attributes: z.array(ProductVariantAttributeSchema),
})

export const formSchema = z.object({
    title: z.string().min(2, {
        message: "Tên người dùng phải có ít nhất 2 ký tự.",
    }),
    images: z.array(z.string().url({
        message: "Mỗi URL phải là một địa chỉ hình ảnh hợp lệ.",
    })).min(1, {
        message: "Vui lòng thêm ít nhất một hình ảnh.",
    }),
    category_id: z.string().nonempty({
        message: "Vui lòng chọn danh mục sản phẩm.",
    }),
    price: z.string()
        .nonempty({ message: "Giá sản phẩm không được để trống." })
        .refine(value => {
            const numValue = Number(value)
            return !isNaN(numValue) && numValue >= 0
        }, { message: "Giá sản phẩm phải là một số không âm." }),
    status: z.string().nonempty({
        message: "Trạng thái không được để trống.",
    }),
    description: z.string().nonempty({
        message: "Mô tả không được để trống",
    }),
    descriptionState: z.any().optional(),
    attributes: z.array(AttributeSchema),
    attribute_values: z.array(AttributeValueSchema).optional(),
    product_variants: z.array(ProductVariantSchema).optional(),
})

export type FormSchemaType = z.infer<typeof formSchema>;
export type AttributeSchemaType = z.infer<typeof AttributeSchema>;
export type AttributeValueSchemaType = z.infer<typeof AttributeValueSchema>;
export type ProductVariantSchemaType = z.infer<typeof ProductVariantSchema>;
export type ProductVariantAttributeSchemaType = z.infer<typeof ProductVariantAttributeSchema>;