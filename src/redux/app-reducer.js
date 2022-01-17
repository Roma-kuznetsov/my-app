
import { getUserData } from "./auth-reducer";


const SET_INITIALAIZED = 'SET_INITIALAIZED'


let initialState = {
    initialazed: false,
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALAIZED:
            return {
                ...state,
                initialazed: true,
            }
        default:
            return state;
    }
}
//unshift(newPost);

export const initialazedSucces = () => ({ type: SET_INITIALAIZED })

export const initializeApp = () => (dispatch) => {
    let promise = dispatch(getUserData())
    Promise.all([promise])
        .then(() => {
            dispatch(initialazedSucces())
        })

}

export default appReducer;