'use client'

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchInput() {
    return (
        <div className={'w-full max-w-[350px]'}>
            <div className={'relative'}>
                <div className={'h-full absolute inset-0 max-w-10 flex items-center justify-center'}>
                    <Search size={20} strokeWidth={1.25} />
                </div>
                <Input
                    type={"search"}
                    placeholder={"Search..."}
                    className={'rounded-xl shadow-none bg-muted pl-10 h-11'}
                />
            </div>
        </div>
    )
}