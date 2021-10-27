import React, {ChangeEvent} from 'react';
import {FilterValuesType, TodolistType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
}

export function TodolistRedux(props: PropsType) {

    const todo = useSelector<AppRootStateType, TodolistType>(state => state.todolists
        .filter(todo => todo.id === props.id)[0])

    const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])

    const todolistId = props.id
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    const removeTodolist = () => {
        let action = removeTodolistAC(todolistId)
        dispatch(action)
    }
    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }

    let allTodolistTasks = tasks
    let tasksForTodolist = allTodolistTasks

    if (todo.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (todo.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, "completed"))

    return <div>
        <h3> <EditableSpan value={todo.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolistId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, todolistId))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, todolistId))
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={todo.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={todo.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={todo.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


