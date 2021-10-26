import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID_1, title: 'What to learn', filter: 'all'},
        {id: todoListID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListID_1]: [
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "CSS", isDone: false},
            {id: v1(), title: "HTML", isDone: true},
        ],
        [todoListID_2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Bread", isDone: false},
            {id: v1(), title: "Meat", isDone: true},
        ]
    })

    //BLL:
    /*const [tasks, setTasks] = useState<Array<TaskType>>([   // state
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "React", isDone: false},
        {id: v1(), title: "Redux", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ])*/

    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks, })
    }
    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        /*const todoListsTasks = tasks[todoListID]
        const updatedTodoListsTasks = todoListsTasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t)*/
        tasks[todoListID] = tasks[todoListID].map(t => t.id === taskID ? {...t, isDone} : t)
        setTasks({...tasks})
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListID: string) => {
        const updatedTodoLists = todoLists.map(tl => tl.id === todoListID ? {...tl, filter : filter} : tl)
        setTodoLists(updatedTodoLists)
    }

    const removeTodoList = (todoListID: string) => {
      setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }


    //UI:
    const todoListsComponents = todoLists.map(tl => {
        let tasksForRender = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
        }
        return (
            <TodoList // TodoList()
                key={tl.id}
                id={tl.id}
                filter={tl.filter}
                title={tl.title}
                tasks={tasksForRender}
                addTask={addTask}
                removeTodoList={removeTodoList}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
            />
        )
    })
    //


    return (
        <div className="App">
            {todoListsComponents}
        </div>
    );
}

export default App;
