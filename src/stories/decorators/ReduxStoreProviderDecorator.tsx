import React from "react";
import {Provider} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../../features/TodolistsList/tasks-reducer";
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";
import {v1} from "uuid";
import thunk from "redux-thunk";
import {appReducer} from "../../app/app-reducer";
import {authReducer} from "../../features/Login/auth-reducer";


const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})


const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0}
    ],
    tasks: {
        ["todolistId1"]:
            [
                {
                    id: v1(), title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                },
                {
                    id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                },
                {
                    id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }
            ],
        ["todolistId2"]:
            [
                {
                    id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                },
                {
                    id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                },
                {
                    id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                }
            ]
    },
    app: {
        status: 'idle',
        error: null,
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};
export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={storyBookStore}>
    {storyFn()}
</Provider>
