import * as axios from "axios";


const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": '8000f3c6-2091-4823-a39d-b091e2e502a0'
    }
})

export const userAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },
    userFollow(id) {
        return instance.delete(`follow/${id}`)
            .then(response => response.data)
    },
    userUnfollow(id) {
        return instance.post(`follow/${id}`)
            .then(response => response.data)
    },
    getProfile(userId) {
        return profileAPI.getProfile(userId)
    }
}
export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/` + userId)
    },
    getStatus(userId) {
        return instance.get(`profile/status/` + userId)
    },
    updateStatus(status) {
        return instance.put(`profile/status`, { status: status })
    },
    savePhoto(photoFile) {
        const formData = new FormData()
        formData.append("image",photoFile)

        return instance.put(`profile/photo`, formData,{ 
            headers:{'Content-Type':"multipart/form-data"}
        })
    },
    saveProfile(profile){
        return instance.put(`profile`, profile)
    }
}

export const authAPI = {
    me() {
        return instance.get(`auth/me`)
    },
    login(email, password, rememberMe = false, captcha = null,) {
        return instance.post(`auth/login`, { email, password, rememberMe, captcha })
    },
    logout() {
        return instance.delete(`auth/login`)
    },
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
    },
}




