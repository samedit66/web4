"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Task, Subtask } from "./types";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
import ThemeToggle from "./components/ThemeToggle";
import styles from "./styles/Home.module.css";

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDesc, setTodoDesc] = useState("");
  const [todoDifficulty, setTodoDifficulty] = useState("");
  const [todoTags, setTodoTags] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isEditingSubtask, setIsEditingSubtask] = useState(false);
  const [currentSubtask, setCurrentSubtask] = useState<Subtask | null>(null);
  const [currentSubtaskIndex, setCurrentSubtaskIndex] = useState<number | null>(null);
  const [currentTodoIndex, setCurrentTodoIndex] = useState<number | null>(null);

  const router = useRouter();

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Task[];
    setTodos(savedTodos);
  }, []);

  const saveToLocalStorage = (updatedTodos: Task[]) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const navigateToFilter = () => {
    router.push("/filterwindow");
  };

  const addTodo = () => {
    if (!todoTitle || !todoDesc || !todoDifficulty || !todoTags) {
      alert("Please fill out all fields before adding a task.");
      return;
    }

    const newTodo: Task = {
      title: todoTitle,
      text: todoDesc,
      difficulty: todoDifficulty,
      tags: todoTags,
      subtasks: [],
    };

    saveToLocalStorage([...todos, newTodo]);
    clearFields();
  };

  const editTask = (index: number) => {
    router.push(`/tasks/${index}`);
  };

  const saveTodo = () => {
    if (editingIndex === null) return;

    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = {
      ...updatedTodos[editingIndex],
      title: todoTitle,
      text: todoDesc,
      difficulty: todoDifficulty,
      tags: todoTags,
    };

    saveToLocalStorage(updatedTodos);
    clearFields();
    setEditingIndex(null);
  };

  const deleteTodo = (index: number) => {
    saveToLocalStorage(todos.filter((_, i) => i !== index));
    clearFields();
    setEditingIndex(null);
  };

  const addSubtaskHandler = (todoIndex: number) => {
    setIsEditingSubtask(true); // Переключаем в режим добавления подзадачи
    setCurrentTodoIndex(todoIndex); // Запоминаем индекс задачи, к которой добавляется подзадача
    clearFields(); // Очищаем форму
  };

  const saveSubtask = () => {
    // Проверяем, что поля заполнены и выбрана задача
    if (
      currentTodoIndex === null ||
      !todoTitle.trim() ||
      !todoDesc.trim() ||
      !todoDifficulty.trim() ||
      !todoTags.trim()
    ) {
      alert("Please fill out all fields before saving a subtask.");
      return;
    }
  
    // Создаем новую подзадачу
    const newSubtask: Subtask = {
      subtaskTitle: todoTitle.trim(),
      subtaskDescription: todoDesc.trim(),
      subtaskDifficulty: todoDifficulty.trim(),
      subtaskTags: todoTags.trim(),
    };
  
    // Добавляем подзадачу в выбранную задачу
    const updatedTodos = [...todos];
    //updatedTodos[currentTodoIndex].subtasks.push(newSubtask);
    if (currentSubtaskIndex !== null) {
      updatedTodos[currentTodoIndex].subtasks[currentSubtaskIndex] = newSubtask;
    }
    else {
      updatedTodos[currentTodoIndex].subtasks.push(newSubtask);
    }

    // Сохраняем изменения и очищаем форму
    saveToLocalStorage(updatedTodos);
    clearFields();
    setIsEditingSubtask(false); // Возвращаем форму в режим добавления задач
    setCurrentTodoIndex(null);
  };

  const cancelSubtaskHandler = () => {
    clearFields();
    setIsEditingSubtask(false);
    setCurrentTodoIndex(null);
    setCurrentSubtaskIndex(null);
  };

  const editSubtask = (todoIndex: number, subtaskIndex: number) => {
    router.push(`/subtasks/${todoIndex}-${subtaskIndex}`);
  };

  const deleteSubtask = (todoIndex: number, subtaskIndex: number) => {
    const updatedTodos = [...todos];
    updatedTodos[todoIndex].subtasks.splice(subtaskIndex, 1);
    saveToLocalStorage(updatedTodos);
  };

  const clearFields = () => {
    setTodoTitle("");
    setTodoDesc("");
    setTodoDifficulty("");
    setTodoTags("");
  };
  
  const deleteAllTasks = () => {
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      localStorage.removeItem("todos");
      setTodos([]);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Todo List</h1>
      <ThemeToggle />
      <button className={styles.searchButton} onClick={navigateToFilter}>
        Search
      </button>
      <TodoForm
        todoTitle={todoTitle}
        todoDesc={todoDesc}
        todoDifficulty={todoDifficulty}
        todoTags={todoTags}
        setTodoTitle={setTodoTitle}
        setTodoDesc={setTodoDesc}
        setTodoDifficulty={setTodoDifficulty}
        setTodoTags={setTodoTags}
        onSubmit={isEditingSubtask ? saveSubtask : editingIndex !== null ? saveTodo : addTodo}
        isEditing={editingIndex !== null}
        isEditingSubtask={isEditingSubtask}
        onDeleteAll={deleteAllTasks}
        isDeleteAllDisabled={todos.length === 0}
        onCancel={isEditingSubtask ? cancelSubtaskHandler : undefined}
      />
      <div className={styles.todoList}>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            onEdit={() => editTask(index)}
            onDelete={(index) => deleteTodo(index)}
            onAddSubtask={() => addSubtaskHandler(index)}
            onEditSubtask={(subtaskIndex) => editSubtask(index, subtaskIndex)}
            onDeleteSubtask={(subtaskIndex) => deleteSubtask(index, subtaskIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
