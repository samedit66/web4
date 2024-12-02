"use client";

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
      <button className={styles.editBtn} onClick={onEdit}>Edit</button>
      <button className={styles.deleteBtn} onClick={onDelete}>Delete</button>
    </div>
  );
};

export default SubtaskItem;
