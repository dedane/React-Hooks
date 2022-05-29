import React, {useRef, useImperativeHandle} from 'react'
import classes from './input.module.css'

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    const activate = () => {
        inputRef.current.focus();
    }
    //Only useImperativeHandle if you want to use the ref outside of the component
    useImperativeHandle(ref, ()=> {
        return {
            focus: activate
        }
    })
   
    return (
    <div
        className={`${classes.control} ${
            props.isValid === false ? classes.invalid : ''
        }`}
    >
    <label htmlFor="email">E-Mail</label>
        <input
            type="email"
            id="email"
            value={props.value}
            onChange={props.onChange}
            onBlur={props.onBlur}
        />
  </div>

    ) 
})
export default Input;