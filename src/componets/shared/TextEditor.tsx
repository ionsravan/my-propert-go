import { Card } from '@mui/material'
import React from 'react'
import ReactDraftWysiwyg from 'src/@global/ReactDraftWysiwyg'
const DraftJs = require('draft-js')

const { ContentState, convertFromHTML, EditorState } = DraftJs



interface InputProps {
    value: any;
    handleChange: () => void;
}

export function convertToRawEditorState(data: any) {
    if (data !== '' && data !== undefined) {
        const blocksFromHTML = convertFromHTML(data)
        const state = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
        let editorState = EditorState.createWithContent(state)
        return editorState
    }
    return ''
}

const TextEditor = ({ value, handleChange, ...other }: InputProps) => {
    return (
        <Card sx={{ borderRadius: 3, mt: 2 }} >
            <ReactDraftWysiwyg
                editorState={value}
                onEditorStateChange={(editorState: any) => handleChange(editorState)}
                {...other}
            />

        </Card>
    )
}

export default TextEditor
