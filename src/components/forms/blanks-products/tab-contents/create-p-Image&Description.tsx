'use client'

import {InputFieldWidgets} from "@/components/features/widgets/InputFieldWidgets";
import {Button} from "@/components/ui/button"
import {useFormContext} from "react-hook-form";
import {XCircle} from "lucide-react";
import {Editor} from "@/components/blocks/editor-x/editor";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";

type Props = {
    onNextStepAction?: () => void;
    onPrevStepAction?: () => void;
};

export default function CreatePImageDescription({onNextStepAction, onPrevStepAction}: Props) {
    const {setValue, watch, trigger, control} = useFormContext();

    const images: string[] = watch('images') || [];
    const description: string = watch('description');

    const handleUrlSelect = (url: string) => {
        const newImages = [...(images), url];
        setValue('images', newImages, { shouldValidate: true });
    };

    const handleRemoveImage = (indexToRemove: number) => {
        const newImages = images.filter((_, index) => index !== indexToRemove);
        setValue('images', newImages, {shouldValidate: true});
    };

    const handleNext = async () => {
        const isStepValid = await trigger(["images"]);
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
        <div className="flex flex-col gap-8">
            <div className="grid grid-cols-6 gap-4">
                {images.slice(1).map((url, index) => (
                    <div key={index} className="relative w-full max-h-[220px]">
                        <img
                            src={url}
                            alt={`Preview ${index}`}
                            className="w-full h-full object-cover rounded-xl border-[0.5px] border-line"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 p-1 rounded-full bg-white/80"
                        >
                            <XCircle size={20} className="text-red-500" />
                        </button>
                    </div>
                ))}
                <InputFieldWidgets
                    type="url"
                    onUrlSelect={handleUrlSelect}
                />
            </div>

            <FormField
                control={control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Mô tả sản phẩm:</FormLabel>
                        <FormControl>
                            <Editor
                                editorSerializedState={undefined}
                                onHtmlChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {description && (
                <div
                    className="prose max-w-none border p-4 rounded-lg bg-gray-50"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            )}

            <div className={'w-full flex items-center justify-between mt-8'}>
                <Button type="button" variant={"outline"} onClick={handlePreStep} className={'w-fit rounded-xl h-10'}>
                    Trở lại
                </Button>
                <Button type="button" onClick={handleNext} className={'w-fit rounded-xl h-10 text-tx-default'}>
                    Tiếp tục
                </Button>
            </div>
        </div>
    );
}