import React, { ChangeEvent, useCallback } from 'react'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { TaskStatuses, TaskType } from '../../../../api/todolists-api'
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import { updateTask } from '../../tasks-reducer';
import { useDispatch } from 'react-redux';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    /*changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void*/
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);
    
    // const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    //     let newIsDoneValue = e.currentTarget.checked
    //     props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    // }, [props.task.id, props.todolistId]);
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask({
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        }))
    }, [props.task.id, props.todolistId])

    // const onTitleChangeHandler = useCallback((newValue: string) => {
    //     props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    // }, [props.task.id, props.todolistId]);
    const onTitleChangeHandler = useCallback((newValue: string) => {
        dispatch(updateTask({
            taskId: props.task.id,
            model: {title: newValue},
            todolistId: props.todolistId
        }))
    }, [props.task.id, props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})


/*
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, /!*taskId: string*!/) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
    /!*todolistId: string*!/
}

export const Task = React.memo((props: TaskPropsType) => {

    console.log('Task')

    const {id, title, isDone} = props.task

    const onClickHandler = useCallback(() =>
        props.removeTask(id, /!*props.id*!//!* props.todolistId*!/), [props.removeTask, id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(id, newIsDoneValue, /!*props.id*!/);
    }, [props.changeTaskStatus, id])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(id, newValue,/!* props.id*!/);
    }, [props.changeTaskTitle, id])

    return <div key={props.task.id} className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})

*/
