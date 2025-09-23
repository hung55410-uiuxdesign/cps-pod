'use client'

import {Button} from "@/components/ui/button";
import {useFormContext} from "react-hook-form";
import {useEffect, useMemo, useState} from "react";
import {FormSchemaType, ProductVariant, ProductVariantAttribute} from "@/components/forms/blanks-products/create-product";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Search, Settings2} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Checkbox} from "@/components/ui/checkbox";
import CustomAccordion from "@/components/features/lists/GroupVariants";

type Props = {
    onNextStepAction?: () => void;
    onPrevStepAction?: () => void;
};

export default function CreatePGenerateVariant({onNextStepAction, onPrevStepAction}: Props) {
    const { trigger, getValues, setValue, watch } = useFormContext();
    const { attributes, product_variants: existingVariants } = getValues() as FormSchemaType;
    const [groupBy, setGroupBy] = useState<string | null>(attributes?.[0]?.name ?? null);

    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState<Record<string, string>>({});

    const initialVariants = useMemo<ProductVariant[]>(() => {
        if (!attributes || attributes.length === 0) return [];

        const valueGroups: ProductVariantAttribute[][] = attributes.map((attr) =>
            attr.values?.map<ProductVariantAttribute>((val) => ({
                value: val.title,
                value_id: val.title,
                attribute_id: attr.attr_id?.toString() ?? Date.now().toString(),
                attribute_name: attr.name,
            })) ?? []
        );

        const cartesian = <T,>(arr: T[][]): T[][] =>
            arr.reduce<T[][]>(
                (a, b) => a.flatMap((x) => b.map((y) => [...x, y])),
                [[]]
            );

        return cartesian(valueGroups).map<ProductVariant>((combo, idx) => ({
            idx,
            price: 0,
            attributes: combo,
        }));
    }, [attributes]);

    useEffect(() => {
        if (!existingVariants || existingVariants.length === 0) {
            setValue("product_variants", initialVariants);
        }
    }, [initialVariants, existingVariants, setValue]);

    const products_variants = watch("product_variants") as ProductVariant[];

    const filteredVariants = useMemo(() => {
        let result = [...products_variants];

        if (search.trim()) {
            const keyword = search.toLowerCase();
            result = result.filter((v) =>
                v.attributes.some(
                    (attr) =>
                        attr.attribute_name.toLowerCase().includes(keyword) ||
                        attr.value.toLowerCase().includes(keyword)
                )
            );
        }

        Object.entries(filters).forEach(([attr_id, value]) => {
            if (value) {
                result = result.filter((v) =>
                    v.attributes.some(
                        (attr) => String(attr.attribute_id) === attr_id && attr.value === value
                    )
                );
            }
        });

        return result;
    }, [products_variants, search, filters]);

    const groupedVariants = useMemo(() => {
        if (!groupBy) return { all: filteredVariants };

        const groups: Record<string, ProductVariant[]> = {};
        filteredVariants.forEach((variant) => {
            const attr = variant.attributes.find((a) => a.attribute_name === groupBy);
            const key = attr?.value ?? "Khác";
            if (!groups[key]) groups[key] = [];
            groups[key].push(variant);
        });
        return groups;
    }, [filteredVariants, groupBy]);

    const handleUpdateVariant = (index: number, newPrice: number) => {
        const updated = [...products_variants];
        updated[index] = { ...updated[index], price: newPrice };
        setValue("product_variants", updated, { shouldDirty: true });
    };

    const handleUpdateGroup = (groupName: string, newPrice: number) => {
        const updated = products_variants.map((v) => {
            const attr = v.attributes.find((a) => a.attribute_name === groupBy);
            if (attr?.value === groupName) {
                return { ...v, price: newPrice };
            }
            return v;
        });
        setValue("product_variants", updated, { shouldDirty: true });
    };

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
        <div className="flex flex-col gap-8">
            <div className="flex flex-col border-[0.5px] border-line rounded-xl overflow-hidden">
                <div className="flex flex-row gap-3 items-center justify-between bg-muted px-6 py-3 pr-3 border-b-[0.5px] border-line">
                    <div className={'flex flex-row gap-2 items-center'}>
                        <p className="font-semibold text-tx-default">Biến thể:</p>
                    </div>
                    <div className={'flex flex-row gap-3 items-center'}>
                        <div className="flex flex-row items-center gap-2">
                            <span className={'text-sm text-tx-muted text-nowrap'}>Nhóm bởi:</span>
                            <Select value={groupBy ?? ""} onValueChange={setGroupBy}>
                                <SelectTrigger className={'shadow-none bg-background gap-3 rounded-xl h-10'}>
                                    <SelectValue placeholder="Chọn thuộc tính" />
                                </SelectTrigger>
                                <SelectContent className={'rounded-xl shadow-2xl'}>
                                    <SelectGroup>
                                        {attributes.map((attr, index) => (
                                            <SelectItem className={'rounded-lg h-10'} key={index} value={attr.name}>
                                                {attr.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            type="button"
                            className={`h-10 w-10 rounded-xl  ${isOpenFilter ? "bg-foreground cursor-pointer hover:bg-foreground/90 hover:text-tx-foreground text-tx-foreground" : "text-tx-default"}`}
                            size="icon"
                            variant="ghost"
                            onClick={() => setIsOpenFilter((prev) => !prev)}
                        >
                            <Settings2 />
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col">
                    {isOpenFilter && (
                        <div className={'flex flex-col gap-3 pb-3 py-4 px-6 border-b-[0.5px] border-line'}>
                            <div className={'w-full'}>
                                <div className={'relative'}>
                                    <div className={'h-full absolute inset-0 max-w-10 flex items-center justify-center'}>
                                        <Search size={20} strokeWidth={1.25} />
                                    </div>
                                    <Input
                                        type={"search"}
                                        placeholder={"Search..."}
                                        className={'rounded-xl shadow-none bg-muted pl-10 h-11'}
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row gap-3">
                                {attributes?.map((attr, index) => {
                                    const attrId = attr.attr_id?.toString() ?? "";
                                    return (
                                        <div key={index} className={'flex flex-row gap items-center gap-2 pl-3 h-10 border-[0.5px] border-line rounded-xl'}>
                                            <p className="text-sm">{attr.name}:</p>
                                            <Select
                                                value={filters[attrId] ?? ""}
                                                onValueChange={(val) =>
                                                    setFilters((prev) => ({
                                                        ...prev,
                                                        [attrId]: val,
                                                    }))
                                                }
                                            >
                                                <SelectTrigger className={'shadow-none border-none focus:ring-0 gap-2'}>
                                                    <SelectValue placeholder="Chọn giá trị" />
                                                </SelectTrigger>
                                                <SelectContent align={"end"} className={'shadow-2xl rounded-xl min-w-[200px]'}>
                                                    {attr.values?.map((val) => (
                                                        <SelectItem
                                                            className={'rounded-lg h-10'}
                                                            key={`${attrId}-${val.title}`}
                                                            value={val.title_id || val.title}
                                                        >
                                                            {val.title}
                                                        </SelectItem>
                                                    ))}
                                                    <div className="border-t mt-2 pt-2">
                                                        <Button
                                                            type="button"
                                                            variant={"link"}
                                                            className="px-2 text-sm h-10 rounded-lg"
                                                            onClick={() =>
                                                                setFilters((prev) => {
                                                                    const newFilters = { ...prev }
                                                                    delete newFilters[attrId]
                                                                    return newFilters
                                                                })
                                                            }
                                                        >
                                                            Xoá bộ lọc
                                                        </Button>
                                                    </div>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    );
                                })}
                                <Button
                                    type="button"
                                    variant="link"
                                    onClick={() => {
                                        setFilters({});
                                        setSearch("")
                                    }}
                                    className="h-10 rounded-xl px-0"
                                >
                                    Xoá bộ lọc
                                </Button>
                            </div>
                        </div>
                    )}

                    {products_variants.length === 0 && <p>Chưa có thuộc tính nào</p>}

                    <div className={'w-full grid grid-cols-2 gap-3 bg-muted px-6 py-3 border-b-[0.5px] border-line'}>
                        <div className={'flex flex-row items-center gap-2'}>
                            <Checkbox />
                            <p className={'font-semibold'}>Variants</p>
                            <Button
                                className={'p-0'}
                                variant={'link'}
                            >
                                Expand all
                            </Button>
                        </div>
                        <div className={'grid grid-cols-2 gap-3'}>
                            <p className={'font-semibold flex h-full items-center'}>Price</p>
                            <p className={'font-semibold flex h-full items-center'}>Availble</p>
                        </div>
                    </div>
                    <CustomAccordion
                        groupedVariants={groupedVariants}
                        onUpdateVariant={handleUpdateVariant}
                        onUpdateGroup={handleUpdateGroup}
                    />
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
