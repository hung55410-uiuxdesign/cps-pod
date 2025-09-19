import { Button } from "@/components/ui/button"

type Props = {
    icon: React.ReactNode
    badgeContent?: string | number
    onClick?: () => void
}

export default function ButtonBadge({ icon, badgeContent, onClick }: Props) {
    return (
        <div className="relative inline-flex">
            <Button size={"icon"} onClick={onClick} variant={'ghost'} className="flex items-center gap-2 w-11 h-11 rounded-xl">
                {icon}
            </Button>
            {badgeContent !== undefined && (
                <span className="absolute -top-1 -right-1 bg-badge text-background text-xs font-medium px-2 py-0.5 rounded-full">
                    {badgeContent}
                </span>
            )}
        </div>
    )
}
