import { profileAPI, userAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET-STATUS';
const SAVE_PHOTO_SECCESS ='SAVE-PHOTO-SECCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Im, slut', likesCount: 111 },
    ],
    profile: null,
    status: "",
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.NewPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [newPost, ...state.posts],
                newPostText: ''
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case SAVE_PHOTO_SECCESS:
            return { ...state, profile:{...state.profile, photos:action.photos} }
        default:
            return state;
    }
}

export const addPostActionCreator = (NewPostText) => ({ type: ADD_POST, NewPostText })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SECCESS, photos })

export const getUserProfile = (userId) => async (dispatch) => {
    let response = await userAPI.getProfile(userId)
            dispatch(setUserProfile(response.data));
}
export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId)
            dispatch(setStatus(response.data));
}
export const updateStatus = (status) => async (dispatch) => {
    let response = await profileAPI.updateStatus(status)
            if (response.data.resultCode === 0) {
                dispatch(setStatus(status));
            }
}
export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file)
            if (response.data.resultCode === 0) {
                dispatch(savePhotoSuccess(response.data.data.photos));
            }
}
export const saveProfile = (profile) => async (dispatch ,getState) => {
    const userId = getState().auth.userId;
    let response = await profileAPI.saveProfile(profile)
            if (response.data.resultCode === 0) {
                dispatch(getUserProfile(userId));
            }else{
                dispatch(stopSubmit('edit-profile', { _error: response.data.messages }))
                //let formError = response.data.messages.slice(30,-1).toLowerCase()
                //dispatch(stopSubmit('edit-profile', {"contacts":{ formError : response.data.messages[0]} }))
                return Promise.reject(response.data.messages[0])
            }
}



export default profileReducer;