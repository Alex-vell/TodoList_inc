import React from 'react';
import './App.css';
import {TodoList} from "./TodoList";

function App() {

    const task1=[
        {id:1,title:'HTML&CSS1',isDone:true},
        {id:1,title:'JS1',isDone:true},
        {id:1,title:'React1',isDone:true},
    ]

    const task2=[
        {id:1,title:'HTML&CSS2',isDone:true},
        {id:1,title:'JS2',isDone:true},
        {id:1,title:'React2',isDone:true},
    ]

    return (
        <div className="App">
            <TodoList title13={'TodoList1'} klichka={task1}/>
            <TodoList title13={'TodoList'} klichka={task2}/>
        </div>
    );
}

export default App;
