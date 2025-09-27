import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import {JSX} from "react";

type ToastState = "success" | "error" | "warning" | "info";

const stateConfig: Record<
    ToastState,
    { icon: JSX.Element; classes: string }
> = {
    success: {
        icon: <CheckCircle className="h-5 w-5 text-emerald-600" />,
        classes:
            "bg-emerald-100 text-emerald-800 border border-emerald-500",
    },
    error: {
        icon: <XCircle className="h-5 w-5 text-red-600" />,
        classes: "bg-danger-muted text-danger border border-danger",
    },
    warning: {
        icon: <AlertTriangle className="h-5 w-5 text-amber-600" />,
        classes:
            "bg-amber-100 text-amber-800 border border-amber-500",
    },
    info: {
        icon: <Info className="h-5 w-5 text-blue-600" />,
        classes: "bg-blue-100 text-blue-800 border border-blue-500",
    },
};

export const showToast = (state: ToastState, message: string | string[], title: string) => {
    const messages = Array.isArray(message) ? message : [message];

    toast.custom(() => (
        <div
            className={`flex flex-col items-start gap-2 rounded-lg bg-background border-[0.5px] border-line p-4 shadow-2xl ${stateConfig[state].classes}`}
        >
            <div className={'flex flex-row gap-2 items-center'}>
                {stateConfig[state].icon}
                <p className={'font-semibold'}>{title}</p>
            </div>
            {messages.length > 0 && (
                <div className="flex flex-col ml-[28px]">
                    {messages.map((m, i) => (
                        <div key={i} className={'flex flex-row gap-2 items-center'}>
                            <span className={'w-1 h-1 bg-danger rounded-full'}></span>
                            <span>{m}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    ));
};
