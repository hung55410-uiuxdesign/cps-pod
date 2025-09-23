'use client'

import {Button} from "@/components/ui/button";
import {useFormContext, useFieldArray} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"
import {InputFieldWidgets} from "@/components/features/widgets/InputFieldWidgets";
import {Plus, Trash2} from "lucide-react";

type Props = {
    attrIndex: number;
};

export default function CreatePAddAttributeValues({ attrIndex }: Props) {
    const { control } = useFormContext();

    const { fields: valueFields, append: appendValue, remove: removeValue } = useFieldArray({
        control,
        name: `attributes.${attrIndex}.values`
    });

    return (
        <div className="flex flex-col gap-4">
            {valueFields.map((val, vIndex) => (
                <div key={val.id} className="flex flex-row items-end gap-3">
                    <FormField
                        control={control}
                        name={`attributes.${attrIndex}.values.${vIndex}.title`}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormLabel>Giá trị</FormLabel>
                                <FormControl>
                                    <div className={'relative'}>
                                        <InputFieldWidgets placeholder="Nhập giá trị" {...field} />
                                        <Button
                                            type="button"
                                            variant="link"
                                            size={"icon"}
                                            className="rounded-xl h-11 absolute top-0 right-0 min-w-11 text-tx-muted cursor-pointer hover:text-danger"
                                            onClick={() => removeValue(vIndex)}
                                        >
                                            <Trash2 />
                                        </Button>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />

                </div>
            ))}
            <div className={'h-full flex items-center'}>
                <Button
                    type="button"
                    className="rounded-xl -mx-2 h-11 px-3"
                    variant={'ghost'}
                    onClick={() =>
                        appendValue({
                            title: "",
                            title_id: "",
                            properties: ""
                        })
                    }
                >
                    <Plus />
                    Thêm giá trị
                </Button>
            </div>
        </div>
    )
}
