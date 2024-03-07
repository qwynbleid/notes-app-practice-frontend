import { createSlice} from "@reduxjs/toolkit";

const initialState = {
    data:null,
}

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        register: (state,action) => {
            state.data=action.payload
            console.log(action.payload)
        }
    }
})

export const authReducer = authSlice.reducer;
export const {register} = authSlice.actions;