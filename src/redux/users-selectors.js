import { createSelector } from "reselect"


const getUsersSelector = (state) => {
  return state.usersPage.users
}

export const getUsersSelectorHard = createSelector(getUsersSelector,
  (users) => {
    return users.filter(u => true);
  })


export const getPageSizeSelector = (state) => {
  return state.usersPage.pageSize
}

export const totalUsersCountSelector = (state) => {
  return state.usersPage.totalUsersCount
}

export const currentPageSelector = (state) => {
  return state.usersPage.currentPage
}

export const isFachingSelector = (state) => {
  return state.usersPage.isFaching
}

export const followingInProgressSelector = (state) => {
  return state.usersPage.followingInProgress
}
