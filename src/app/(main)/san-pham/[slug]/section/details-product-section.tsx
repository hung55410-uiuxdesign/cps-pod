'use client'

import { useState } from "react"
import { ImagePreviewWidget } from "@/components/features/widgets/ImagePreviewWidget"
import { ProductInfoWidget } from "@/components/features/widgets/ProductInfoWidget"
import { ProductType } from "@/lib/types/product"

type Props = {
    product: ProductType
}

export function DetailsProductSection({ product }: Props) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    return (
        <div className="grid grid-cols-2 gap-8">
            <ImagePreviewWidget
                images={product.images}
                selectedImage={selectedImage}
            />
            <ProductInfoWidget
                product={product}
                onImageSelect={setSelectedImage}
            />
        </div>
    )
}
