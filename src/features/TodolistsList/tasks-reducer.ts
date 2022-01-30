import {addTodolistTC, getTodolistsThunk, removeTodolistTC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {AppRootStateType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const getTasksTC = createAsyncThunk('task/fetchTask', async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.getTasks(todolistId)
        return {todolistId, tasks: res.data.items}
    } catch (err) {
        const error = err as AxiosError
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error: error})
    } finally {
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
    }
})

export const removeTaskTC = createAsyncThunk('task/removeTask', async (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.deleteTask(param.todolistId, param.taskId)
        if (res.data.resultCode === 0) {
            return {taskId: param.taskId, todolistId: param.todolistId}
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

export const addTaskTC = createAsyncThunk('task/addTask', async (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistsAPI.createTask(param.todolistId, param.title)
        if (res.data.resultCode === 0) {
            let task = res.data.data.item
            return {task}
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

export const updateTask = createAsyncThunk('tasks/updateTask', async (param: { taskId: string, model: UpdateDomainTaskModelType, todolistId: string },
                                                                      thunkAPI) => {
    const state = thunkAPI.getState() as AppRootStateType
    const task = state.tasks[param.todolistId].find((t: TaskType) => t.id === param.taskId)
    if (!task) {
        return thunkAPI.rejectWithValue('task not found in the state')
    }
    const apiModel: UpdateTaskModelType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...param.model
    }

    try {
        const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
        if (res.data.resultCode === 0) {
            return param
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(res.data)
        }
    } catch (error: any) {
        handleServerNetworkError(error, thunkAPI.dispatch)
        return thunkAPI.rejectWithValue({error})
    }
})

export const slice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todolist.id] = []
            }
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(getTodolistsThunk.fulfilled, (state, action) => {
            action.payload.todos.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(getTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.task.todoListId].unshift(action.payload.task)
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = slice.reducer

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

