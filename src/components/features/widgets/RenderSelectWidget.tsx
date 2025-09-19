'use client'

import {clsx} from "clsx";
import {Button} from "@/components/ui/button";
import {Check} from "lucide-react";

type SelectOption = {
    id: string
    label: string
    value: string
    colorHex?: string
}

type Props = {
    title: string
    options: SelectOption[]
    type?: "default" | "color"
    multiple?: boolean
    selected: string[]
    onChange: (selected: string[]) => void
}


export function RenderSelectWidget({title, options, type, multiple, selected, onChange}: Props) {
    function handleSelect(value: string) {
        if (multiple) {
            if (selected.includes(value)) {
                onChange(selected.filter((v) => v !== value))
            } else {
                onChange([...selected, value])
            }
        } else {
            onChange([value])
        }
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <p className="font-semibold text-tx-default">{title}:</p>
            <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                    const isSelected = selected.includes(option.value)
                    return (
                        <Button
                            variant={"outline"}
                            key={option.id}
                            type="button"
                            onClick={() => handleSelect(option.value)}
                            className={clsx(
                                "relative h-10 cursor-pointer hover:bg-muted-hover rounded-xl border-[0.5px] border-line transition",
                                type === "color"
                                    ? "w-10 h-10 p-0"
                                    : "text-sm",
                                isSelected
                                    ? "bg-foreground text-background hover:bg-foreground/90 hover:text-background"
                                    : "bg-muted"
                            )}
                            style={
                                type === "color"
                                    ? {
                                        backgroundImage: `linear-gradient(${option.colorHex}AA, ${option.colorHex}AA), url(/images/abstract-color.png)`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }
                                    : {}
                            }
                        >
                            {type === "default" && option.label}
                            {isSelected && type === "color" && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <Check className="text-white w-5 h-5" />
                                </div>
                            )}
                            {multiple && isSelected && (
                                <Check />
                            )}
                        </Button>
                    )
                })}
            </div>
            {type === "color" && selected && selected.length > 0 && (
                <p className={'text-sm text-tx-muted'}>Đã chọn: <span className={'uppercase'}>{selected}</span></p>
            )}
        </div>
    )
}