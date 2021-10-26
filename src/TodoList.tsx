import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskID: string, todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    removeTodoList: (todoListID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const tasksList = props.tasks.map(t => {
        const changeStatus =
            (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
        return (
            <li key={t.id}>
                <input
                    type="checkbox"
                    checked={t.isDone}
                    onChange={changeStatus}
                />
                <span className={!t.isDone ? "notCompleted" : ""}>{t.title}</span>
                <button onClick={() => props.removeTask(t.id, props.id)}>x</button>
            </li>
        )
    })

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addTask(title, props.id)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const setAllFilter = () => props.changeTodoListFilter("all", props.id)
    const setActiveFilter = () => props.changeTodoListFilter("active", props.id)
    const setCompletedFilter = () => props.changeTodoListFilter("completed", props.id)
    const onKeyPressAddTask = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if(error){
            setError(false)
        }
        setTitle(e.currentTarget.value)
    }

    let allBtnClass = "";
    if (props.filter === "all") {
        allBtnClass = "active-filter"
    }
    const activeBtnClass = props.filter === "active" ? "active-filter" : ""
    const completedBtnClass = props.filter === "completed" ? "active-filter" : ""
    return (
        <div>
            <h3>{props.title}<button onClick={() => props.removeTodoList(props.id)}>x</button></h3>
            <div>
                <input
                    value={title}
                    onChange={changeTitle}
                    onKeyPress={onKeyPressAddTask}
                    className={error ? "error" : ""}
                />
                <button onClick={addTask}>+</button>
                {error && <div style={{color: "red"}}>Title is required!</div>}
            </div>
            <ul>
                {tasksList}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={setAllFilter}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={setActiveFilter}>Active
                </button>
                <button
                    className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={setCompletedFilter}>Completed
                </button>
            </div>
        </div>
    )
}

export default TodoList;