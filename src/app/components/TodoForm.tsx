"use client";

import React from "react";
import styles from "../styles/TodoForm.module.css";

interface TodoFormProps {
  todoTitle: string;
  todoDesc: string;
  todoDifficulty: string;
  todoTags: string;
  setTodoTitle: (value: string) => void;
  setTodoDesc: (value: string) => void;
  setTodoDifficulty: (value: string) => void;
  setTodoTags: (value: string) => void;
  onSubmit: () => void;
  isEditing: boolean;
  isEditingSubtask: boolean;
  onCancel?: () => void;
  onDeleteAll: () => void;
  isDeleteAllDisabled: boolean;
}

const TodoForm: React.FC<TodoFormProps> = ({
  todoTitle,
  todoDesc,
  todoDifficulty,
  todoTags,
  setTodoTitle,
  setTodoDesc,
  setTodoDifficulty,
  setTodoTags,
  onSubmit,
  isEditing,
  isEditingSubtask,
  onCancel,
  onDeleteAll,
  isDeleteAllDisabled,
}) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type="text"
        placeholder={isEditingSubtask ? "Subtask title" : "Task title"}
        value={todoTitle}
        onChange={(e) => setTodoTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder={isEditingSubtask ? "Subtask description" : "Task description"}
        value={todoDesc}
        onChange={(e) => setTodoDesc(e.target.value)}
      />
      <input
        type="text"
        placeholder="Difficulty"
        value={todoDifficulty}
        onChange={(e) => setTodoDifficulty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags"
        value={todoTags}
        onChange={(e) => setTodoTags(e.target.value)}
      />
      <div className={styles.buttonGroup}>
        <button onClick={onSubmit}>
          {isEditingSubtask
            ? "Save Subtask"
            : isEditing
            ? "Save Task"
            : "Add Task"}
        </button>
        {(isEditingSubtask || isEditing) ? (
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        ) : (
          <button
            onClick={onDeleteAll}
            disabled={isDeleteAllDisabled}
            className={isDeleteAllDisabled ? styles.disabledButton : ""}
          >
            Delete All
          </button>
        )}
      </div>
    </div>
  );
};

export default TodoForm;
