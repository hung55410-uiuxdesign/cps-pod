import { List } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    title?: string;
    caption?: string;
    action?: {
        label: string;
        onClick: () => void;
    };
};

export default function Empty({
                                  title = "No Data Found",
                                  caption = "You can create services",
                                  action,
                              }: Props) {
    return (
        <div className="w-full min-h-[300px] flex flex-col gap-2 items-center justify-center">
            <div className="w-11 h-11 rounded-xl shadow-lg flex items-center justify-center mb-2">
                <List />
            </div>
            <p className="font-semibold text-sm text-tx-default">{title}</p>
            <p className="text-xs text-gray-500">{caption}</p>
            {action && (
                <Button type={'button'} onClick={action.onClick} className="mt-2 rounded-xl">
                    {action.label}
                </Button>
            )}
        </div>
    );
}
