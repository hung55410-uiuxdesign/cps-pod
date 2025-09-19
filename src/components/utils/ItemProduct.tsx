import {Badge} from "@/components/ui/badge";
import Link from "next/link";

export function ItemProduct() {
    return (
        <Link href={'/san-pham-tron/123123123'}>
            <div className={'p-2 border-[0.5px] border-line rounded-xl flex flex-col gap-4 group'}>
                <div className={'relative rounded-lg overflow-hidden'}>
                    <img
                        src={'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=2272&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
                        className={'w-full min-h-32 object-cover hover:scale-110 transition-all duration-200 group-hover:scale-110'}
                    />
                    <Badge className={'absolute top-2 left-2'}>Trong kho: 320</Badge>
                </div>
                <div className={'flex flex-col gap px-2 min-h-14'}>
                    <p className={'w-full line-clamp-1 overflow-hidden text-ellipsis font-semibold text-tx-default group-hover:underline'}>LS13001 | Áo Hoodie Unisex Cao cấp</p>
                    <p className={'text-sm text-tx-muted'}>Lane Seven LS13001</p>
                </div>
                <div className={'text-sm px-2 flex flex-col gap'}>
                    <p className={'text-tx-muted'}>Từ <span className={'font-semibold text-tx-default'}>120,000 VNĐ</span></p>
                    <div className={'flex flex-row flex-wrap items-center gap-3 text-tx-muted'}>
                        <p>12 màu sắc</p>
                        <div className={'min-w-1 h-1 bg-foreground rounded-full'}></div>
                        <p>8 kích cỡ</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}