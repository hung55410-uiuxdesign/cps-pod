'use client'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export function ImagePreviewWidget() {
    return (
        <div className={'w-full flex flex-col gap-4'}>
            <img
                src={'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1288&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                alt={'product'}
                className={'w-full max-h-[650px] rounded-xl object-cover'}
            />
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full group"
            >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/4">
                            <div className="p-1 border-[0.5px] border-line rounded-xl h-[100px] flex items-center justify-center">
                                <p>{index}</p>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className={'hidden group-hover:flex'}>
                    <CarouselPrevious className={'left-0'} />
                    <CarouselNext className={'right-0'} />
                </div>
            </Carousel>
        </div>
    )
}