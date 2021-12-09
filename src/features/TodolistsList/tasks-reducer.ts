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
                /*dispatch(setAppStatusAC('succeeded'))*/
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
                    /*dispatch(setAppStatusAC('succeeded'))*/
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
                    /*dispatch(setAppStatusAC('succeeded'))*/
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
                       /* dispatch(setAppStatusAC('succeeded'))*/
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
}

