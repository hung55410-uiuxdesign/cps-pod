'use client'

import {InputFieldWidgets} from "@/components/features/widgets/InputFieldWidgets";
import { Button } from "@/components/ui/button"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {useState} from "react";
import {useFormContext} from "react-hook-form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {cn} from "@/lib";
import {Check, ChevronsUpDown} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Props = {
    onNextStepAction?: () => void;
    onPrevStepAction?: () => void;
};

const categories = [
    { label: "English", id: "en" },
    { label: "French", id: "fr" },
    { label: "German", id: "de" },
    { label: "Spanish", id: "es" },
    { label: "Portuguese", id: "pt" },
    { label: "Russian", id: "ru" },
    { label: "Japanese", id: "ja" },
    { label: "Korean", id: "ko" },
    { label: "Chinese", id: "zh" },
] as const

export default function CreatePBasicsInfo({ onNextStepAction }: Props) {
    const { control, trigger, setValue, watch } = useFormContext();

    const images = watch('images') || [];
    const handleUrlSelect = (url: string) => {
        const currentImages = images;
        const newImages = [...currentImages, url];
        setValue('images', newImages, { shouldValidate: true });
    };

    const handleNext = async () => {
        const isStepValid = await trigger(["title", "images", "category_id", "price", "status"]);
        if (isStepValid && onNextStepAction) {
            onNextStepAction();
        }
    };

    return (
        <div className="grid grid-cols-2 gap-8">
            <FormField
                control={control}
                name={'images'}
                render={({field}) => (
                    <FormItem className={'flex flex-col gap-2'}>
                        <FormLabel>Ảnh sản phẩm:</FormLabel>
                        <FormControl>
                            <InputFieldWidgets
                                type="url"
                                {...field}
                                onUrlSelect={handleUrlSelect}
                                currentUrl={images[0]}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className={'flex flex-col gap-8'}>
                <FormField
                    control={control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tiêu đề:</FormLabel>
                            <FormControl>
                                <InputFieldWidgets placeholder="Nhập tên sản phẩm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap">
                            <FormLabel>Danh mục:</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className={cn(
                                                "h-11 rounded-xl justify-between",
                                                !field.value && "text-muted-foreground"
                                            )}
                                        >
                                            {field.value
                                                ? categories.find(
                                                    (cate) => cate.id === field.value
                                                )?.label
                                                : "Chọn danh mục"}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align={"start"} className="p-0 shadow-2xl overflow-hidden border-[0.5px] border-line rounded-xl">
                                    <Command>
                                        <CommandInput
                                            placeholder="Tìm danh mục..."
                                            className="h-11"
                                        />
                                        <CommandList>
                                            <CommandEmpty>No framework found.</CommandEmpty>
                                            <CommandGroup>
                                                {categories.map((cate) => (
                                                    <CommandItem
                                                        value={cate.label}
                                                        key={cate.id}
                                                        onSelect={() => {
                                                            setValue("category_id", cate.id)
                                                        }}
                                                    >
                                                        {cate.label}
                                                        <Check
                                                            className={cn(
                                                                "ml-auto",
                                                                cate.id === field.value
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Giá bán:</FormLabel>
                            <FormControl>
                                <InputFieldWidgets type={'number'} placeholder="Nhập giá bán sản phẩm" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Separator />

                <FormField
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <FormItem className={'flex flex-col gap'}>
                            <FormLabel>Trạng thái</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className={'rounded-xl shadow-none h-11'}>
                                        <SelectValue placeholder="Chọn trạng thái" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className={'rounded-xl border-[0.5px] border-line shadow-2xl max-w-64'}>
                                    <SelectItem value="active" className={'h-11'}>Hoạt động</SelectItem>
                                    <SelectItem value="draf" className={'h-11'}>Bản nháp</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

            </div>

            <div className={'col-span-2 w-full flex items-center justify-between'}>
                <div />
                <Button type="button" onClick={handleNext} className={'w-fit rounded-xl h-10 text-tx-default'}>
                    Tiếp tục
                </Button>
            </div>
        </div>
    )
}