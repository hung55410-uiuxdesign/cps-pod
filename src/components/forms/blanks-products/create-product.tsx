'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {TabsData} from "@/lib/constants/ui/tabs-data";
import {z} from "zod";
import {FormProvider, useForm} from "react-hook-form";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button} from "@/components/ui/button";
import {SerializedEditorState} from "lexical";

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

const AttributeSchema = z.object({
    attr_id: z.number().optional(),
    name: z.string(),
})

const AttributeValueSchema = z.object({
    title: z.string(),
    prop_id: z.number(),
    title_id: z.string(),
    prop_name: z.string(),
    properties: z.string(),
});

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Tên người dùng phải có ít nhất 2 ký tự.",
    }),
    images: z.array(
        z.string().url({
            message: "Mỗi URL phải là một địa chỉ hình ảnh hợp lệ.",
        })
    ).min(1, {
        message: "Vui lòng thêm ít nhất một hình ảnh.",
    }),
    category_id: z.string().nonempty({
        message: "Vui lòng chọn danh mục sản phẩm.",
    }),
    price: z.string()
        .nonempty({
            message: "Giá sản phẩm không được để trống."
        })
        .refine((value) => {
            const numValue = Number(value);
            return !isNaN(numValue) && numValue >= 0;
        }, {
            message: "Giá sản phẩm phải là một số không âm."
        }),
    status: z.string().nonempty({
        message: "Trạng thái không được để trống.",
    }),
    description: z.string().nonempty({
        message: "Mô tả không được để trống",
    }),
    descriptionState: z.any().optional(),
    attributes: z.array(AttributeSchema),
    attribute_values: z.array(AttributeValueSchema).optional(),
});

type FormValueType = z.infer<typeof formSchema>;

export default function CreateProduct() {
    const defaultValue = TabsData[0]?.value;
    const [activeTab, setActiveTab] = useState(TabsData[0]?.value);

    const form = useForm<FormValueType>({
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
        },
        mode: "onBlur",
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (data: FormValueType) => {
        const { descriptionState, ...rest } = data
        console.log("✅ Form submit thành công", rest)
    }


    const onError = (errors: any) => {
        console.log("❌ Form submit lỗi", errors);
    };

    const handleNextStep = () => {
        const currentIndex = TabsData.findIndex(tab => tab.value === activeTab);
        if (currentIndex < TabsData.length - 1) {
            setActiveTab(TabsData[currentIndex + 1].value);
        }
    };

    const handlePrevStep = () => {
        const currentIndex = TabsData.findIndex(tab => tab.value === activeTab);
        if (currentIndex < TabsData.length - 1) {
            setActiveTab(TabsData[currentIndex - 1].value);
        }
    };

    return (
        <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                <Tabs value={activeTab} defaultValue={defaultValue} className="w-full">
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
                <Button type={'submit'} className={'mt-8'}>Submit</Button>
            </form>
        </FormProvider>
    )
}