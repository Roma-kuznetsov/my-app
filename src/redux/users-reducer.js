import { userAPI } from "../api/api";


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FACHING = 'TOGGLE_IS_FACHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFaching: false,
    followingInProgress: [],
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                //users: updateObjetInArray(state.users, action.userId, "id", {followed: true})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: true }
                    }
                    return u
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                //users: updateObjetInArray(state.users, action.userId, "id", {followed: false})
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }
        case SET_USERS: {
            return {
                ...state,
                users: [...action.users]
            }
        }
        case SET_CURRENT_PAGE: {
            return {
                ...state,
                currentPage: action.currentPage
            }
        }
        case SET_TOTAL_USERS_COUNT: {
            return {
                ...state,
                totalUsersCount: action.count
            }
        }
        case TOGGLE_IS_FACHING: {
            return { ...state, isFaching: action.isFaching }
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFaching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }
        default:
            return state;
    }
}

export const acceptFollow = (userId) => ({ type: FOLLOW, userId })
export const acceptUnfollow = (userId) => ({ type: UNFOLLOW, userId })
export const setUser = (users) => ({ type: SET_USERS, users })
export const setUserCurrent = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage })
export const setUsersTotalCount = (totalUsersCount) => ({ type: SET_TOTAL_USERS_COUNT, count: totalUsersCount })
export const toggleIsFaching = (isFaching) => ({ type: TOGGLE_IS_FACHING, isFaching })
export const toggleIsFollowing = (isFaching, userId) => ({ type: TOGGLE_IS_FOLLOWING_PROGRESS, isFaching, userId })

export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        dispatch(toggleIsFaching(true));
        let data = await userAPI.getUsers(currentPage, pageSize)
            dispatch(toggleIsFaching(false));
            dispatch(setUser(data.items));
            dispatch(setUsersTotalCount(data.totalCount));
            dispatch(setUserCurrent(currentPage))
    }
}



//Thunc group for update server status
const followUnfollowFlow = async (dispatch,userId,apiMethod,actionCreater) =>{
    dispatch(toggleIsFollowing(true, userId))
    let response = await apiMethod(userId)
            if (response.resultCode === 0) {
                dispatch(actionCreater(userId))
            }
            dispatch(toggleIsFollowing(false, userId))
}
export const follow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch,userId,userAPI.userFollow.bind(userAPI),acceptUnfollow)
    }
}
export const unfollow = (userId) => {
    return async (dispatch) => {
        followUnfollowFlow(dispatch,userId,userAPI.userUnfollow.bind(userAPI),acceptFollow)
    }
}





export default usersReducer;