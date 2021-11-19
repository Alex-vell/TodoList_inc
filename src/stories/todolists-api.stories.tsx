 import React, {useEffect, useState} from 'react'
// ;
// import {todolistsAPI} from "../api/todolists-api";
//
// export default {
//     title: 'API'
// }
//
// export const GetTodolists = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todolistsAPI.getTodolists().then((res) => {
//                 setState(res.data)
//             })
//
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const CreateTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const title = 'YEEE'
//         todolistsAPI.createTodolist(title).then((res) => {
//                 setState(res.data.data)
//             })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const DeleteTodolist = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '';
//         todolistsAPI.deleteTodolist(todolistId).then((res) => {
//             setState(res.data)
//         })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const UpdateTodolistTitle = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         const todolistId = '';
//         const title = 'LOLOLO'
//         todolistsAPI.updateTodolist(todolistId, title).then((res) => {
//             setState(res.data)
//         })
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
