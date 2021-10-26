import React from "react";
import {FilterValuesType} from "../App";

type propsType ={
    changeFilter: (value: FilterValuesType)=>void
    title: FilterValuesType
}


export const Button = (props:propsType) => {
    const changeFilterOneHandler = () => {
        props.changeFilter(props.title)
    }
    return(
        <button onClick={changeFilterOneHandler}>{props.title}</button>
    )
}