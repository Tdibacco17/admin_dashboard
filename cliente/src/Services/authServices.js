import axios from "axios";

export function getLoginUser(payload) {

    return async function (dispatch) {
        let { data } = await axios.post('/verifyLoginUser', payload);

        return dispatch({
            type: "LOGIN_USER",
            payload: data
        })
    }
}

export function getLogoutUser() {

    return async function (dispatch) {
        return dispatch({
            type: "LOGOUT_USER",
        })
    }
}

export function getTokenUpdate(id) {

    return async function (dispatch) {
        let { data } = await axios.post('/updateTokenVerify', id);
        return dispatch({
            type: "LOGIN_USER",
            payload: data
        })
    }
}

export function sendEmailForgotPassword(payload) {

    return async function (dispatch) {
        let { data } = await axios.post('/forgotPassword', payload);
        return dispatch({
            type: "SEND_EMAIL_FORGOT_PASSWORD",
            payload: data
        })
    }
}


export function getTokenForUpdatePassword({ email }) {

    return async function (dispatch) {
        let { data } = await axios.get(`/getTokenForUpdatePassword?email=${email}`);
        return dispatch({
            type: "GET_TOKEN_UPDATE_PASSWORD",
            payload: data
        })
    }
}

export function updateForgotPassword(payload) {

    return async function (dispatch) {
        let { data } = await axios.put(`/updateForgotPassword`, payload);
        return dispatch({
            type: "UPDATE_FORGOT_PASSWORD",
            payload: data
        })
    }
}
