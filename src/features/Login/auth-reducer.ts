import {setAppStatusAC} from '../../app/app-reducer'
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from 'axios';

export const loginTC = createAsyncThunk('auth/login', async (param: LoginParamsType, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.login(param)
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch);
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return thunkAPI.rejectWithValue(res.data)
            // return {isLoggedIn: false}
        }
    } catch (err) {
        const error: AxiosError = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return thunkAPI.rejectWithValue(error)
    }
})

export const logoutTC = createAsyncThunk('auth/logout', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: false}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return {isLoggedIn: false}
        }
    } catch (err) {
        const error: AxiosError = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return thunkAPI.rejectWithValue({error})
    }
})

const slice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
            state.isLoggedIn = action.payload.isLoggedIn
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        builder.addCase(logoutTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
    }

})

export const authReducer = slice.reducer
export const {setIsLoggedInAC} = slice.actions
