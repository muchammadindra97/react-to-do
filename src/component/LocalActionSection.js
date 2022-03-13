import React, {useState} from "react";
import styles from "./LocalActionSection.module.css";

const LocalActionSection = (props) => {
  const [isConfirmDialog, setIsConfirmDialog] = useState(false);
  const [actionType, setActionType] = useState('');

  const saveHandler = () => {
    setActionType('save');
    setIsConfirmDialog(true);
  }

  const loadHandler = () => {
    setActionType('load');
    setIsConfirmDialog(true);
  }

  const confirmHandler = (isExecute) => {
    if(isExecute) {
      if(actionType === 'save') props.onSave();
      if(actionType === 'load') props.onLoad();
    }
    setActionType('');
    setIsConfirmDialog(false);
  }

  return (
    <div className={styles['local-action']}>
      {isConfirmDialog
        ? <ConfirmDialog onConfirm={confirmHandler} />
        : <ActionDialog onSave={saveHandler} onLoad={loadHandler} />
      }
    </div>
  );
}

export default LocalActionSection;

const ActionDialog = (props) => {
  return (
    <div>
      Local: <button type="button" onClick={props.onLoad}>Load</button> | <button type="button" onClick={props.onSave}>Save</button>
    </div>
  );
}

const ConfirmDialog = (props) => {
  return (
    <div>
      Are you sure? <button type="button" onClick={() => {props.onConfirm(true)}}>Yes</button> | <button type="button" onClick={() => {props.onConfirm(false)}}>Back</button>
    </div>
  )
}