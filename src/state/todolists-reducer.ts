import {FilterValuesType, TodolistType} from "../App";


export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistID: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    value: FilterValuesType
    todolistId: string

}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ActionType = RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistFilterActionType
    | ChangeTodolistTitleActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' : {
            return [...state.filter(tl => tl.id != action.id)]
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.todolistID, title: action.title, filter: 'all'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            /*const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }*/
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            /*let todolist = state.find(tl => tl.id === action.todolistId);
            if (todolist) {
                todolist.filter = action.value;
            }*/
            return state.map(tl => tl.id === action.todolistId ? {...tl, filter: action.value} : tl)
            //return state.find((tl => tl.id === action.todolistId) ? {...tl, filter: action.value} : tl)
        }
        default:
            return state
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    }as const
}
export const AddTodolistAC = (title: string, todolistID: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistID
    }as const
}
export const ChangeTodolistFilterAC = (value: FilterValuesType, todolistId: string): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        value,
        todolistId

    }as const
}
export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id,
        title
    }as const
}