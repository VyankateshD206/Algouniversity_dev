    import { createSlice } from "@reduxjs/toolkit";

    const authSlice = createSlice({
        name:"auth",
        initialState: {user:null,isAuthenticated:false,loading:true},
        reducers:{
            login: (state,action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
            },
            logout:(state) => {
                state.isAuthenticated = false;
                state.user= null;
                state.loading = false;
            },
            setLoading:(state,action) =>{
                state.loading = action.payload;
            }
        }
    });
    export const{login,logout,setLoading} = authSlice.actions;
    export default authSlice.reducer;
