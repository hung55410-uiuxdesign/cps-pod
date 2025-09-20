'use client'

import {Button} from "@/components/ui/button";
import {useFormContext} from "react-hook-form";

type Props = {
    onNextStepAction?: () => void;
    onPrevStepAction?: () => void;
};

export default function CreatePAddAttributes({onNextStepAction, onPrevStepAction}: Props) {
    const {setValue, watch, trigger, control} = useFormContext();

    const handleNext = async () => {
        const isStepValid = await trigger(["images", "description"]);
        if (isStepValid && onNextStepAction) {
            onNextStepAction();
        }
    };

    const handlePreStep = () => {
        if (onPrevStepAction) {
            onPrevStepAction();
        }
    };
    return (
        <div className={'flex flex-col gap-8'}>
            <div className={'flex flex-col border-[0.5px] border-line rounded-xl overflow-hidden'}>
                <div className={'flex flex-row gap-3 items-center justify-between bg-muted p-3 border-b-[0.5px] border-line'}>
                    <p className={'font-semibold text-tx-default'}>Thuộc tính</p>
                    <Button className={'h-10 rounded-xl'}>
                        Them thuoc tinh
                    </Button>
                </div>
                <div>

                </div>
            </div>
            <div className={'w-full flex items-center justify-between mt-8'}>
                <Button type="button" variant={"outline"} onClick={handlePreStep} className={'w-fit rounded-xl h-10'}>
                    Trở lại
                </Button>
                <Button type="button" onClick={handleNext} className={'w-fit rounded-xl h-10 text-tx-foreground'}>
                    Tiếp tục
                </Button>
            </div>
        </div>
    )
}