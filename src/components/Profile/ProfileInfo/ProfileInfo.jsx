import React, {useState} from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHoocks from './ProfileStatusWithHoocks';
import userPhoto from '../../../../src/assets/images/def.jpg';
import ProfileDataForm from './ProfileFormData';

const ProfileInfo = (props) => {
    const [editMode, setEditMode] = useState(false)

    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) =>{
        if(e.target.files.length){
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData) => {
        props.saveProfile(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }

    return (
        <div>
            <div className={s.descriptionBlock}>
                <div className={s.mainBlock}>
                    <img className={s.ava} src={props.profile.photos.large || userPhoto} />
                    <li className={s.des} >
                        <ul className={s.des_item}><ProfileStatusWithHoocks status={props.status} updateStatus={props.updateStatus} /></ul>
                        <div></div>
                        <ul className={s.des_item}>{props.profile.fullName}</ul>
                    </li>
                </div>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} /> }

                {editMode ? <ProfileDataForm error={props.error} initialValues={props.profile} onSubmit={onSubmit} profile={props.profile}/> :
                <ProfileData profile={props.profile} isOwner={props.isOwner} toEditMode={()=>{setEditMode(true)}} /> }

            </div>
        </div>
    )
}
//отображение если editMode false
const ProfileData =({profile,isOwner,toEditMode})=>{
    return(
    <div>
        <div>
            {isOwner && <button onClick={toEditMode}>Edit</button>}
        </div>
        <li className={s.des} >
            <ul className={s.des_item}>Обо мне: {profile.aboutMe}</ul>
            <ul className={s.des_item}>Я знаю: {profile.lookingForAJobDescription}</ul>
            <ul className={s.des_item}>{profile.lookingForAJob !== false ? "ищу работу" : "не ищу работу"}</ul>
        </li>
        <li className={s.des} >
            <div> {Object.keys(profile.contacts).map(key=>{
                return <Contacts key={key} contactTitle={key} contactValue={profile.contacts[key]} />
            })} </div>
        </li>
    </div>
    )
}

//вспомогательная компонента для контактов
export const Contacts = ({contactTitle,contactValue}) =>{
    return <div className={s.contacts}> <b>{contactTitle}</b>:<a target="_blank" href={contactValue}>{contactValue}</a></div>
}

export default ProfileInfo;



