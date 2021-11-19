import {todolistsAPI, TodolistType} from '../api/todolists-api'
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

const initialState: Array<TodolistDomainType> = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
]

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case "SET-TODOS":
            return action.todos.map(tl => ({...tl, filter: 'all'}))

        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)

        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all'}, ...state ]

        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? { ...tl, title: action.title} : tl)

        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)

        default:
            return state;
    }
}

// action

export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', id: todolistId} as const)

export const addTodolistAC = (/*title: string,*/ todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', /*title: title,*/ todolist} as const)

export const changeTodolistTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id: id, title: title} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter} as const)

export const setTodos = (todos: Array<TodolistType>) =>
    ({type: 'SET-TODOS', todos} as const)

// Thunk

export const getTodolistsThunk = (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    // side effects
    todolistsAPI.getTodolists()
        .then((response) => {
            //2.dispatch action (thunk)
            let todos = response.data
            dispatch(setTodos(todos))
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            dispatch(removeTodolistAC(todolistId))
        })
}

export const createTodolistTC = (title: string) => (dispatch: Dispatch) => {
    todolistsAPI.createTodolist(title)
        .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const updateTodolistTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todolistsAPI.updateTodolist(id, title)
        .then((res) => {
            dispatch(changeTodolistTitleAC(id, title))
        })

}

// types

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

type ActionsType = RemoveTodolistActionType
    | AddTodolistActionType
    | SetTodosActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>

export type SetTodosActionType = ReturnType<typeof setTodos>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
