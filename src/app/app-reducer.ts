import {authAPI} from "../api/todolists-api";
import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const initializeAppTC = createAsyncThunk('app/initializeApp', async (param, thunkAPI) => {
    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setIsLoggedInAC({isLoggedIn: true}));
            return {isLoggedIn: true}
        }

    } catch (e) {

    }
})

const slice = createSlice({
    name: 'app',
    initialState: {
        status: 'idle' as RequestStatusType,
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
            state.error = action.payload.error
        },
        setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
            state.status = action.payload.status
        },
    },
    extraReducers: (build) => {
        build.addCase(initializeAppTC.fulfilled, (state, action) => {
            state.isInitialized = true
        })
    }
})

export const appReducer = slice.reducer
export const {setAppErrorAC, setAppStatusAC} = slice.actions

//types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}