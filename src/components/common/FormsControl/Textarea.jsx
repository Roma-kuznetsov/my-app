import React from "react";
import s from "../FormsControl/Textarea.module.css"

const FormControl = (props) => {
  const hasError = props.meta.touched && props.meta.error
  return (
    <div className={s.form_control + " " + (hasError ? s.error : " ")} >
      <div>
        {props.children}
      </div>
      {hasError && <span>{props.meta.error}</span>}
    </div>
  )
}
export const Textarea = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}><textarea {...input}{...restProps} /></FormControl>
  )
}
export const Input = (props) => {
  const { input, meta, child, ...restProps } = props;
  return (
    <FormControl {...props}><input {...input}{...restProps} /></FormControl>
  )
}

export default Textarea;