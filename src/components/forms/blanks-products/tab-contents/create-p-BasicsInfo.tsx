'use client'

import {InputFieldWidgets} from "@/components/features/widgets/InputFieldWidgets";
import {Button} from "@/components/ui/button"
import {FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form"
import {useFormContext} from "react-hook-form";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {cn} from "@/lib";
import {Check, ChevronsUpDown} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {
    Dialog,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {ProductVariantSchemaType} from "@/lib/types/forms/create-product-form-schema";
import {useEffect, useState } from "react";
import {showToast} from "@/lib/constants/ui/toast";

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

    const images: string[] = watch('images') || [];
    const variants: ProductVariantSchemaType[] = watch("product_variants") || [];
    const price = watch('price');

    const [openDialog, setOpenDialog] = useState(false);
    const [newPrice, setNewPrice] = useState<string | null>(null);
    const [oldPrice, setOldPrice] = useState<string | null>(null);

    useEffect(() => {
        if (oldPrice === null && price != null) {
            setOldPrice(String(price));
        }
    }, [price, oldPrice, variants.length]);

    const handleUrlSelect = (url: string) => {
        const newImages = [...(images), url];
        setValue('images', newImages, { shouldValidate: true });
    };

    const handleNext = async () => {
        const isStepValid = await trigger(["images", "title", "category_id"]);
        if (!isStepValid) {
            showToast("error", [], "Vui long nhap day du thong tin");
            return;
        }

        const currentPrice = watch("price");
        const currentPriceStr = currentPrice != null ? String(currentPrice) : null;

        if (variants.length > 0 && oldPrice !== null && currentPriceStr !== oldPrice) {
            setNewPrice(currentPriceStr);
            setOpenDialog(true);
            return;
        }

        setOldPrice(currentPriceStr);
        if (onNextStepAction) onNextStepAction();
    };

    const applyAll = () => {
        if (newPrice != null) {
            setValue(
                "product_variants",
                variants.map((v: ProductVariantSchemaType) => ({ ...v, price: newPrice }))
            );
            setOldPrice(newPrice);
        }
        setOpenDialog(false);
        if (onNextStepAction) onNextStepAction();
    };

    const applySameAsOld = () => {
        if (newPrice != null && oldPrice != null) {
            setValue(
                "product_variants",
                variants.map((v: ProductVariantSchemaType) =>
                    v.price === oldPrice ? { ...v, price: newPrice } : v
                )
            );
            setOldPrice(newPrice);
        }
        setOpenDialog(false);
        if (onNextStepAction) onNextStepAction();
    };

    const keepVariants = () => {
        if (newPrice != null) {
            setOldPrice(newPrice);
        }
        setOpenDialog(false);
        if (onNextStepAction) onNextStepAction();
    };

    const cancelChange = () => {
        if (oldPrice != null) {
            setValue("price", oldPrice, { shouldValidate: true });
        }
        setNewPrice(null);
        setOpenDialog(false);
    };

    return (
        <>
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
                    <Button type="button" onClick={handleNext} className={'w-fit rounded-xl h-10 text-tx-foreground'}>
                        Tiếp tục
                    </Button>
                </div>
            </div>

            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className={'rounded-xl'}>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-2">
                        <div
                            onClick={keepVariants}
                            className="flex flex-col p-4 rounded-xl border-[0.5px] border-line gap cursor-pointer hover:bg-muted"
                        >
                            <p className="font-semibold text-tx-muted text-lg">Không áp dụng</p>
                            <p className="text-muted-foreground">
                                Giữ nguyên giá của các SKU, chỉ thay đổi giá gốc sản phẩm.
                            </p>
                        </div>

                        <div
                            onClick={applySameAsOld}
                            className="flex flex-col p-4 rounded-xl border-[0.5px] border-line gap cursor-pointer hover:bg-muted"
                        >
                            <p className="font-semibold text-tx-muted text-lg">
                                Áp dụng cho các SKU có giá = {oldPrice}
                            </p>
                            <p className="text-muted-foreground">
                                Các SKU đang có cùng giá gốc {oldPrice} sẽ được cập nhật theo giá mới.
                            </p>
                        </div>

                        <div
                            onClick={applyAll}
                            className="flex flex-col p-4 rounded-xl border-[0.5px] border-line gap cursor-pointer hover:bg-muted"
                        >
                            <p className="font-semibold text-tx-muted text-lg">Áp dụng cho tất cả SKU</p>
                            <p className="text-muted-foreground">
                                Cập nhật đồng loạt giá mới cho toàn bộ SKU của sản phẩm.
                            </p>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button className={'rounded-xl h-10'} variant={"outline"} onClick={cancelChange}>Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}
