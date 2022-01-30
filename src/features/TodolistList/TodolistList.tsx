import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    FilterValuesType,
    getTodolistsThunk,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTC
} from "../TodolistsList/todolists-reducer";
import {addTaskTC, removeTaskTC, TasksStateType,} from "../TodolistsList/tasks-reducer";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "../TodolistsList/Todolist/Todolist";
import {Navigate} from "react-router-dom";


type TodolistListPropsType = {
    demo?: boolean
}

export const TodolistList: React.FC<TodolistListPropsType> = ({demo = false}) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect(() => {
        if (demo || !isLoggedIn) {
            return;
        }
        const thunk = getTodolistsThunk()
        dispatch(thunk)
    }, [])

    const removeTask = useCallback(function (taskId: string, todolistId: string) {
        dispatch(removeTaskTC({taskId, todolistId}))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC({title, todolistId}))
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC({id: todolistId, filter: value});
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (todolistId: string) {
        dispatch(removeTodolistTC(todolistId))
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        dispatch(updateTodolistTC({id, title}))
    }, []);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC({title}))
    }, [dispatch]);

    if (!isLoggedIn) {
        return <Navigate to={'/login'}/>
    }

    return (
        <>
            <Grid container style={{padding: '20px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={3}>
                {
                    todolists.map(tl => {
                        let allTodolistTasks = tasks[tl.id];

                        return <Grid item key={tl.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={tl.id}
                                    title={tl.title}
                                    tasks={allTodolistTasks}
                                    filter={tl.filter}
                                    entityStatus={tl.entityStatus}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    // changeTaskStatus={changeTaskStatus}
                                    removeTodolist={removeTodolist}
                                    // changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </>
    )
}