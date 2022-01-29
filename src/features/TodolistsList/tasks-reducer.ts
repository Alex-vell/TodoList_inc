import {addTodolistAC, removeTodolistAC, setTodos,} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

// const initialState: TasksStateType = {}


export const getTasksTC = createAsyncThunk('task/fetchTask', (todolistId: string, thunkAPI) => {

    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return todolistsAPI.getTasks(todolistId)
        .then((res) => {
            /*dispatch(setAppStatusAC('succeeded'))*/
            return {todolistId, tasks: res.data.items}
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({error: error})
        })
        .finally(() => {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            // return {status: 'succeeded'}
        })
})

export const removeTaskTC = createAsyncThunk('task/removeTask', (param: { taskId: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return todolistsAPI.deleteTask(param.todolistId, param.taskId)
        .then((res) => {

            if (res.data.resultCode === 0) {
                return {taskId: param.taskId, todolistId: param.todolistId}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({error})
        })
        .finally(() => {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        })
})

export const addTaskTC = createAsyncThunk('task/addTask', (param: { title: string, todolistId: string }, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    return todolistsAPI.createTask(param.todolistId, param.title)
        .then((res) => {
            if (res.data.resultCode === 0) {
                let task = res.data.data.item
                return {task}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return thunkAPI.rejectWithValue(res.data)
            }
        })
        .catch((error: AxiosError) => {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue({error})
        })
        .finally(() => {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        })
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

    const res = await todolistsAPI.updateTask(param.todolistId, param.taskId, apiModel)
    try {
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
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        })
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.id]
        })
        builder.addCase(setTodos, (state, action) => {
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
// export const {/*removeTaskAC,*/ /*addTaskAC,*/ /*changeTaskStatusAC,*/ /*changeTaskTitleAC,*/ /*getTasksAC*/} = slice.actions

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

/*
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {SetAppErrorActionType, setAppStatusAC} from "../../app/app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "GET-TASKS":
            return {...state, [action.todolistId]: action.tasks}

        case "SET-TODOS": {
            const copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        default:
            return state;
    }
}

// action

export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)

export const addTaskAC = (task: TaskType) =>
    ({type: 'ADD-TASK', task} as const)

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) =>
    ({type: 'CHANGE-TASK-STATUS', taskId, status, todolistId,} as const)

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)

export const getTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: 'GET-TASKS', todolistId, tasks} as const)

// thunks

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(getTasksAC(todolistId, res.data.items))
                /!*dispatch(setAppStatusAC('succeeded'))*!/
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
                // dispatch(setAppErrorAC(error.message))
                // dispatch(setAppStatusAC('failed'))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    /!*dispatch(setAppStatusAC('succeeded'))*!/
                } else {
                    handleServerAppError(res.data, dispatch)
                }

            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    let task = res.data.data.item
                    dispatch(addTaskAC(task))
                    /!*dispatch(setAppStatusAC('succeeded'))*!/
                } else {
                    handleServerAppError(res.data, dispatch)
                    // if (res.data.messages.length) {
                    //     dispatch(setAppErrorAC(res.data.messages[0]))
                    // } else {
                    //     dispatch(setAppErrorAC('Some error occurred'))
                    // }
                    // dispatch(setAppStatusAC('failed'))
                }
            })
            .catch((error: AxiosError) => {
                handleServerNetworkError(error, dispatch)
                // dispatch(setAppErrorAC(error.message))
                // dispatch(setAppStatusAC('failed'))
            })
            .finally(() => {
                dispatch(setAppStatusAC('succeeded'))
            })
    }
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))

        const allTasks = getState().tasks
        const tasksForCurrentTodo = allTasks[todolistId]
        const currentTask = tasksForCurrentTodo.find(t => t.id === taskId)

        if (currentTask) {
            const model: UpdateTaskModelType = {
                title: currentTask.title,
                status,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline,
                description: currentTask.description
            }
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskStatusAC(taskId, status, todolistId))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }

                })
                .catch((error: AxiosError) => {
                    handleServerNetworkError(error, dispatch)
                })
                .finally(() => {
                    dispatch(setAppStatusAC('succeeded'))
                })
        }
    }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        const allTask = getState().tasks
        const tasksForCurrentTodo = allTask[todolistId]
        const currentTask = tasksForCurrentTodo.find(t => t.id === taskId)

        if (currentTask) {
            const model: UpdateTaskModelType = {
                title,
                description: currentTask.description,
                status: currentTask.status,
                priority: currentTask.priority,
                startDate: currentTask.startDate,
                deadline: currentTask.deadline
            }
            todolistsAPI.updateTask(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === 0) {
                        dispatch(changeTaskTitleAC(taskId, title, todolistId))
                        /!* dispatch(setAppStatusAC('succeeded'))*!/
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }

                })
                .catch((error: AxiosError) => {
                    handleServerNetworkError(error, dispatch)
                })
                .finally(() => {
                    dispatch(setAppStatusAC('succeeded'))
                })
        }
    }

// types

type ActionsType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof getTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodosActionType
    | SetAppErrorActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}*/

