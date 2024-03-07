import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    posts: {
        items:[]
    }
}

const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        addNewPost: (state, action)=>{
            state.posts.items.push(action.payload)
            console.log(action.payload)
        },
        deletePost: (state, action)=>{
            console.log(action.payload)

            const index = state.posts.items.findIndex(elem => elem._id === action.payload)
            // state.posts.items[index] = action.payload
            state.posts.items.splice(index, 1);

        },
        updatePost: (state, action) => {
            const index = state.posts.items.findIndex(elem => elem._id === action.payload._id);
            if (index !== -1) {
                state.posts.items[index] = action.payload;
            }
        },
        getAllPosts: (state,action) => {
            state.posts.items=action.payload
            console.log(action.payload)
        }
    }
})

export const postsReducer = postsSlice.reducer
export const actionsPosts = postsSlice.actions