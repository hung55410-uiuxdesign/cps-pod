"use client";

import React from "react";
import {ArrowLeftFromLine, ArrowRightFromLine, Bell} from "lucide-react";
import { Button } from "@/components/ui/button"
import BreadcrumbBar from "@/components/features/BreadcrumbBar";
import Search from "@/components/layout/common/search";
import ButtonBadge from "@/components/features/ButtonBadge";
import AvatarMenu from "@/components/features/AvatarMenu";
import {UserType} from "@/lib/types/user";

type HeaderProps = {
    onToggleSidebar: () => void;
    isOpen: boolean;
};

export default function Header({ onToggleSidebar, isOpen }: HeaderProps) {
    const userData: UserType = {
        id: "1",
        name: "Nguyen Hung",
        username: "hung55410",
        role: "admin",
        email: "hung55410@gmail.com",
    }
    return (
        <header className="w-full min-h-16 flex items-center gap-3 px-4 bg-background border-b-[0.5px]">
            <Button
                onClick={onToggleSidebar}
                className={'min-w-10 h-10 rounded-xl'}
                variant={"ghost"}
                size={"icon"}
            >
                {isOpen ? <ArrowLeftFromLine /> : <ArrowRightFromLine />}
            </Button>
            <BreadcrumbBar />
            <Search />
            <div className={'flex flex-row gap-3'}>
                <ButtonBadge icon={<Bell size={20} className={'w-full h-full'} />} badgeContent={'1'} />
                {/*<CartPopover />*/}
            </div>
            <AvatarMenu user={userData} />
        </header>
    );
}
