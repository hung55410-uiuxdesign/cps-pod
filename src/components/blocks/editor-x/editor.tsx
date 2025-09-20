"use client"

import {
    InitialConfigType,
    LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { EditorState, SerializedEditorState } from "lexical"

import { editorTheme } from "@/components/editor/themes/editor-theme"
import { TooltipProvider } from "@/components/ui/tooltip"

import { nodes } from "./nodes"
import { Plugins } from "./plugins"
import HtmlExportPlugin from "@/components/features/widgets/HTMLExportWidget";

const editorConfig: InitialConfigType = {
    namespace: "Editor",
    theme: editorTheme,
    nodes,
    onError: (error: Error) => {
        console.error(error)
    },
}

export function Editor({
                           editorState,
                           editorSerializedState,
                           onSerializedChange,
                           onHtmlChange,
                       }: {
    editorState?: EditorState
    editorSerializedState?: SerializedEditorState
    onSerializedChange?: (editorSerializedState: SerializedEditorState) => void
    onHtmlChange?: (html: string) => void
}) {
    return (
        <div className="bg-background overflow-hidden rounded-lg border-[0.5px] border-line">
            <LexicalComposer
                initialConfig={{
                    ...editorConfig,
                    ...(editorState ? { editorState } : {}),
                    ...(editorSerializedState
                        ? { editorState: JSON.stringify(editorSerializedState) }
                        : {}),
                }}
            >
                <TooltipProvider>
                    <Plugins />
                    <HtmlExportPlugin
                        onSerializedChange={onSerializedChange}
                        onHtmlChange={onHtmlChange}
                    />
                </TooltipProvider>
            </LexicalComposer>
        </div>
    )
}
