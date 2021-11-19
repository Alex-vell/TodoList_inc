import React from "react";
// import {Provider} from "react-redux";
// import {AppRootStateType} from "./store";
// import {combineReducers, createStore} from "redux";
// import {tasksReducer} from "./tasks-reducer";
// import {todolistsReducer} from "./todolists-reducer";
// import {v1} from "uuid";
//
//
//
// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer
// })
//
// const initialGlobalState = {
//     todolists: [
//         {id: "todolistId1", title: "What to learn", filter: "all"},
//         {id: "todolistId2", title: "What to buy", filter: "all"}
//     ] ,
//     tasks: {
//         ["todolistId1"]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true}
//         ],
//         ["todolistId2"]: [
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "React Book", isDone: true}
//         ]
//     }
//     // "todolistId1": [
//     //     { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//     //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     //     { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
//     //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     //     { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
//     //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//     // ],
//     // "todolistId2": [
//     //     { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//     //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     //     { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
//     //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
//     //     { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
//     //         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
//     // ]
// };
//
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
//
//
// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => <Provider store={storyBookStore}>
//     {storyFn()}
// </Provider>