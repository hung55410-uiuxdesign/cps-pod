'use client'

import { routes, RouteItem } from "@/lib/constants/routes";
import { usePathname } from "next/navigation";
import { SidebarButton } from "@/components/features/SidebarButton";
import { ModeToggle } from "@/components/features/ModeToggle";

type SidebarProps = {
    isOpen: boolean;
};

function isRouteActive(route: RouteItem, pathname: string): boolean {
    if (route.path === pathname) return true;
    if (route.children) {
        return route.children.some((child) => isRouteActive(child, pathname));
    }
    return false;
}

export default function SideBar({ isOpen }: SidebarProps) {
    const pathname = usePathname();
    return (
        <aside
            className={`h-screen flex flex-col bg-muted border-r-[0.5px] transition-all duration-300 ${
                isOpen ? "w-64" : "w-16"
            }`}
        >
            <div className="relative w-full min-h-16 p-3 flex items-center justify-center border-b-[0.5px]">
                <img
                    src="/assets/logo/logo-pod.webp"
                    alt="Compassup Full Logo"
                    className={`absolute object-contain rounded-lg w-full max-w-58 max-h-11 transition-all duration-300 ${
                        isOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                />

                <div className={`absolute object-contain bg-primary rounded-xl w-full h-full max-w-11 max-h-11 p-2 transition duration-300 ${isOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}>
                    <img
                        src="/assets/logo/short-logo.webp"
                        alt="Compassup Short Logo"
                        className={'w-full h-full'}
                    />
                </div>
            </div>

            <div className={'h-full flex flex-col p-3'}>
                <div className={'h-full w-full flex flex-col gap-3'}>
                    {routes.map((route) => (
                        <SidebarButton
                            key={route.path}
                            icon={route.icon}
                            label={route.label}
                            path={route.path}
                            isOpen={isOpen}
                            isActive={isRouteActive(route, pathname)}
                        />
                    ))}
                </div>
            </div>

            <div className={'h-fit border-t-[0.5px] p-3'}>
                <ModeToggle />
            </div>
        </aside>
    )
}
