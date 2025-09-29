'use client'

import { Input } from "@/components/ui/input"
import {ChartLine, Clock, Search} from "lucide-react"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from "react"
import {Badge} from "@/components/ui/badge";

export default function SearchInput() {
    const [open, setOpen] = useState(false)

    return (
        <div className="w-full max-w-[350px]">
            <div className="relative">
                <div className="h-full absolute inset-0 max-w-10 flex items-center justify-center">
                    <Search size={20} strokeWidth={1.25} />
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="rounded-xl shadow-none bg-muted pl-10 h-11"
                            onClick={() => setOpen(true)}
                        />
                    </PopoverTrigger>
                    <PopoverContent
                        className={'rounded-xl shadow-2xl border-[0.5px] border-line w-[350px]'}
                        onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                        <div className={'flex flex-row gap-2 items-center text-tx-muted pb-3'}>
                           <Clock className={'w-4 h-4'} />
                           <p className={'text-sm font-semibold'}>Recent searches</p>
                        </div>
                        <div className={'flex flex-col'}>
                            <div className={'pl-4 flex flex-row gap-2 items-center py-3 rounded-xl hover:bg-muted'}>
                                <Search className={'w-4 h-4'} strokeWidth={1.5} />
                                <p className={'text-sm'}>Polo shirt</p>
                            </div>
                            <div className={'pl-4 flex flex-row gap-2 items-center py-3 rounded-xl hover:bg-muted'}>
                                <Search className={'w-4 h-4'} strokeWidth={1.5} />
                                <p className={'text-sm'}>Polo shirt</p>
                            </div>
                            <div className={'pl-4 flex flex-row gap-2 items-center py-3 rounded-xl hover:bg-muted'}>
                                <Search className={'w-4 h-4'} strokeWidth={1.5} />
                                <p className={'text-sm'}>Polo shirt</p>
                            </div>
                        </div>
                        <div className={'flex flex-row gap-2 items-center text-tx-muted pb-3'}>
                            <ChartLine className={'w-4 h-4'} />
                            <p className={'text-sm font-semibold'}>Suggested keywords</p>
                        </div>
                        <div className={'flex flex-row gap-2 items-center flex-wrap'}>
                            <Badge variant={"secondary"} className={'font-normal text-tx-muted py-2 px-3 rounded-xl hover:bg-muted-hover cursor-pointer'}>Black</Badge>
                            <Badge variant={"secondary"} className={'font-normal text-tx-muted py-2 px-3 rounded-xl hover:bg-muted-hover cursor-pointer'}>Denim Blue</Badge>
                            <Badge variant={"secondary"} className={'font-normal text-tx-muted py-2 px-3 rounded-xl hover:bg-muted-hover cursor-pointer'}>Olive Green</Badge>
                            <Badge variant={"secondary"} className={'font-normal text-tx-muted py-2 px-3 rounded-xl hover:bg-muted-hover cursor-pointer'}>Coral Pink</Badge>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    )
}
