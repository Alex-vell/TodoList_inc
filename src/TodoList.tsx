import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import {Button} from "./components/Button";

type TaskType = {
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
}

export function Todolist(props: PropsType) {
    let[title,setTitle] = useState('')
    const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (event:KeyboardEvent<HTMLInputElement>) => {
        if(event.key==='Enter'){
            props.addTask(title)
            setTitle('')
        }
    }
    /*const changeFilterOneHandler = (valueFilter:FilterValuesType) => {
      props.changeFilter(valueFilter)
    }*/

    const removeTaskHandler = (tId: string) => {
        props.removeTask(tId)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map((t) => {

                    /*const removeTaskHandler = () => {
                        props.removeTask(t.id)
                    }*/

                    return(
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={()=>removeTaskHandler(t.id)}>x</button>
                        </li>
                    )
                } )
            }
        </ul>
        <div>
            <Button changeFilter={props.changeFilter} title={'all'}/>
            <Button changeFilter={props.changeFilter} title={'active'}/>
            <Button changeFilter={props.changeFilter} title={'completed'}/>
            {/*<button onClick={()=>changeFilterOneHandler('all')}>All</button>
            <button onClick={()=>changeFilterOneHandler('active')}>Active</button>
            <button onClick={()=>changeFilterOneHandler('completed')}>Completed</button>*/}

            {/*<button onClick={()=>changeFilterOneHandler('all')}>All</button>
            <button onClick={()=>changeFilterOneHandler('active')}>Active</button>
            <button onClick={()=>changeFilterOneHandler('completed')}>Completed</button>*/}
        </div>
    </div>
}
