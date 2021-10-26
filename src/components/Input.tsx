import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import styles from './Input.module.css'

type propsType = {
    title: string
    callBack:(title:string)=>void
}

export const Input = (props: propsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState(false)
    const addTaskHandler = () => {
        props.callBack(title);
        setTitle("")
        setError(true)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)

    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.callBack(title);
            setTitle("")
            setError(true)

        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error === false ? styles.error : ''}

            />
            <button onClick={addTaskHandler}>{props.title}</button>
            {error && <div className={styles.errorMessage}>Title is required</div>}
        </div>
    )
}