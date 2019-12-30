import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from "./types"

export const signIn = (credentials) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(() => {
            dispatch({
                type: LOGIN_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: LOGIN_ERROR,
                err
            })
        })
    }
}

export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()

        firebase.auth().signOut()
        //need this to remove missing permission error in firebase rules
        firebase.logout()
            .then(() => {
                dispatch({
                    type: LOGOUT_SUCCESS
                })
            })
    }
}

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase()
        const firestore = getFirestore()

        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            return firestore.collection("users")
                .doc(response.user.uid)
                .set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0]
                })
        }).then(() => {
            dispatch({
                type: SIGNUP_SUCCESS
            })
        }).catch(err => {
            dispatch({
                type: SIGNUP_ERROR,
                err
            })
        })
    }
}