'use client';

import { Input } from "@/components/ui/input";
import { InputHTMLAttributes, useState, ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import {Link} from "lucide-react";
import { Button } from "@/components/ui/button";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
    error?: string;
    onUrlSelect?: (url: string) => void;
    currentUrl?: string;
};

export function InputFieldWidgets({ error, onUrlSelect, currentUrl, ...props }: InputFieldProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputValue, setInputValue] = useState(currentUrl || '');
    const [isInputValid, setIsInputValid] = useState(true);

    const handleConfirm = () => {
        if (inputValue.trim() === '') {
            setIsInputValid(false);
            return;
        }
        if (onUrlSelect) {
            onUrlSelect(inputValue);
        }
        setIsModalOpen(false);
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setIsInputValid(true);
    };

    if (props.type === 'url') {
        return (
            <div className="flex flex-col space-y-2 h-full min-h-[220px]">
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    {currentUrl ? (
                        <DialogTrigger asChild>
                            <img
                                src={currentUrl}
                                alt="Preview"
                                className={cn("w-full h-full object-cover rounded-xl  min-h-[220px] max-h-[600px] cursor-pointer", error && "border-red-500 border-2")}
                            />
                        </DialogTrigger>
                    ) : (
                        <DialogTrigger asChild>
                            <div
                                className={cn(
                                    "relative h-full w-full overflow-hidden p-2 border-[0.5px] bg-muted border-line rounded-xl cursor-pointer",
                                    error && "border-red-500",
                                )}
                            >
                                <div className='w-full h-full min-h-[220px] max-h-[600px] rounded-xl bg-muted flex flex-col items-center justify-center gap-3'>
                                    <div className={'p-2'}>
                                        <Link className="h-5 w-5 text-tx-muted" />
                                    </div>
                                    <div className={'flex flex-col items-center justify-center gap text-sm text-tx-muted'}>
                                        <span className={'text-sm text-tx-muted text-center'}>Nhấn để dán link ảnh của bạn</span>
                                    </div>
                                </div>
                            </div>
                        </DialogTrigger>
                    )}

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Thêm ảnh bằng URL</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col items-center gap-4 py-4">
                            {inputValue && isInputValid && (
                                <img
                                    src={inputValue}
                                    alt="Preview"
                                    className="w-full max-h-80 object-contain rounded-md"
                                />
                            )}
                            <Input
                                placeholder="Dán link ảnh tại đây..."
                                value={inputValue}
                                onChange={handleInputChange}
                                className={cn(isInputValid ? "" : "border-red-500")}
                            />
                            {!isInputValid && (
                                <p className="text-sm text-red-500">Vui lòng nhập một URL hợp lệ.</p>
                            )}
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Hủy</Button>
                            <Button onClick={handleConfirm}>Xác nhận</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                {error && (
                    <p className="text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col space-y-2 mt-2">
            <Input
                type={props.type}
                className={`h-11 border-[0.5px] border-line shadow-none rounded-xl ${error ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                value={props.value ?? ''}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    );
}