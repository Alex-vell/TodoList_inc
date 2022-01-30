import {todolistsAPI, TodolistType} from '../../api/todolists-api'
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError} from "axios";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


export const getTodolistsThunk = createAsyncThunk('todolists/getTodolists', async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTodolists()
        let todos = res.data
        return {todos}
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            return {id: todolistId}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(res.data)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const addTodolistTC = createAsyncThunk('todolists/addTodolist', async (param: { title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTodolist(param.title)
        if (res.data.resultCode === 0) {
            return {todolist: res.data.data.item}
        } else {
            if (res.data.messages.length) {
                thunkAPI.dispatch(setAppErrorAC({error: res.data.messages[0]}))
            } else {
                thunkAPI.dispatch(setAppErrorAC({error: 'Some error occurred'}))
            }
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const updateTodolistTC = createAsyncThunk('todolists/updateTodolist', async (param: { id: string, title: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.updateTodolist(param.id, param.title)
        if (res.data.resultCode === 0) {
            return {id: param.id, title: param.title}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(res.data)
        }
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

const slice = createSlice({
    name: 'todolists',
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.status
        }
    },
    extraReducers: (build) => {
        build.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            return action.payload.todos.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        build.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            if (index > -1) {
                state.splice(index, 1)
            }
        })
        build.addCase(addTodolistTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
            }
        })
        build.addCase(updateTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        })
    }
})

export const todolistsReducer = slice.reducer
export const {changeTodolistFilterAC, changeTodolistEntityStatusAC} = slice.actions

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export type ChangeTodolistEntityStatusACActionType = ReturnType<typeof changeTodolistEntityStatusAC>
