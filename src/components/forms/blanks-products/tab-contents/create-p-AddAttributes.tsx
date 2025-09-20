'use client'

import {Button} from "@/components/ui/button";
import {useFormContext, useFieldArray} from "react-hook-form";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {InputFieldWidgets} from "@/components/features/widgets/InputFieldWidgets";

type Props = {
    onNextStepAction?: () => void;
    onPrevStepAction?: () => void;
};

export default function CreatePAddAttributes({onNextStepAction, onPrevStepAction}: Props) {
    const { control, trigger, register } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name: "attributes"
    })

    const handleNext = async () => {
        const isStepValid = await trigger();
        if (isStepValid && onNextStepAction) {
            onNextStepAction();
        }
    };

    const handlePreStep = () => {
        if (onPrevStepAction) {
            onPrevStepAction();
        }
    };
    return (
        <div className={'flex flex-col gap-8'}>
            <div className={'flex flex-col border-[0.5px] border-line rounded-xl overflow-hidden'}>
                <div className={'flex flex-row gap-3 items-center justify-between bg-muted p-3 border-b-[0.5px] border-line'}>
                    <p className={'font-semibold text-tx-default'}>Thuộc tính</p>
                    <Button
                        className="h-10 rounded-xl"
                        type="button"
                        onClick={() =>
                            append({
                                attr_id: Date.now() % 100000 + Math.floor(Math.random() * 1000),
                                name: "",
                            })
                        }
                    >
                        Thêm thuộc tính
                    </Button>
                </div>
                <div className="flex flex-col gap-3">
                    {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-3">
                            <FormField
                                control={control}
                                name={`attributes.${index}.name`}
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tên thuộc tính</FormLabel>
                                        <FormControl>
                                            <InputFieldWidgets placeholder="Nhập tên thuoc tinh" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-xl h-10"
                                onClick={() => remove(index)}
                            >
                                Xóa
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
            <div className={'w-full flex items-center justify-between mt-8'}>
                <Button type="button" variant={"outline"} onClick={handlePreStep} className={'w-fit rounded-xl h-10'}>
                    Trở lại
                </Button>
                <Button type="button" onClick={handleNext} className={'w-fit rounded-xl h-10 text-tx-foreground'}>
                    Tiếp tục
                </Button>
            </div>
        </div>
    )
}