import React from 'react';
import {filterType} from "./App";
import {Button} from "./components/Button";

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask:(taskId: number)=>void
    changeFilter:(valueFilter: filterType) => void

}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>

            {props.tasks.map(mt => {
                return (
                    <li key={mt.id}>
                        <button onClick={() => props.removeTask(mt.id)}>x</button>
                        <input type="checkbox" checked={mt.isDone}/>
                        <span>{mt.title}</span>
                    </li>
                )
            })}

        </ul>
        <div>
        <Button  changeFilter={props.changeFilter} />

            {/*<button onClick={()=> props.changeFilter('All')}>All</button>
            <button onClick={()=> props.changeFilter('Active')}>Active</button>
            <button onClick={()=> props.changeFilter('Completed')}>Completed</button>*/}
        </div>
    </div>
}
