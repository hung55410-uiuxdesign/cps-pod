'use client'

import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import {Button} from "@/components/ui/button";
import {ChevronDown, ChevronRight} from "lucide-react";
import {
    Tooltip,
    TooltipContent, TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {Input} from "@/components/ui/input"

type VariantAttribute = {
    attribute_name: string
    value: string
}

type ProductVariant = {
    price: number
    attributes: VariantAttribute[]
    idx?: number
}

type GroupedVariantProps = {
    groupName: string
    variants: ProductVariant[]
    isLast?: boolean
    onUpdateVariant: (index: number, price: number) => void
    onUpdateGroup: (groupName: string, price: number) => void
}

function GroupedVariant({ groupName, variants, isLast, onUpdateVariant, onUpdateGroup }: GroupedVariantProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [checked, setChecked] = useState(false)

    return (
        <div className={`w-full ${!isLast ? "border-b-[0.5px] border-line" : ""}`}>
            <div className="grid grid-cols-2 gap-3 w-full hover:bg-muted bg-background px-6 py-2 cursor-pointer">
                <div className="flex flex-row items-center gap-2">
                    <Checkbox checked={checked} onCheckedChange={() => setChecked(true)} />
                    <div
                        className="flex flex-row gap-2 w-full font-medium text-tx-default"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        <div className="w-14 h-14 rounded-xl border-[0.5px] border-line mg-muted"></div>
                        <div className="flex flex-col">
                            <p>{groupName}</p>
                            <Button variant="link" className="p-0 text-tx-muted cursor-pointer">
                                <span>{variants.length} variants</span>
                                {isOpen ? <ChevronDown /> : <ChevronRight />}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3 content-center">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Input
                                    className={'h-11 shadow-none rounded-xl border-[0.5px] border-line'}
                                    type="number"
                                    onChange={e => onUpdateGroup(groupName, Number(e.target.value))}
                                    placeholder="Nhập giá..."
                                />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Apply to {variants.length} variants</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>

            {isOpen && (
                <div className="flex flex-col gap-3 pb-6 px-6">
                    {variants.map((variant, idx) => (
                        <div
                            key={idx}
                            className="grid grid-cols-2 gap-3 items-center pl-6 py-2"
                        >
                            <div className="flex flex-row gap-2 items-center">
                                <Checkbox />
                                <div className="w-11 h-11 rounded-xl border-[0.5px] border-line mg-muted"></div>
                                {variant.attributes.map((attr, aIdx) => (
                                    <span key={aIdx} className="text-sm font-medium">
                    {attr.value}
                                        {aIdx < variant.attributes.length - 1 ? " / " : ""}
                  </span>
                                ))}
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    className={'h-11 shadow-none rounded-xl border-[0.5px] border-line'}
                                    type="number"
                                    value={variant.price ?? ""}
                                    onChange={e => onUpdateVariant(variant.idx!, Number(e.target.value))}
                                    placeholder="Nhập giá..."
                                />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

type AccordionProps = {
    groupedVariants: Record<string, ProductVariant[]>
    onUpdateVariant: (index: number, price: number) => void
    onUpdateGroup: (groupName: string, price: number) => void
}

export default function CustomAccordion({ groupedVariants, onUpdateGroup, onUpdateVariant }: AccordionProps) {
    const entries = Object.entries(groupedVariants)

    return (
        <div className="w-full">
            {entries.map(([groupName, variants], idx) => (
                <GroupedVariant
                    key={groupName}
                    groupName={groupName}
                    variants={variants}
                    isLast={idx === entries.length - 1}
                    onUpdateVariant={onUpdateVariant}
                    onUpdateGroup={onUpdateGroup}
                />
            ))}
        </div>
    )
}
