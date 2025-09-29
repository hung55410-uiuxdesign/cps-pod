import { toast } from "sonner";
import { CheckCircle, AlertTriangle, XCircle, Info } from "lucide-react";
import {JSX} from "react";

type ToastState = "success" | "error" | "warning" | "info";

const stateConfig: Record<
    ToastState,
    { icon: JSX.Element; classes: string }
> = {
    success: {
        icon: <CheckCircle className="h-5 w-5" />,
        classes:
            "bg-success-muted text-success border-[0.5px] border-success-line",
    },
    error: {
        icon: <XCircle className="h-5 w-5" />,
        classes: "bg-danger-muted text-danger border-[0.5px] border-danger-line",
    },
    warning: {
        icon: <AlertTriangle className="h-5 w-5" />,
        classes:
            "bg-warning-muted text-warning border-[0.5px] border-warning-line",
    },
    info: {
        icon: <Info className="h-5 w-5" />,
        classes: "bg-info-muted text-info border-[0.5px] border-info-line",
    },
};

export const showToast = (state: ToastState, message: string | string[], title: string) => {
    const messages = Array.isArray(message) ? message : [message];

    toast.custom(() => (
        <div
            className={`flex flex-col items-start gap-2 rounded-xl bg-background p-3 shadow-2xl ${stateConfig[state].classes}`}
        >
            <div className={'flex flex-row gap-2 items-center'}>
                {stateConfig[state].icon}
                <p className={'font-semibold text-sm'}>{title}</p>
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
