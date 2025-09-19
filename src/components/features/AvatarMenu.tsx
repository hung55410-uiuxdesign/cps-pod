import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { UserType } from "@/lib/types/user";
import {ChevronRight} from "lucide-react";

type Props = {
    user: UserType;
}

export default function AvatarMenu({ user }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className={'flex flex-row items-center gap-2 cursor-pointer'}>
                    <Avatar className={'w-10 h-10'}>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className={'flex flex-col gap items-start'}>
                        <p className={'text-sm text-nowrap text-tx-default font-semibold'}>{user.name}</p>
                        <p className={'text-[12px] text-tx-muted'}>{user.role ? user.role : user.username}</p>
                    </div>
                    <ChevronRight size={20} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={"end"} className={'w-52 border-[0.5px] border-line shadow-2xl rounded-xl'}>
                <DropdownMenuLabel className={'h-10 flex items-center'}>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}