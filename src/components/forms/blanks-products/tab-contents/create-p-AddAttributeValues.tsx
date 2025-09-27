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
import {Input} from "@/components/ui/input";
import {Plus, Trash2} from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {ScrollArea} from "@/components/ui/scroll-area";

type Props = {
    attrIndex: number;
};

export default function CreatePAddAttributeValues({ attrIndex }: Props) {
    const { control, watch, setValue } = useFormContext();

    const images: string[] = watch("images");

    const handleSelectImage = (image: string, index: number) => {
        setValue(`attributes.${attrIndex}.values.${index}.image`, image);
    }

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
                                    <InputFieldWidgets placeholder="Nhập giá trị" {...field} />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name={`attributes.${attrIndex}.values.${vIndex}.image`}
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col gap-1">
                                <FormLabel>Ảnh liên kết:</FormLabel>
                                <FormControl>
                                    <div className={'relative'}>
                                        <Dialog>
                                            <DialogTrigger className={'w-full'}>
                                                <Input
                                                    placeholder="Nhập giá trị"
                                                    {...field}
                                                    className={'rounded-xl w-full border-[0.5px] border-line shadow-none h-11'}
                                                />
                                            </DialogTrigger>
                                            <DialogContent className={'w-full min-w-[650px] rounded-xl'}>
                                                <DialogHeader>
                                                    <DialogTitle>Edit profile</DialogTitle>
                                                    <DialogDescription>
                                                        Make changes to your profile here. Click save when you&apos;re
                                                        done.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                <ScrollArea className={'h-[400px] w-full'}>
                                                    <div className={'grid grid-cols-4 w-full gap-4'}>
                                                        {images.length > 0 && images.map((image, index) => (
                                                            <div
                                                                key={index}
                                                                className={`w-full max-h-[220px] rounded-xl overflow-hidden cursor-pointer transition-all border-2 
                                                                ${field.value === image ? 'border-primary' : 'border-transparent hover:border-gray-300'}`}
                                                                onClick={() => handleSelectImage(image, index)}
                                                            >
                                                                <img src={image} className={'w-full h-full object-cover'}/>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </ScrollArea>


                                                <DialogFooter>
                                                    <DialogClose asChild>
                                                        <Button variant="outline">Cancel</Button>
                                                    </DialogClose>
                                                    <Button type="submit">Save changes</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button
                        type="button"
                        variant="link"
                        size={"icon"}
                        className="rounded-xl h-11 min-w-11 text-tx-muted cursor-pointer hover:text-danger"
                        onClick={() => removeValue(vIndex)}
                    >
                        <Trash2 />
                    </Button>
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
                            properties: "",
                            image: ""
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
