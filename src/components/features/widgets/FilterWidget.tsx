'use client'

import { useState } from "react"
import { ProductFilterItem, ProductFilterPayload, ProductListView } from "@/lib/types/utils/filter"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {Funnel, Grid, List, Search} from "lucide-react";

type FilterWidgetProps = {
    filters: ProductFilterItem[]
    onChange: (payload: ProductFilterPayload) => void
}

export default function FilterWidget({ filters, onChange }: FilterWidgetProps) {
    const [filterState, setFilterState] = useState<Record<string, string>>(
        filters.reduce((acc, f) => ({ ...acc, [f.type]: f.value ?? "" }), {})
    )

    const handleChange = (type: string, value: string) => {
        const newState = { ...filterState, [type]: value }
        setFilterState(newState)

        const payload: ProductFilterPayload = {
            category: newState.category,
            searchQuery: newState.search,
            sortBy: newState.sort,
            view: newState.view as ProductListView,
        }

        onChange(payload)
    }

    return (
        <div className="flex flex-row gap-3 items-center">
            {filters.map((filter) => {
                switch (filter.type) {
                    case "category":
                        return (
                            <div key={filter.type} className="flex gap-2 w-full">
                                {filter.options.map((opt) => (
                                    <Button
                                        key={opt.value}
                                        variant={"outline"}
                                        onClick={() => handleChange("category", opt.value)}
                                        className={`h-10 cursor-pointer hover:bg-muted-hover rounded-xl border-[0.5px] border-line ${filterState.category === opt.value ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background" : "bg-muted"}`}
                                    >
                                        {opt.label}
                                        {opt.quantity && (
                                            <span className={'w-fit h-full px-2 bg-muted text-[12px] text-center flex items-center rounded-lg text-tx-secondary'}>{opt.quantity}</span>
                                        )}
                                    </Button>
                                ))}
                            </div>
                        )
                    case "search":
                        return (
                            <div key={filter.type} className={'w-full max-w-[350px]'}>
                                <div className={'relative'}>
                                    <div className={'h-full absolute inset-0 max-w-10 flex items-center justify-center'}>
                                        <Search size={20} strokeWidth={1.25} />
                                    </div>
                                    <Input
                                        key={filter.type}
                                        placeholder={filter.placeholder || "Search..."}
                                        value={filterState.search || ""}
                                        type={"search"}
                                        className={'rounded-xl shadow-none bg-muted pl-10 h-10'}
                                        onChange={(e) => handleChange("search", e.target.value)}
                                    />
                                </div>
                            </div>
                        )
                    case "sort":
                        return (
                            <Select key={filter.type} value={filterState.sort || ""} onValueChange={(val) => handleChange("sort", val)}>
                                <SelectTrigger className="relative w-full max-w-[250px] rounded-xl shadow-none bg-muted border-[0.5px] border-line pl-10 h-10">
                                    <>
                                        <div className={'h-full absolute inset-0 max-w-10 flex items-center justify-center'}>
                                            <Funnel size={20} strokeWidth={1.25} />
                                        </div>
                                        <SelectValue placeholder="Sắp xếp" />
                                    </>
                                </SelectTrigger>
                                <SelectContent className={'rounded-xl border-[0.5px] border-line shadow-2xl'}>
                                    {filter.options.map((opt) => (
                                        <SelectItem className={'rounded-xl h-10'} key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )
                    case "view":
                        return (
                            <div key={filter.type} className="flex flex-row  w-fit bg-muted border-[0.5px] border-line rounded-xl">
                                {filter.options.map((opt) => (
                                    <Button
                                        key={opt}
                                        size={"icon"}
                                        variant={filterState.view === opt ? "secondary" : "ghost"}
                                        onClick={() => handleChange("view", opt)}
                                        className={`rounded-xl h-10 min-w-10 ${filterState.view === opt && "bg-foreground text-background hover:bg-foreground/90 hover:text-background"}`}
                                    >
                                        {opt === "grid" ? <Grid /> : <List />}
                                    </Button>
                                ))}
                            </div>
                        )
                    default:
                        return null
                }
            })}
        </div>
    )
}
