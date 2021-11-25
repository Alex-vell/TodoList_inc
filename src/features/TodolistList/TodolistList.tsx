import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {
    changeTodolistFilterAC,
    createTodolistTC,
    FilterValuesType,
    getTodolistsThunk,
    removeTodolistTC,
    TodolistDomainType,
    updateTodolistTC
} from "../TodolistsList/todolists-reducer";
import {
    createTaskTC,
    removeTaskTC,
    TasksStateType,
    updateTaskStatusTC,
    updateTaskTitleTC
} from "../TodolistsList/tasks-reducer";
import {TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../../components/AddItemForm/AddItemForm";
import {Todolist} from "../TodolistsList/Todolist/Todolist";

type TodolistListPropsType = {}
export const TodolistList: React.FC<TodolistListPropsType> = (props) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getTodolistsThunk)
    }, [])

    const removeTask = useCallback(function (id: string, todolistId: string) {
        // const action = removeTaskAC(id, todolistId);
        // dispatch(action);
        dispatch(removeTaskTC(id, todolistId))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        // const action = addTaskAC(title, todolistId);
        // dispatch(action);
        dispatch(createTaskTC(title, todolistId))
    }, []);

    const changeTaskStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        // const action = changeTaskStatusAC(id, status, todolistId);
        // dispatch(action);
        dispatch(updateTaskStatusTC(todolistId, id, status))
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        // const action = changeTaskTitleAC(id, newTitle, todolistId);
        // dispatch(action);
        dispatch(updateTaskTitleTC(todolistId, id, newTitle))
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        // const action = removeTodolistAC(id);
        // dispatch(action);
        dispatch(removeTodolistTC(id))
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        // const action = changeTodolistTitleAC(id, title);
        // dispatch(action);
        dispatch(updateTodolistTC(id, title))
    }, []);

    const addTodolist = useCallback((title: string) => {
        // const action = addTodolistAC(title);
        // dispatch(action);
        dispatch(createTodolistTC(title))
    }, [dispatch]);

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
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeTaskStatus}
                                    filter={tl.filter}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
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