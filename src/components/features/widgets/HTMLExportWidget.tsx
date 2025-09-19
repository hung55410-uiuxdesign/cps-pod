import { useEffect, useMemo } from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { EditorState, SerializedEditorState } from "lexical"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import debounce from "lodash/debounce"
import { $generateHtmlFromNodes } from "@lexical/html"

function HtmlExportPlugin({
                              onSerializedChange,
                              onHtmlChange,
                          }: {
    onSerializedChange?: (editorSerializedState: SerializedEditorState) => void
    onHtmlChange?: (html: string) => void
}) {
    const [editor] = useLexicalComposerContext()

    const debouncedSerializedChange = useMemo(
        () =>
            debounce((state: SerializedEditorState) => {
                onSerializedChange?.(state)
            }, 300),
        [onSerializedChange]
    )

    const debouncedHtmlChange = useMemo(
        () =>
            debounce((editorState: EditorState) => {
                editorState.read(() => {
                    const html = $generateHtmlFromNodes(editor)
                    onHtmlChange?.(html)
                })
            }, 300),
        [editor, onHtmlChange]
    )

    return (
        <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState) => {
                debouncedSerializedChange(editorState.toJSON())
                debouncedHtmlChange(editorState)
            }}
        />
    )
}

export default HtmlExportPlugin
