'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TabsData} from "@/lib/constants/ui/tabs-data";
import {FieldErrors, FormProvider, useForm} from "react-hook-form";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {SerializedEditorState} from "lexical";
import {formSchema, FormSchemaType} from "@/lib/types/forms/create-product-form-schema";
import {createProductAction} from "@/lib/data/actions/product-actions";

import { useRouter } from "next/navigation"
import {toast} from "sonner";

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

export default function CreateProduct() {
    const defaultValue = TabsData[0]?.value;
    const [activeTab, setActiveTab] = useState(TabsData[0]?.value);
    const [completedSteps, setCompletedSteps] = useState<string[]>([])

    const router = useRouter()

    const form = useForm<FormSchemaType>({
        defaultValues: {
            title: "",
            images: [],
            category_id: "",
            price: "0",
            status: "active",
            description: "",
            attributes: [],
            attribute_values: [],
            descriptionState: initialValue,
            product_variants: []
        },
        mode: "onBlur",
        resolver: zodResolver(formSchema),
    });

    const onSubmit = async (data: FormSchemaType) => {
        const response = await createProductAction(data)
        if (response?.success) {
            toast.success("Tao san pham thanh cong");
            router.push("/san-pham")
        } else {
            toast.error("Tao san pham that bai");
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

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <Tabs
                    value={activeTab}
                    defaultValue={defaultValue}
                    className="w-full"
                    onValueChange={(value) => {
                        if (value === activeTab || completedSteps.includes(value)) {
                            setActiveTab(value)
                        }
                    }}
                >
                    <TabsList className={'bg-transparent border-b-[0.5px] border-line w-full justify-start rounded-none p-0 h-fit gap-3 mb-6'}>
                        {TabsData.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={'box-border px-0 pt-0 rounded-none text-base pb-2 font-normal data-[state=active]:font-semibold data-[state=active]:shadow-none data-[state=active]:border-b-[2px] data-[state=active]:border-primary'}
                            >
                                <div className={'p-3 rounded-xl hover:bg-muted'}>
                                    <span>{tab.name}</span>
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {TabsData.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            {tab.content({ onNextStep: handleNextStep, onPrevStep: handlePrevStep })}
                        </TabsContent>
                    ))}
                </Tabs>
            </form>
        </FormProvider>
    )
}