import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Input} from "./components/Input";
import styles from './Todolist.module.css'

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatus:(checked:boolean,id:string)=>void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    // let [title, setTitle] = useState("")

    // const addTask = () => {
    //     props.addTask(title);
    //     setTitle("");
    // }
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     setTitle(e.currentTarget.value)
    // }
    // const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.charCode === 13) {
    //         addTask();
    //     }
    // }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const onChangehanderCheckbox=(event:ChangeEvent<HTMLInputElement>,tID:string)=>{
        // console.log(event.currentTarget.checked)
        props.changeStatus(event.currentTarget.checked,tID)
    }

    return <div>
        <h3>{props.title}</h3>
        <Input title={'+'} callBack={props.addTask}/>
        {/*<div>*/}
        {/*    <input value={title}*/}
        {/*           onChange={ onChangeHandler }*/}
        {/*           onKeyPress={ onKeyPressHandler }*/}
        {/*    />*/}
        {/*    <button onClick={addTask}>+</button>*/}
        {/*</div>*/}
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    return <li key={t.id}>
                        <input onChange={(e)=>onChangehanderCheckbox(e,t.id)} type="checkbox" checked={t.isDone}/>
                        <span className={t.isDone ? styles.isDone : ''}>{t.title}</span>
                        <button onClick={ onClickHandler }>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? styles.activeFilter : ''} onClick={ onAllClickHandler }>All</button>
            <button className={props.filter === 'active' ? styles.activeFilter : ''} onClick={ onActiveClickHandler }>Active</button>
            <button className={props.filter === 'completed' ? styles.activeFilter : ''} onClick={ onCompletedClickHandler }>Completed</button>
        </div>
    </div>
}
