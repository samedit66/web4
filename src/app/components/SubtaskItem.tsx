import React from "react";
import { Subtask } from "../types";
import styles from "../styles/SubtaskItem.module.css";

interface SubtaskItemProps {
  subtask: Subtask;
  onEdit: () => void;
  onDelete: () => void;
}

const SubtaskItem: React.FC<SubtaskItemProps> = ({ subtask, onEdit, onDelete }) => {
  return (
    <div className={styles.subtaskItem}>
      <p>Subtask: {subtask.subtaskTitle}</p>
      <button onClick={onEdit}>Edit</button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default SubtaskItem;
