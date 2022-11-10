import axios from "axios";

export function registerUser(payload) {
    return async function (dispatch) {
        const { data } = await axios.post(`/registerUser`, payload);

        return dispatch({
            type: "REGISTER_USER",
            payload: data
        })
    };
};

export function checkEmailDb({ email }) {

    return async function (dispatch) {
        const { data } = await axios.get(`/checkEmailDb?email=${email}`);

        return dispatch({
            type: "CHECK_EMAIL_DB",
            payload: data
        })
    };
}

export function sendEmailContact(payload) {
    return async function (dispatch) {
        const { data } = await axios.post(`/sendEmailContact`, payload);

        return dispatch({
            type: "SEND_EMAIL_CONTACT",
            payload: data
        })
    };
};

export function updateUserProfile({ id, payload }) {
    return async function (dispatch) {
        const { data } = await axios.put(`/updateUserProfile?id=${id}`, payload);

        return dispatch({
            type: "UPDATE_USER_PROFILE",
            payload: data
        })
    };
};

export function getAllUser() {

    return async function (dispatch) {
        const { data } = await axios.get(`/getUser`)

        return dispatch({
            type: "GET_ALL_USER",
            payload: data
        })
    };
};


export function getAllEmail() {

    return async function (dispatch) {
        const { data } = await axios.get(`/getEmail`)

        return dispatch({
            type: "GET_ALL_EMAIL",
            payload: data
        })
    };
};

export function deleteUserId({ id }) {

    return async function (dispatch) {
        const { data } = await axios.delete(`/deleteUser?id=${id}`)

        return dispatch({
            type: "DELETE_USER",
            payload: data
        })
    };
}

export function deleteEmailId({ id }) {

    return async function (dispatch) {
        const { data } = await axios.delete(`/deleteEmail?id=${id}`)

        return dispatch({
            type: "DELETE_EMAIL",
            payload: data
        })
    };
}

export function searchbarEmail(payload) {

    return async function (dispatch) {
        const { data } = await axios.post(`/searchbarEmail`, payload)

        return dispatch({
            type: "SEARCHBAR_EMAIL",
            payload: data
        })
    };
}

export function searchbarUser(payload) {

    return async function (dispatch) {
        const { data } = await axios.post(`/searchbarUser`, payload)

        return dispatch({
            type: "SEARCHBAR_USER",
            payload: data
        })
    };
}

export function orderByName(payload) {

    return {
        type: "ORDER_BY_NAME",
        payload: payload
    };
}

export function orderByFullName(payload) {

    return {
        type: "ORDER_BY_FULLNAME",
        payload: payload
    };
}