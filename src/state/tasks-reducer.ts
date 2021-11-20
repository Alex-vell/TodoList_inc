import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodosActionType} from './todolists-reducer';
import {TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: TasksStateType = {
    /*"todolistId1": [
        { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ],
    "todolistId2": [
        { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
        { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
    ]*/
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {

        case "GET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        // const copyState = {...state}
        // copyState[action.todolistId] = action.tasks
        // return copyState

        case "SET-TODOS": {
            const copyState = {...state}
            action.todos.forEach((tl) => {
                copyState[tl.id] = []
            })
            return copyState
        }

        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        // {
        //     const stateCopy = {...state}
        //     const tasks = stateCopy[action.todolistId];
        //     const newTasks = tasks.filter(t => t.id !== action.taskId);
        //     stateCopy[action.todolistId] = newTasks;
        //     return stateCopy;
        // }

        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        // {
        //     const stateCopy = {...state}
        //     const tasks = stateCopy[action.task.todoListId];
        //     const newTasks = [action.task, ...tasks];
        //     stateCopy[action.task.todoListId] = newTasks;
        //     return stateCopy;
        // }

        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, status: action.status} : t)
            }
        // {
        //     let todolistTasks = state[action.todolistId];
        //     let newTasksArray = todolistTasks
        //         .map(t => t.id === action.taskId ? {...t, status: action.status} : t);
        //
        //     state[action.todolistId] = newTasksArray;
        //     return ({...state});
        // }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }

        // {
        //     let todolistTasks = state[action.todolistId];
        //     // найдём нужную таску:
        //     let newTasksArray = todolistTasks
        //         .map(t => t.id === action.taskId ? {...t, title: action.title} : t);
        //
        //     state[action.todolistId] = newTasksArray;
        //     return ({...state});
        // }

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
    ({type: 'CHANGE-TASK-STATUS', taskId, status, todolistId, } as const)

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)

export const getTasksAC = (todolistId: string, tasks: Array<TaskType>) =>
    ({type: 'GET-TASKS', todolistId, tasks} as const)

// thunks

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.getTasks(todolistId)
            .then((res) => {
                dispatch(getTasksAC(todolistId, res.data.items))
            })
    }
}

export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const createTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistsAPI.createTask(todolistId, title)
            .then((res) => {
                let task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

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

                    dispatch(changeTaskStatusAC(taskId, status, todolistId))
                })
        }
    }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {

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
                    dispatch(changeTaskTitleAC(taskId, title, todolistId))
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