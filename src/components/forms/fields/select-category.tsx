'use client'

import {useEffect, useState} from "react"
import {debounce} from "lodash"
import {CategoryType} from "@/lib/types/category";
import {searchCategoryAction} from "@/lib/data/actions/category-actions";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {Button} from "@/components/ui/button"
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/lib";
import { Control, UseFormSetValue } from "react-hook-form"
import {FormSchemaType} from "@/lib/types/forms/create-product-form-schema";

type Props = {
    control: Control<FormSchemaType>
    setValueAction: UseFormSetValue<FormSchemaType>
}

export function SelectCategory({ control, setValueAction }: Props) {
    const [categories, setCategories] = useState<CategoryType[]>([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await searchCategoryAction(search)
            setCategories(response || [])
        }

        const debounced = debounce(fetchCategories, 400)
        debounced()

        return () => debounced.cancel()
    }, [search])

    return (
        <FormField
            control={control}
            name="primary_category_id"
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
                                        ? categories.find((c) => c.id === Number(field.value))?.name.vi
                                        : "Chọn danh mục"}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                            align="start"
                            className="p-0 shadow-2xl overflow-hidden border-[0.5px] border-line rounded-xl"
                        >
                            <Command>
                                <CommandInput
                                    placeholder="Tìm danh mục..."
                                    className="h-11"
                                    onValueChange={(val) => setSearch(val)}
                                />
                                <CommandList>
                                    <CommandEmpty>Không tìm thấy danh mục.</CommandEmpty>
                                    <CommandGroup>
                                        {categories.map((cate) => (
                                            <CommandItem
                                                key={cate.id}
                                                value={cate.name.vi}
                                                onSelect={() => {
                                                    setValueAction("primary_category_id", cate.id?.toString() ?? "")
                                                }}
                                            >
                                                {cate.name.vi}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        cate.id === Number(field.value)
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
    )
}
