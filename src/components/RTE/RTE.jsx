import React from 'react'
import {Editor} from '@tinymce/tinymce-react'
import {Controller} from 'react-hook-form'

//Most of this is not to be learned but copied from Documentation, but must be understood!

function RTE({
    name,
    control,
    label,
    default_value = "",
}) {
  return (
    <div className='w-full'>
        {label && 
        <label className='inline-block mb-1 pl-1'>
            {label}
        </label>}
        <Controller //why controller? To pass reference!
        name = {name || "Name"}
        control={control}
        render={({field : {onChange}}) => (
            <Editor
            initialValue={default_value}
            init={{
                initialValue : default_value,
                height: 500,
                menubar: true,
                plugins: [
                    "image",
                    "advlist",
                    "autolink",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "code",
                    "help",
                    "wordcount",
                    "anchor",
                ],
                toolbar: [
                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                ],
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
            }}
            onEditorChange={onChange}
            />
        )}
        />

    </div>
  )
}

export default RTE