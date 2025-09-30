import {Badge} from "@/components/ui/badge";
import Link from "next/link";
import {ProductType} from "@/lib/types/product";
import {
    Tooltip,
    TooltipContent, TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    item: ProductType;
}

export function ItemProduct({ item }: Props) {
    return (
        <Link href={`/san-pham/${item.id}`} className={'h-full'}>
            <div className={'p-2 border-[0.5px] border-line h-full rounded-xl flex flex-col gap-4 group'}>
                <div className={'relative rounded-lg overflow-hidden h-[180px]'}>
                    <img
                        src={item.images[0]}
                        className={'w-full h-full object-cover hover:scale-110 transition-all duration-200 group-hover:scale-110'}
                    />
                    <Badge className={'absolute top-2 left-2'}>Trong kho: 320</Badge>
                </div>
                <div className={'flex flex-col gap-1 px-2 min-h-14'}>
                    <p className={'w-full line-clamp-1 overflow-hidden text-ellipsis font-semibold text-tx-default group-hover:underline'}>{item.title}</p>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <span className="text-[12px] text-tx-muted w-full overflow-hidden whitespace-nowrap text-ellipsis">
                                SKU: {item.sku}
                            </span>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{item.sku}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                <div className={'text-sm px-2 flex flex-col gap'}>
                    <p className={'text-tx-muted'}>Từ <span className={'font-semibold text-tx-default'}>{item.price} VNĐ</span></p>
                    <div className={'flex flex-row flex-no-wrap items-center gap-3 text-tx-muted'}>
                        {item.attributes?.slice(0,2).map((attribute, index) => (
                            <div key={index} className={'flex flex-row gap-3'}>
                                <p>{attribute.values?.length} {attribute.name}</p>
                                {item.attributes?.length > 1 && (
                                    <div className={'min-w-1 h-1 bg-foreground rounded-full'}></div>
                                )}
                            </div>
                        ))}
                        {item.attributes?.length > 2 && (
                            <p>...</p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    )
}