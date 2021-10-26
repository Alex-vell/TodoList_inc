import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {Button} from "./components/Button";

export type filterType = 'All' | 'Active' | 'Completed'

function App() {

    const [tasks1, setTasks1] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false},
        {id: 4, title: "HTML&CSS", isDone: true},
        {id: 5, title: "JS", isDone: true},
        {id: 6, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number) => {
        let filtertask1 = tasks1.filter(f => f.id !== taskId)
        setTasks1(filtertask1)
    }

    let [filter, setFilter] = useState<filterType>('All')
    const changeFilter = (valueFilter: filterType) => {
        setFilter(valueFilter)
    }

    let drushlack = tasks1
    if(filter==='Completed') {
        drushlack = tasks1.filter(f => f.isDone)
    }
    if(filter==='Active') {
        drushlack = tasks1.filter(f => !f.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={drushlack}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
