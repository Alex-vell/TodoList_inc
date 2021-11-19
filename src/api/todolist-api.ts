import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': '724c553c-960a-4a5c-aa67-c9d1bcd4ed73'
    }
})

export const todolistApi = {
    getTodo() {
        return instance.get<TodoType[]>('/todo-lists')
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType} >>('/todo-lists', {title})
    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`/todo-lists/${todolistId}`, {todolistId ,title})
    }
}

type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}
// type CreateTodoType = {
//     fieldsErrors: Array<string>
//     resultCode: number
//     messages: Array<string>
//     data: {
//         item: TodoType
//     }
// }
type DeleteAndUpdateTodoType = {
    fieldsErrors: Array<string>
    resultCode: number
    messages: Array<string>
    data: {}
}