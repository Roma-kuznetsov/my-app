import React from 'react';
import Preloader from '../../common/Preloader/Preloader';
import s from './ProfileInfo.module.css';
import ProfileStatusWithHoocks from './ProfileStatusWithHoocks';

const ProfileInfo = (props) => {

    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            <div className={s.descriptionBlock}>
                <div>
                    <img alt="11" className={s.ava} src={props.profile.photos.large} />
                </div>
                <li className={s.des} >
                    <ul className={s.des_item}>{props.profile.fullName}</ul>
                    <ul><ProfileStatusWithHoocks status={props.status} updateStatus={props.updateStatus} /></ul>
                    <ul className={s.des_item}>Обо мне: {props.profile.aboutMe}</ul>
                    <ul className={s.des_item}>Я знаю: {props.profile.lookingForAJobDescription}.</ul>
                    <ul className={s.des_item}>{props.profile.lookingForAJob !== false ? "ищу работу" : "не ищу работу"}</ul>
                </li>
            </div>
        </div>
    )
}

export default ProfileInfo;

/*
<ul className={s.des_item}>{props.profile.contacts.facebook = false ? "У меня нет фейсбука" :
                        <a target="_blank" href={props.profile.contacts.facebook}>Мой фейсбук</a>}</ul>
                    <ul className={s.des_item}>{props.profile.contacts.website = false ? "У меня нет сайта" :
                        <a target="_blank" href={props.profile.contacts.website}>Мой сайт</a>}</ul>
                    <ul className={s.des_item}>{props.profile.contacts.vk = false ? "У меня нет сайта" :
                        <a target="_blank" href={props.profile.contacts.vk}>Мой vk</a>}</ul>
                    <ul className={s.des_item}>{props.profile.contacts.instagram = false ? "У меня нет сайта" :
                        <a target="_blank" href={props.profile.contacts.instagram}>Мой instagram</a>}</ul>
                    <ul className={s.des_item}>{props.profile.contacts.github = false ? "У меня нет сайта" :
                        <a target="_blank" href={props.profile.contacts.github}>Мой github</a>}</ul>
*/


