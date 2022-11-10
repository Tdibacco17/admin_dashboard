import jwt_decode from "jwt-decode"

const initialState = {
    users: [],
    emails: [],
};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "REGISTER_USER":
            return {
                ...state,
            }
        case "CHECK_EMAIL_DB":
            return {
                ...state
            }
        case "SEND_EMAIL_CONTACT":
            return {
                ...state,
            }
        case "UPDATE_USER_PROFILE":
            return {
                ...state,
            }
        case "GET_ALL_USER":
            const users = jwt_decode(action.payload.token)

            return {
                ...state,
                users: users.data
            }
        case "GET_ALL_EMAIL":
            const emails = jwt_decode(action.payload.token)

            return {
                ...state,
                emails: emails.data
            }
        case "DELETE_USER":
            return {
                ...state,
            }
        case "DELETE_EMAIL":
            return {
                ...state,
            }
        case "SEARCHBAR_USER":
            const searchbarUser = jwt_decode(action.payload.token)

            return {
                ...state,
                users: searchbarUser.data
            }
        case "SEARCHBAR_EMAIL":
            const searchbarEmail = jwt_decode(action.payload.token)

            return {
                ...state,
                emails: searchbarEmail.data
            }
        case "ORDER_BY_NAME":
            const sortNameUSer = action.payload === 'asc'
                ? state.users.sort(function (a, b) {
                    if (a.Name > b.Name) {
                        return 1
                    }
                    if (b.Name > a.Name) {
                        return -1
                    }
                    return 0
                })
                : state.users.sort(function (a, b) {
                    if (a.Name > b.Name) {
                        return -1
                    }
                    if (b.Name > a.Name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                users: sortNameUSer
            }
        case "ORDER_BY_FULLNAME":
            const sortFullNameEmail = action.payload === 'asc'
                ? state.emails.sort(function (a, b) {
                    if (a.Full_Name > b.Full_Name) {
                        return 1
                    }
                    if (b.Full_Name > a.Full_Name) {
                        return -1
                    }
                    return 0
                })
                : state.emails.sort(function (a, b) {
                    if (a.Full_Name > b.Full_Name) {
                        return -1
                    }
                    if (b.Full_Name > a.Full_Name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                emails: sortFullNameEmail
            }
        default:
            return state;
    }
}