'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

type Props = {
    min?: number
    max?: number
    defaultValue?: number
    onChange?: (value: number) => void
}

export function QuantitySelectWidget({
                                         min = 1,
                                         max = 99,
                                         defaultValue = 1,
                                         onChange,
                                     }: Props) {
    const [value, setValue] = useState(defaultValue)

    const handleChange = (newValue: number) => {
        if (newValue < min || newValue > max) return
        setValue(newValue)
        onChange?.(newValue)
    }

    return (
        <div className="w-full flex flex-col gap-3">
            <p className="font-semibold text-tx-default">Số lượng:</p>
            <div className="flex flex-row gap-3 items-center">
                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleChange(value - 1)}
                    disabled={value <= min}
                    className={'rounded-xl h-10 w-10 bg-muted hover:bg-muted-hover'}
                >
                    <Minus />
                </Button>

                <Input
                    value={value}
                    type="number"
                    className="w-16 text-center font-semibold text-3xl shadow-none border-none focus-visible:outline-none focus-visible:ring-0
                                 [&::-webkit-outer-spin-button]:appearance-none
                                 [&::-webkit-inner-spin-button]:appearance-none
                                 [appearance:textfield]"
                    onChange={(e) => handleChange(Number(e.target.value))}
                />


                <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => handleChange(value + 1)}
                    disabled={value >= max}
                    className={'rounded-xl h-10 w-10 bg-muted hover:bg-muted-hover'}
                >
                    <Plus />
                </Button>
            </div>
        </div>
    )
}
