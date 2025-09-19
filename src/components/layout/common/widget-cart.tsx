import {Badge} from "@/components/ui/badge";

import { Progress } from "@/components/ui/progress"
import Header from "@/components/utils/Header";

type WidgetCartProps = {
    title: string;
    icon: React.ReactNode;
    content?: string;
    ratio?: string;
    range?: string;
    showProgress?: boolean;
}

export function WidgetCart({ title, icon, content, ratio, range, showProgress }: WidgetCartProps) {
    return (
        <div
            className={`${showProgress && "h-60"} min-h-40 rounded-xl border-line border-[0.5px] p-4 flex flex-col justify-between shadow-none hover:shadow-xl transition-all duration-200 hover:bg-muted`}
        >
            <div className={'flex flex-row justify-between text-tx-muted'}>
                <p className={'text-sm font-medium'}>{title}</p>
                {icon}
            </div>
            <div className={'flex flex-col gap-3'}>
                <p className={'text-3xl font-semibold text-tx-default'}>{content || 0}</p>
                <div className={'flex flex-row justify-between items-center'}>
                    <Badge>{ratio || "+0"}</Badge>
                    <p className={'text-sm text-tx-muted'}>vs {range || "last month"}</p>
                </div>
                {showProgress && (
                    <div className={'flex flex-col gap-3'}>
                        <div className={'flex flex-row gap-3 justify-between items-baseline'}>
                            <p className={'text-tx-muted text-sm'}>Progress</p>
                            <p className={'text-tx-default font-semibold text-sm'}>75%</p>
                        </div>
                        <Progress value={33} />
                        <p className={'text-sm text-tx-muted'}>Target: 2.800</p>
                    </div>
                )}
            </div>
        </div>
    )
}

type WidgetCartWithContainer = {
    children: React.ReactNode;
    actions?: React.ReactNode;
    title: string;
    caption: string;
}

export function WidgetCartWithContainer({ children, title, caption, actions }: WidgetCartWithContainer) {
    return (
        <div className={'h-fit rounded-xl border-line border-[0.5px] p-4 flex flex-col gap-4'}>
            <div className={'flex flex-row gap-3 items-baseline justify-between'}>
                <Header title={title} caption={caption} />
                <div className={'flex flex-row gap-3'}>{actions}</div>
            </div>
            {children}
        </div>
    )
}