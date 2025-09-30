'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TabsData} from "@/lib/constants/ui/tabs-data";
import {FieldErrors, FormProvider, useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {SerializedEditorState} from "lexical";
import {formSchema, FormSchemaType} from "@/lib/types/forms/create-product-form-schema";
import {createProductAction, updateProductAction} from "@/lib/data/actions/product-actions";

import { useRouter } from "next/navigation"
import {toast} from "sonner";
import {ProductType} from "@/lib/types/product";

const initialValue = {
    root: {
        children: [
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: '',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
            },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
    },
} as unknown as SerializedEditorState

type Props = {
    product?: ProductType;
}

export default function CreateProduct({product}: Props) {
    const isEdit = Boolean(product);

    const defaultValue = TabsData[0]?.value;
    const [activeTab, setActiveTab] = useState(TabsData[0]?.value);
    const [completedSteps, setCompletedSteps] = useState<string[]>([])

    const router = useRouter()

    const form = useForm<FormSchemaType>({
        defaultValues: {
            title: product?.title ?? "",
            images: product?.images ?? [],
            primary_category_id: product?.categories?.[0]?.id?.toString() ?? "",
            price: product?.price?.toString() ?? "0",
            status: "active",
            description: product?.description ?? "",
            attributes: product?.attributes?.map(attr => ({
                ...attr,
                values: attr.values?.map(val => ({
                    ...val,
                    title: val.title ?? "",
                    title_id: val.title_id ?? "",
                    properties: val.properties ?? "",
                    image: val.image ?? "",
                })) ?? []
            })) ?? [],
            attribute_values: product?.attribute_values?.map(val => ({
                ...val,
                title: val.title ?? "",
                title_id: val.title_id ?? "",
                properties: val.properties ?? "",
                image: val.image ?? "",
            })) ?? [],
            descriptionState: initialValue,
            product_variants: product?.product_variants ?? []
        },
        mode: "onBlur",
        resolver: zodResolver(formSchema),
    });

    useEffect(() => {
        if (isEdit) {
            setCompletedSteps(TabsData.map((t) => t.value))
        }
    }, [isEdit])

    const handleCreateProduct = async (data: FormSchemaType) => {
        const response = await createProductAction(data)
        if (response?.success) {
            toast.success("Tạo sản phẩm thành công")
            router.push("/san-pham")
        } else {
            toast.error("Tạo sản phẩm thất bại")
        }
    }

    const handleUpdateProduct = async (productId: string, data: FormSchemaType) => {
        const response = await updateProductAction(productId, data)
        console.log('data', data)
        if (response?.success) {
            toast.success("Cập nhật sản phẩm thành công")
            router.push("/san-pham")
        } else {
            toast.error("Cập nhật sản phẩm thất bại")
        }
    }

    const onError = (errors: FieldErrors<FormSchemaType>) => {
        console.log("❌ Form submit lỗi", errors);
    };

    const handleNextStep = () => {
        const currentIndex = TabsData.findIndex((tab) => tab.value === activeTab)
        if (currentIndex < TabsData.length - 1) {
            const nextTab = TabsData[currentIndex + 1].value
            setCompletedSteps((prev) => [...new Set([...prev, activeTab])])
            setActiveTab(nextTab)
        } else {
            form.handleSubmit(onSubmit, onError)()
        }
    }

    const handlePrevStep = () => {
        const currentIndex = TabsData.findIndex((tab) => tab.value === activeTab)
        if (currentIndex > 0) {
            setActiveTab(TabsData[currentIndex - 1].value)
        }
    }

    const onSubmit = async (data: FormSchemaType) => {
        if (isEdit && product) {
            await handleUpdateProduct(product.id.toString(), data);
        } else {
            await handleCreateProduct(data);
        }
    };


    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <Tabs
                    value={activeTab}
                    defaultValue={defaultValue}
                    className="w-full"
                    onValueChange={(value) => {
                        if (isEdit || value === activeTab || completedSteps.includes(value)) {
                            setActiveTab(value)
                        }
                    }}
                >
                    <TabsList className="bg-transparent border-b-[0.5px] border-line w-full justify-start rounded-none p-0 h-fit gap-3 mb-6">
                        {TabsData.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                disabled={!isEdit && !completedSteps.includes(tab.value) && tab.value !== activeTab}
                                className="box-border px-0 pt-0 rounded-none text-base pb-2 font-normal
                  data-[state=active]:font-semibold data-[state=active]:shadow-none
                  data-[state=active]:border-b-[2px] data-[state=active]:border-primary"
                            >
                                <div className="p-3 rounded-xl hover:bg-muted">
                                    <span>{tab.name}</span>
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {TabsData.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            {tab.content({
                                onNextStep: handleNextStep,
                                onPrevStep: handlePrevStep,
                            })}
                        </TabsContent>
                    ))}
                </Tabs>
            </form>
        </FormProvider>
    )
}