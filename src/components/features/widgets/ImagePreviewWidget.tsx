'use client'

import { useState, useEffect } from "react"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

type Props = {
    images: string[]
    selectedImage?: string | null
    onImageSelect?: (image: string) => void
}

export function ImagePreviewWidget({ images, selectedImage, onImageSelect }: Props) {
    const [currentImage, setCurrentImage] = useState(images[0] ?? "")

    useEffect(() => {
        if (selectedImage && images.includes(selectedImage)) {
            setCurrentImage(selectedImage)
        }
    }, [selectedImage, images])

    const handleSelect = (img: string) => {
        setCurrentImage(img)
        onImageSelect?.(img)
    }

    return (
        <div className="w-full flex flex-col gap-4">
            {currentImage && (
                <img
                    src={currentImage}
                    alt="product"
                    className="w-full h-full max-h-[650px] rounded-xl object-cover"
                />
            )}

            <Carousel opts={{ align: "start" }} className="w-full group">
                <CarouselContent>
                    {images.map((img, index) => (
                        <CarouselItem key={index} className="basis-1/4">
                            <div
                                onClick={() => handleSelect(img)}
                                className={`p-1 border-[0.5px] rounded-xl h-[100px] flex items-center justify-center cursor-pointer ${
                                    img === currentImage
                                        ? "border-primary"
                                        : "border-line hover:border-primary/50"
                                }`}
                            >
                                <img
                                    src={img}
                                    alt={`thumb-${index}`}
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden group-hover:flex">
                    <CarouselPrevious className="left-0" />
                    <CarouselNext className="right-0" />
                </div>
            </Carousel>
        </div>
    )
}
