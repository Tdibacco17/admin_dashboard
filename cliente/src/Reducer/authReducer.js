import jwt_decode from "jwt-decode"

const initialState = {
    isLoggedIn: !!localStorage.getItem('token'), //devuelve true o false si existe o no
    token: localStorage.getItem('token'),
    isAdmin: !!localStorage.getItem('admin'),
    tokenUpdatePass: localStorage.getItem('tokenPass'),
    tokenNewPass: localStorage.getItem('tokenPass'),
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case "LOGIN_USER":
            if (action.payload.success === false) { //pregunto por el success y luego el resto
                return {
                    ...state,
                }
            } else {
                const user = jwt_decode(action.payload.token)

                localStorage.setItem('token', action.payload.token);
                if (user.data.Administrador === 1) {
                    localStorage.setItem('admin', "permiso");
                }
                return {
                    ...state,
                    isLoggedIn: true,
                    token: action.payload.token,
                    isAdmin: user.data.Administrador === 1 ? true : false
                }
            }
        case "LOGOUT_USER":
            localStorage.removeItem('token');
            localStorage.removeItem('admin');
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                isAdmin: false
            }
        case "SEND_EMAIL_FORGOT_PASSWORD":
            return {
                ...state
            }
        case "GET_TOKEN_UPDATE_PASSWORD":

            localStorage.setItem('tokenPass', action.payload.token);
            return {
                ...state,
                tokenUpdatePass: true,
                tokenNewPass: action.payload.token,
            }
        case "UPDATE_FORGOT_PASSWORD":

            localStorage.removeItem('tokenPass');
            return {
                ...state,
                tokenUpdatePass: false,
                tokenNewPass: null
            }
        default:
            return state;
    }
}