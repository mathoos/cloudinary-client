import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    user: null,
}


const userSlice = createSlice({
    name: 'user', 
    initialState, 
    reducers: { 

        // Reducer pour mettre à jour le token
        setToken(state, action) {
            state.token = action.payload // action.payload permet d'obtenir les données associées à l'action
        },

        // Reducer pour effacer le token
        clearToken(state) {
            state.token = null;
        }
    }
});

export const { setToken, setUser, clearToken } = userSlice.actions;
export default userSlice.reducer;