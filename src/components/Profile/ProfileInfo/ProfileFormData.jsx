import React from "react";
import { reduxForm,Field } from "redux-form";
import createField from "redux-form/lib/createField";
import { Input } from "../../common/FormsControl/Textarea";
import { Contacts } from "./ProfileInfo";
import s from "../../common/FormsControl/Textarea.module.css"

// отображение редактирования editMode true
const ProfileDataForm =({profile,handleSubmit, error})=>{
    return(
    <form onSubmit={handleSubmit}>
        <div>
            <button>Save</button>
        {error && <div className={s.formError}>{error}</div>}
        </div>
        <div>
            <b>Full Name</b>
            <Field component={Input} placeholder={"Full Name"} name={"fullName"} />
            <b>About Me</b>
            <Field component={Input} placeholder={"About Me"} name={"aboutMe"} />
            <b>lookingForAJobDescription</b>
            <Field component={Input} placeholder={"Professional skills"} name={"lookingForAJobDescription"} />
            <b>lookingForAJob</b>
            <Field component={Input} type={'checkbox'} name={"lookingForAJob"} /> 
        </div>
        <div>
            <div> {Object.keys(profile.contacts).map(key=>{
            return <div><d>{key}:<Field component={Input} placeholder={key} name={"contacts." + key}/> </d></div>
            })} </div>
        </div>
    </form>
    )
}

const ProfileDataFormReduxForm = reduxForm({form: 'edit-profile'})(ProfileDataForm)
export default ProfileDataFormReduxForm;