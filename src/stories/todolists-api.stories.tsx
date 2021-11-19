import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodo().then((res) => {
                setState(res.data)
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'YEEE'
            todolistApi.createTodo(title).then((res) => {
                setState(res.data.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '';
        todolistApi.deleteTodo(todolistId).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '';
        const title = 'LOLOLO'
        todolistApi.updateTodoTitle(todolistId, title).then((res) => {
            setState(res.data)
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
