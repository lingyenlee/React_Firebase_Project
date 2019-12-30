import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from "../actions/types";

const initialState = {
    authError: null
}

const authReducer = (state = initialState, action) => {
    //console.log(action.payload)
    switch (action.type) {
        case LOGIN_ERROR:
            console.log("login error")
            return {
                ...state,
                authError: "Login failed"
            }
        case LOGIN_SUCCESS:
            console.log("signin success", action.payload)
            return {
                ...state,
                authError: null
            }
        case LOGOUT_SUCCESS:
            console.log("signout success")
            return state
        case SIGNUP_SUCCESS:
            console.log("signup success")
            return {
                ...state,
                authError: null
            }
        case SIGNUP_ERROR:
            console.log("signup error")
            return {
                ...state,
                authError: action.err.message
            }
        default:
            return state
    }

}

export default authReducer;