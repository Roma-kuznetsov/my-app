import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
const SET_USER_DATA = 'auth/SET_USER_DATA'
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'



let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    capthaImg: null,
}
debugger
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    }
}
//unshift(newPost);

export const setUserData = (userId, email, login, isAuth) => ({ type: SET_USER_DATA, payload: { userId, login, email, isAuth } })
export const setCapthaUrlSuccess = (capthaImg) => ({ type: GET_CAPTCHA_URL_SUCCESS, payload: { capthaImg } })

export const getUserData = () => async (dispatch) => {
    let response = await authAPI.me()
            if (response.data.resultCode === 0) {
                let { id, email, login } = response.data.data;
                dispatch(setUserData(id, email, login, true));
            }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
            if (response.data.resultCode === 0) {
                dispatch(getUserData())
            } else {
                if(response.data.resultCode === 10  ){
                    dispatch(getCaptchaUrl())
                }
                let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error"
                dispatch(stopSubmit('login', { _error: message }))
            }
}

export const getCaptchaUrl = () => async (dispatch) => {
    let response = await authAPI.getCaptcha()
    const capthaImg = response.data.url;
    dispatch(setCapthaUrlSuccess(capthaImg))
}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
            if (response.data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            }
}

export default authReducer;