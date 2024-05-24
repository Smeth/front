"use client"

import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

const TinyEditor = ({ onFieldChange, defaultValue, name, id }: { onFieldChange: (name: string, value: string) => void, defaultValue: string, name: string, id: string }) =>  {
    const editorRef = useRef<any>(null)
    const [value, setValue] = useState<string>('')

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue])

    const handleChange = () => {
        if (editorRef.current) {
            setValue(editorRef.current.getContent())
            onFieldChange(name, editorRef.current.getContent())
        }
    }

    return (
        <>
            <Editor
                apiKey="gl87curmda8pcaaf405vxag18xxr63deqfkcbma0ynean5wn"
                onInit={(evt, editor) => editorRef.current = editor}
                value={value}
                onEditorChange={handleChange}
                init={{
                    height: "100%",
                    menubar: true,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | ' +
                    'bold italic backcolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    branding: false
                }}
            />
            <input type='hidden' name={name} id={id} value={value} />
        </>
        
    )
}

export default TinyEditor

