import Card from "./component/Card";
import InputSection from "./component/InputSection";
import styles from "./App.module.css";
import ListSection from "./component/ListSection";
import {useState} from "react";
import LocalActionSection from "./component/LocalActionSection";

const localStorageKey = 'react-todolist';

const App = () => {
  const [toDoList, setToDoList] = useState([]);

  const toggleToDoHandler = (id) => {
    setToDoList(prevState => {
      return prevState.map(item => {
        const newItem = {...item};
        if (newItem.id === id) newItem.done = !newItem.done;

        return newItem;
      });
    });
  }

  const addListItemHandler = (newListItem) => {
    setToDoList(prevState => {
      return [...prevState, newListItem];
    });
  }

  const removeListItemHandler = (id) => {
    setToDoList(prevState => {
      return prevState.filter(item => item.id !== id);
    });
  }

  const saveToLocalHandler = () => {
    if(toDoList.length === 0) {
      localStorage.removeItem(localStorageKey);
      return;
    }

    const toDoListString = JSON.stringify(toDoList);
    localStorage.setItem(localStorageKey, toDoListString);
  }

  const loadFromLocalHandler = () => {
    const loadedToDoList = localStorage.getItem(localStorageKey);
    if(loadedToDoList) setToDoList(JSON.parse(loadedToDoList));
    else setToDoList([]);
  }

  return (
    <div className={styles.container}>
      <Card>
        <LocalActionSection onSave={saveToLocalHandler} onLoad={loadFromLocalHandler} />
        <InputSection onAddItem={addListItemHandler} />
        <ListSection
          toDoList={toDoList}
          onToggleToDo={toggleToDoHandler}
          onRemoveItem={removeListItemHandler}
          onLocalSave={saveToLocalHandler}
          onLocalLoad={loadFromLocalHandler}
        />
      </Card>
      <a className={styles['github-link']} href="https://github.com/muchammadindra97">Indra's GitHub</a>
    </div>
  );
}

export default App;
