import React, {ChangeEvent, useCallback} from 'react'
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan'
import {TaskStatuses, TaskType} from '../../../../api/todolists-api'
import {Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {updateTask} from '../../tasks-reducer';
import {useDispatch} from 'react-redux';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch()
    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(updateTask({
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todolistId: props.todolistId
        }))
    }, [props.task.id, props.todolistId])

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
