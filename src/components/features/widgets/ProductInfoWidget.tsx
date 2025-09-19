'use client'

import {Badge} from "@/components/ui/badge";
import {Separator} from "@/components/ui/separator";
import {RenderSelectWidget} from "@/components/features/widgets/RenderSelectWidget";
import { useState } from "react";
import {QuantitySelectWidget} from "@/components/features/widgets/QuantitySelectWidget";
import {Button} from "@/components/ui/button";
import {Heart, Share2, ShoppingCart} from "lucide-react";

export function ProductInfoWidget() {
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [selectedColor, setSelectedColor] = useState<string[]>([])
    const [selectedPrintArea, setSelectedPrintArea] = useState<string[]>([])

    return (
        <div className={'w-full flex flex-col gap-8'}>
            <div className={'flex flex-row gap-2'}>
                <Badge className={'w-fit rounded-lg bg-success-muted text-tx-success shadow-none'}>In stock</Badge>
                <Badge variant={"outline"} className={'rounded-lg text-tx-muted border-[0.5px] border-line'}>ID: 123123123</Badge>
            </div>
            <h1 className={'font-semibold text-3xl text-tx-default'}>Áo khoác nam chống nước</h1>
            <div className={'flex flex-row p-4 rounded-xl border-[0.5px] border-line items-center justify-between'}>
                <p className={'text-tx-muted'}>450 đã bán</p>
                <div className={'flex flex-row items-center gap-2'}>
                    <Badge>+12%</Badge>
                    <p className={'text-tx-muted'}>vs tháng trước</p>
                </div>
            </div>
            <div className={'flex flex-row gap-2 items-baseline'}>
                <h2 className={'font-semibold text-xl text-tx-default'}>120,000 VNĐ</h2>
                <p className={'text-tx-disabled line-through'}>150,000 VNĐ</p>
            </div>
            <Separator />
            <RenderSelectWidget
                title="Size"
                type="default"
                multiple={false}
                options={[
                    { id: "s", label: "S", value: "s" },
                    { id: "m", label: "M", value: "m" },
                    { id: "l", label: "L", value: "l" },
                ]}
                selected={selectedSizes}
                onChange={setSelectedSizes}
            />

            <RenderSelectWidget
                title="Color"
                type="color"
                multiple={false}
                options={[
                    { id: "1", label: "Red", value: "red", colorHex: "#E62727" },
                    { id: "2", label: "Blue", value: "blue", colorHex: "#3396D3" },
                ]}
                selected={selectedColor}
                onChange={setSelectedColor}
            />
            <RenderSelectWidget
                title="Vùng in"
                type="default"
                multiple={true}
                options={[
                    { id: "1", label: "Red", value: "red", colorHex: "#f87171" },
                    { id: "2", label: "Blue", value: "blue", colorHex: "#60a5fa" },
                    { id: "3", label: "Yellow", value: "Yellow", colorHex: "#60a5fa" },
                    { id: "4", label: "Green", value: "green", colorHex: "#60a5fa" },
                ]}
                selected={selectedPrintArea}
                onChange={setSelectedPrintArea}
            />
            <QuantitySelectWidget />

            <div className={'flex flex-row gap-4'}>
                <Button
                    variant={'default'}
                    className={'w-full h-10 rounded-xl'}
                >
                    <ShoppingCart />
                    Add to cart
                </Button>
                <Button
                    size={"icon"}
                    variant={"outline"}
                    className={'rounded-xl border-[0.5px] border-line h-10 min-w-10 bg-muted hover:bg-muted-hover'}
                >
                    <Heart />
                </Button>
                <Button
                    size={"icon"}
                    variant={"outline"}
                    className={'rounded-xl border-[0.5px] border-line h-10 min-w-10 bg-muted hover:bg-muted-hover'}
                >
                    <Share2 />
                </Button>
            </div>
        </div>
    )
}