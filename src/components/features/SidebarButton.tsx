"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Tooltip,
    TooltipContent, TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

type Props = {
    icon: React.ElementType
    label: string
    path: string
    isOpen: boolean
    isActive: boolean
}

export function SidebarButton({ icon: Icon, label, path, isOpen, isActive }: Props) {
    const button = (
        <Button
            asChild
            variant="ghost"
            size={isOpen ? "default" : "icon"}
            className={`w-full h-10 rounded-xl transition-all duration-300 hover:text-primary overflow-hidden ${
                isActive
                    ? "bg-background text-primary shadow-lg border-[0.5px] border-line"
                    : "text-foreground hover:bg-muted-hover"
            } ${isOpen && "justify-start"}`}
        >
            <Link href={path} className="flex items-center transition-all duration-300">
                <Icon className="w-5 h-5" />
                {isOpen && (
                    <span
                        className="ml-2 transition-all duration-300 opacity-100 translate-x-0"
                    >
            {label}
          </span>
                )}
            </Link>
        </Button>
    )

    if (isOpen) {
        return button
    }

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>{button}</TooltipTrigger>
                <TooltipContent side="right">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
