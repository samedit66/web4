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
      <button onClick={onSubmit}>
        {isEditing ? (isEditingSubtask ? "Save Subtask" : "Save Task") : "Add Task"}
      </button>
      <button
        onClick={onDeleteAll}
        disabled={isDeleteAllDisabled}
        className={isDeleteAllDisabled ? styles.disabledButton : ""}
        >
        Delete all
      </button>
    </div>
  );
};

export default TodoForm;
