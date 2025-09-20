'use client'

import {Button} from "@/components/ui/button"
import {useFormContext} from "react-hook-form";
import {Eye, PenLine} from "lucide-react";
import {Editor} from "@/components/blocks/editor-x/editor";
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useState } from "react";
import {SortableImageInputWidget} from "@/components/features/widgets/SortableImageInputWidget";
import { SerializedEditorState } from 'lexical'

type Props = {
    onNextStepAction?: () => void;
    onPrevStepAction?: () => void;
};

const initialValue = {
    root: {
        children: [
            {
                children: [
                    {
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        text: 'Hello World 🚀',
                        type: 'text',
                        version: 1,
                    },
                ],
                direction: 'ltr',
                format: '',
                indent: 0,
                type: 'paragraph',
                version: 1,
            },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
    },
} as unknown as SerializedEditorState

export default function CreatePImageDescription({onNextStepAction, onPrevStepAction}: Props) {
    const {setValue, watch, trigger, control} = useFormContext();
    const [previewDescription, setPreviewDescription] = useState<string>("edit");
    const [editorState, setEditorState] = useState<SerializedEditorState>(initialValue)

    const description: string = watch('description');

    const handleNext = async () => {
        const isStepValid = await trigger([]);
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
        <div className="flex flex-col gap-8">
            <FormField
                control={control}
                name="images"
                render={({ field }) => (
                    <FormItem className={'flex flex-col gap-2'}>
                        <FormLabel>Hình ảnh sản phẩm:</FormLabel>
                        <FormControl>
                            <SortableImageInputWidget
                                value={field.value}
                                onChange={field.onChange}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="description"
                render={({ field }) => (
                    <FormItem className={'flex flex-col gap-2'}>
                        <div className={'flex flex-row gap-3 items-center justify-between'}>
                            <FormLabel>Mô tả sản phẩm:</FormLabel>
                            <div className="flex flex-row  w-fit bg-muted border-[0.5px] border-line rounded-xl">
                                <Button
                                    size={"icon"}
                                    variant={previewDescription === "edit" ? "secondary" : "ghost"}
                                    onClick={() => setPreviewDescription("edit")}
                                    className={`rounded-xl h-10 min-w-10 ${previewDescription === "edit" && "bg-foreground text-background hover:bg-foreground/90 hover:text-background"}`}
                                >
                                    <PenLine />
                                </Button>
                                <Button
                                    size={"icon"}
                                    variant={previewDescription === "preview" ? "secondary" : "ghost"}
                                    onClick={() => setPreviewDescription("preview")}
                                    className={`rounded-xl h-10 min-w-10 ${previewDescription === "preview" && "bg-foreground text-background hover:bg-foreground/90 hover:text-background"}`}
                                >
                                    <Eye />
                                </Button>
                            </div>
                        </div>
                        <FormControl>
                            {previewDescription === "edit" ? (
                                <Editor
                                    editorSerializedState={editorState}
                                    onHtmlChange={field.onChange}
                                    onSerializedChange={(value) => setEditorState(value)}
                                />
                            ) : (
                                <div
                                    className="prose max-w-none border p-4 rounded-lg bg-gray-50"
                                    dangerouslySetInnerHTML={{ __html: description }}
                                />
                            )}
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className={'w-full flex items-center justify-between mt-8'}>
                <Button type="button" variant={"outline"} onClick={handlePreStep} className={'w-fit rounded-xl h-10'}>
                    Trở lại
                </Button>
                <Button type="button" onClick={handleNext} className={'w-fit rounded-xl h-10 text-tx-foreground'}>
                    Tiếp tục
                </Button>
            </div>
        </div>
    );
}