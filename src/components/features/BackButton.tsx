'use client'

import {ArrowLeft} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button
            className={'rounded-xl h-10 bg-muted pl-3 w-fit'}
            variant={'outline'}
            onClick={() => router.back()}
        >
            <ArrowLeft />
            Trở về trang danh sách
        </Button>
    )
}