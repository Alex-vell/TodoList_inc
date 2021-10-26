import React from 'react';

type propsType = {
    title13: string
    klichka: Array<typeForKlichka>
}

type typeForKlichka={
    id: number
    title: string
    isDone: boolean
}

export const TodoList = (props:propsType) => {
    return(
        <div>
            <h3>{props.title13}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.klichka[0].isDone}/> <span>{props.klichka[0].title}</span></li>
                <li><input type="checkbox" checked={props.klichka[1].isDone}/> <span>{props.klichka[1].title}</span></li>
                <li><input type="checkbox" checked={props.klichka[2].isDone}/> <span>{props.klichka[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}

