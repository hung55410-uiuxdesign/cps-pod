'use client'

import {Button} from "@/components/ui/button";
import {useFormContext, useFieldArray} from "react-hook-form";
import {Separator} from "@/components/ui/separator";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {InputFieldWidgets} from "@/components/features/widgets/InputFieldWidgets";
import CreatePAddAttributeValues from "@/components/forms/blanks-products/tab-contents/create-p-AddAttributeValues";
import Empty from "@/components/utils/Empty";
import {extractAttributeValues} from "@/lib/helpers/extract-attributes-values";
import {Plus, Trash2} from "lucide-react";

type Props = {
    onNextStepAction?: () => void;
    onPrevStepAction?: () => void;
};

export default function CreatePAddAttributes({onNextStepAction, onPrevStepAction}: Props) {
    const { control, watch, setValue, trigger } = useFormContext();

    const { fields: attributeFields, append: appendAttribute, remove: removeAttribute } = useFieldArray({
        control,
        name: "attributes"
    });

    const attributes = watch("attributes");

    const attributes_value = extractAttributeValues(attributes);

    const handleNext = async () => {
        const isStepValid = await trigger(["attributes"]);
        setValue("attribute_values", attributes_value);
        if(isStepValid && onNextStepAction) onNextStepAction();
    };

    const handlePreStep = () => {
        if (onPrevStepAction) onPrevStepAction();
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col border-[0.5px] border-line rounded-xl overflow-hidden">
                <div className="flex flex-row gap-3 items-center justify-between bg-muted p-3 border-b-[0.5px] border-line">
                    <p className="font-semibold text-tx-default">Thuộc tính</p>
                    <Button
                        className="h-10 rounded-xl opacity-0"
                        type="button"
                        variant={'ghost'}
                    >
                        <Plus />
                        Thêm thuộc tính
                    </Button>
                </div>
                <div className="flex flex-col gap-3 px-6 py-4">
                    {attributeFields.length > 0 ? (
                        attributeFields.map((attr, attrIndex) => (
                            <div key={attrIndex} className="flex flex-col gap-3">
                                <div className="grid grid-cols-2 gap-6 py-3">
                                    <FormField
                                        control={control}
                                        name={`attributes.${attrIndex}.name`}
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormLabel>Tên thuộc tính</FormLabel>
                                                <FormControl>
                                                    <InputFieldWidgets placeholder="Nhập tên thuộc tính" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <CreatePAddAttributeValues attrIndex={attrIndex} />

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-xl w-fit h-10 max-w-[250px]"
                                        onClick={() => removeAttribute(attrIndex)}
                                    >
                                        <Trash2 />
                                        Xóa thuộc tính
                                    </Button>
                                </div>
                                {attrIndex < attributeFields.length - 1 && <Separator />}
                            </div>
                        ))
                    ) : (
                        <Empty
                            title="Chưa có thuộc tính"
                            caption="Hãy thêm thuộc tính đầu tiên của bạn."
                            action={{
                                label: "Tạo Attribute",
                                onClick: () => {
                                    appendAttribute({
                                        id: Date.now().toString(),
                                        name: "",
                                        values: []
                                    })
                                },
                            }}
                        />
                    )}
                </div>
                <div className={'w-full p-3 bg-muted border-t border-line'}>
                    <Button
                        className="h-10 rounded-xl"
                        type="button"
                        onClick={() =>
                            appendAttribute({
                                id: Date.now().toString(),
                                name: "",
                                values: []
                            })
                        }
                    >
                        <Plus />
                        Thêm thuộc tính
                    </Button>
                </div>
            </div>

            <div className="w-full flex items-center justify-between mt-8">
                <Button type="button" variant="outline" onClick={handlePreStep} className="w-fit rounded-xl h-10">
                    Trở lại
                </Button>
                <Button type="button" onClick={handleNext} className="w-fit rounded-xl h-10 text-tx-foreground">
                    Tiếp tục
                </Button>
            </div>
        </div>
    )
}
