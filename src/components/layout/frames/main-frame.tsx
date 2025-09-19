'use client'

import SideBar from "@/components/layout/common/side-bar";
import { Suspense, useState } from "react";
import Header from "@/components/layout/common/header";
import Loading from "@/app/loading";

export default function MainFrame({
                                      children,
                                  }: Readonly<{
    children: React.ReactNode;
}>) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <section className="flex h-screen overflow-hidden">
            <SideBar isOpen={isSidebarOpen} />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <Header
                    isOpen={isSidebarOpen}
                    onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
                />
                <Suspense fallback={<Loading />}>
                    <div className="flex-1 overflow-y-auto p-6 bg-background">
                        {children}
                    </div>
                </Suspense>
            </div>
        </section>
    );
}
