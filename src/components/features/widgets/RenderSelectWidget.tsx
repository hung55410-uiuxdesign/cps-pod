'use client'

import {clsx} from "clsx";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";
import {AttributeType} from "@/lib/types/product";

type Props = {
    options: AttributeType[]
    multiple?: boolean
    selected: { [attrId: string]: string[] }
    onChange: (selected: { [attrId: string]: string[] }) => void
    onImageSelect?: (url: string) => void
}

export function RenderSelectWidget({options, multiple, selected, onChange, onImageSelect}: Props) {
    function handleSelect(attrId: string, value: { title: string; image?: string }) {
        const current = selected[attrId] || []

        let updated: string[]
        if (multiple) {
            updated = current.includes(value.title)
                ? current.filter((v) => v !== value.title)
                : [...current, value.title]
        } else {
            updated = [value.title]
        }

        onChange({ ...selected, [attrId]: updated })

        if (value.image && onImageSelect) {
            onImageSelect(value.image)
        }
    }

    return (
        <>
            {options.map((option, index) => (
                <div className="w-full flex flex-col gap-3" key={index}>
                    <p className="font-semibold text-tx-default">{option.name}:</p>
                    <div className="flex flex-wrap gap-2">
                        {option.values && option.values.length > 0 && option.values.map((value) => {
                            const isSelected = (selected[option.id] || []).includes(value.title)
                            return (
                                <Button
                                    variant={"outline"}
                                    key={value.title}
                                    type="button"
                                    onClick={() => handleSelect(option.id.toString(), value)}
                                    className={clsx(
                                        "relative h-10 cursor-pointer hover:bg-muted-hover rounded-xl border-[0.5px] border-line transition",
                                        isSelected
                                            ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                                            : "bg-muted",
                                        value.image && "pl-1"
                                    )}
                                >
                                    {value.image && (
                                        <span>
                                            <img src={value.image} alt={value.title} className={'w-8 h-8 object-cover rounded-lg overflow-hidden'} />
                                        </span>
                                    )}
                                    {value.title}
                                    {multiple && isSelected && (
                                        <Check />
                                    )}
                                </Button>
                            )
                        })}
                    </div>
                </div>
            ))}
        </>
    )
}