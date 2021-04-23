import { createSlice } from '@reduxjs/toolkit';
import Cookie from 'js-cookie';

const initialState = {
    user: {}
}

const user = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, { payload }) {
            state.user = payload
        },
        removeUser(state) {
            state.user = {}
        },
    }
});

// Actions
export const {
    addUser,
    removeUser
} = user.actions;


// Redux-thunk
export const registerUser = profile => async dispatch => {
    try {
        const response = await fetch("http://localhost:3004/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
        const data = await response.json();
        dispatch(addUser(data))
    } catch(e) {
        console.error(e);
    }
}

export const loginUser = profile => async () => {
    try {
        const response = await fetch("http://localhost:3004/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: profile.email, password: profile.password})
        })
        const data = await response.json();
        Cookie.set('userReact', data.accessToken)
        return response.status === 200
    } catch(e) {
        console.error(e);
        return false
    }
}

// Selectors
export const getUser = (state) => state.user;

export default user.reducer;