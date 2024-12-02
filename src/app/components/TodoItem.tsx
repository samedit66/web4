"use client";

import React from "react";
import { Task, Subtask } from "../types";
import SubtaskItem from "./SubtaskItem";
import styles from "../styles/TodoItem.module.css";

interface TodoItemProps {
  todo: Task;
  index: number;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onAddSubtask: (index: number, subtask: Subtask) => void;
  onEditSubtask: (todoIndex: number, subtaskIndex: number) => void;
  onDeleteSubtask: (todoIndex: number, subtaskIndex: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  index,
  onEdit,
  onDelete,
  onAddSubtask,
  onEditSubtask,
  onDeleteSubtask,
}) => {
  return (
    <div className={styles.todoItem}>
      <h3>{todo.title}</h3>
      <p>{todo.text}</p>
      <p>Difficulty: {todo.difficulty}</p>
      <p>Tags: {todo.tags}</p>

      <button
        className={styles.editTaskBtn}
        onClick={() => onEdit(index)}
      >
        Edit
      </button>

      <button
        className={styles.deleteTaskBtn}
        onClick={() => onDelete(index)}
      >
        Delete
      </button>

      <button
        className={styles.addSubtaskBtn}
        onClick={() =>
          onAddSubtask(index, {
            subtaskTitle: "New Subtask",
            subtaskDescription: "Description",
            subtaskDifficulty: "Medium",
            subtaskTags: "Tag",
          })
        }
      >
        Add Subtask
      </button>

      <div className={styles.subtasks}>
        {todo.subtasks.map((subtask, subIndex) => (
          <SubtaskItem
            key={subIndex}
            subtask={subtask}
            onEdit={() => onEditSubtask(index, subIndex)}
            onDelete={() => onDeleteSubtask(index, subIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoItem;
