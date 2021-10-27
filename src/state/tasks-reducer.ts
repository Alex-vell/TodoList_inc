import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId:string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId:string
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    isDone: boolean
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    newTitle: string
    todolistId: string
}
/*export type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}*/


type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType) => {
    switch (action.type) {
        case 'REMOVE-TASK':

            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)}
        case 'ADD-TASK':

            return {...state, [action.todolistId]:  [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]}

        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, isDone: action.isDone} : t)}

        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title: action.newTitle} : t)}

        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}

        case 'REMOVE-TODOLIST':

           // let copyState = {...state}  // with delete
            //delete copyState[action.id]

            let {[action.id]: [], ...copyState} = {...state} // with destructuring

            return copyState


        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId:string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todolistId}
}
export const addTaskAC = (title: string, todolistId:string): AddTaskActionType => {
    return { type: 'ADD-TASK', title, todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId}as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, newTitle, todolistId}as const
}
/*export const removeTodolistAC = (todolistId: string): removeTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', todolistId}
}*/
