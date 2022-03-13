import React from "react";
import styles from "./ListSection.module.css";

const ListSection = (props) => {
  const toDoList = props.toDoList;

  return (
    <div className={styles.container}>
      <ul className={styles['list-container']}>
        {
          toDoList.length === 0
          ? <Empty />
          : toDoList.map(item => {
              return (
                <Item
                  key={item.id}
                  toDo={item}
                  onRemove={props.onRemoveItem}
                  onToggleTodo={props.onToggleToDo}
                />
              );
            })
        }
      </ul>
    </div>
  );
}
export default ListSection;

const Item = (props) => {
  const toDo = props.toDo;

  return (
    <li className={`${styles['list-item']} ${toDo.done ? styles.done : ''}`}>
      <div className={styles['item-text-container']}>
        <button className={styles['item-text']} onClick={() => {props.onToggleTodo(toDo.id)}}>{toDo.text}</button>
        <div className={styles['item-text-date']}>{toDo.date}</div>
      </div>
      <button className={styles['item-remove']} onClick={() => {props.onRemove(toDo.id)}}>Remove</button>
    </li>
  );
}

const Empty = () => {
  return <div className={styles.empty}>No Data</div>
}