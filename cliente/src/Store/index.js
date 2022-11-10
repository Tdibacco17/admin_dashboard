import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'

import authReducer from "../Reducer/authReducer";
import rootReducer from "../Reducer/rootReducer";

const reducer = {
    auth: authReducer,
    root: rootReducer
}

// const preLoadedState = {
//     userLogin: { userInfo: userInfoFromStorage },
// }

const middleware = [thunk]

const store = configureStore({
    reducer,
    // preLoadedState,
    middleware,
})

export default store