import React from 'react'
import {Controller} from "react-hook-form"
import { Editor } from '@tinymce/tinymce-react'

const RTE = ({label,control,defaultValue=""}) => {
  return (
    <div className=''>
      {label && <label className='block text-sm font-medium text-gray-700'>{label}</label>}
    <Controller 
    control={control}
    name = "content"
    render = {({field:{onChange}})=>{
       return(
        <Editor
         apiKey='yhfmqlynm2d6ggvv84oo9dez9drk4pltqujd35h6nfmprvym'

        initialValue={defaultValue}
        init={{
          height: 500,
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={onChange}
      />
  )}}
    
    />
  
    </div>
  )
}

export default RTE