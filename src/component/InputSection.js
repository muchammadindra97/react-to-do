import React, {useRef, useState} from "react";
import styles from "./InputSection.module.css";

const InputSection = (props) => {
  const [toDo, setToDo] = useState('');
  const [inputErrors, setInputErrors] = useState([]);
  const toDoInputEl = useRef();

  const toDoInputHandler = (event) => {
    setToDo(event.target.value);
  }

  const addToDoHandler = (event) => {
    event.preventDefault();
    const isValidInput = inputValidation(toDo);

    setInputErrors(isValidInput);
    if(isValidInput.length > 0) {
      toDoInputEl.current.focus();
      return;
    }

    const today = new Date();
    const localeOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    }

    const newItem = {
      id: today.getTime(),
      text: toDo,
      date: today.toLocaleString(undefined, localeOptions),
      done: false
    };

    props.onAddItem(newItem);
    setToDo('');
  }

  return (
    <div className={styles.container}>
      <form className={styles['input-container']} onSubmit={addToDoHandler}>
        <input
          ref={toDoInputEl}
          className={styles['input-field']}
          type="text"
          placeholder="Type to do...."
          name="toDo"
          value={toDo}
          onChange={toDoInputHandler}
        />
        <button className={styles['button-add']} type="submit">Add</button>
      </form>
      {inputErrors && <Error errors={inputErrors} />}
    </div>
  );
}
export default InputSection;

const Error = (props) => {
  const errors = props.errors;
  
  return (
    <ul className={styles.error}>
      {errors.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}

const inputValidation = (value) => {
  const trimmedValue = value.trim();
  let result = [];

  if (trimmedValue.length <= 0) result.push("Input description can't be empty!");

  return result;
};