import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./Todolist";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, /*taskId: string*/) => void
    changeTaskTitle: (taskId: string, newValue: string) => void
    /*todolistId: string*/
}

export const Task = React.memo((props: TaskPropsType) => {

    console.log('Task')

    const {id, title, isDone} = props.task

    const onClickHandler = useCallback(() =>
        props.removeTask(id, /*props.id*//* props.todolistId*/), [props.removeTask, id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(id, newIsDoneValue, /*props.id*/);
    }, [props.changeTaskStatus, id])

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(id, newValue,/* props.id*/);
    }, [props.changeTaskTitle, id])

    return <div key={props.task.id} className={isDone ? "is-done" : ""}>
        <Checkbox
            checked={isDone}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={title} onChange={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>
})
