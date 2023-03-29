import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import LinearProgress from '@mui/material/LinearProgress';
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {Login} from "../features/Login/Login";
import {Navigate, Route, Routes} from 'react-router-dom'
import {CircularProgress, IconButton, Toolbar, Typography} from "@mui/material";
import {logoutTC} from "../features/Login/auth-reducer";
import {useEffect} from "react";
import {TodolistList} from "../features/TodolistList/TodolistList";
import {AppBar} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import './App.css';


type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>((state) => state.app.isInitialized)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [])

    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar style={{display: "flex", justifyContent: "space-between"}}>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            TodoList
                        </Typography>
                    </div>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Logout</Button>}
                </Toolbar>

            </AppBar>
            <div style={{height: "4px"}}>
                {status === 'loading' && <LinearProgress/>}
            </div>

            <Container fixed>
                <Routes>
                    <Route path='/' element={<TodolistList demo={demo}/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='404' element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path='*' element={<Navigate to='/404'/>}/>

                </Routes>
            </Container>
        </div>
    )
}

export default App
