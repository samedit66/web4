"use client";
import React, { useState, useEffect } from "react";
import { Task, Subtask } from "./types";
import TodoItem from "./components/TodoItem";
import TodoForm from "./components/TodoForm";
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

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Task[];
    setTodos(savedTodos);
  }, []);

  const saveToLocalStorage = (updatedTodos: Task[]) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  const addTodo = () => {
    if (!todoTitle || !todoDesc || !todoDifficulty || !todoTags) {
      alert("Please fill out all fields before adding a task.");
      return; // Прерываем выполнение функции, если хотя бы одно поле пустое
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
    const taskToEdit = todos[index];
    setTodoTitle(taskToEdit.title);
    setTodoDesc(taskToEdit.text);
    setTodoDifficulty(taskToEdit.difficulty);
    setTodoTags(taskToEdit.tags);
    setEditingIndex(index);
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

  const addSubtask = (index: number, subtask: Subtask) => {
    const updatedTodos = [...todos];
    updatedTodos[index].subtasks.push(subtask);
    saveToLocalStorage(updatedTodos);
  };

  // Редактирование подзадачи, но подзадача не добавляется сразу в список.
  const editSubtask = (todoIndex: number, subtaskIndex: number) => {
    const subtask = todos[todoIndex].subtasks[subtaskIndex];
    
    // Заполняем форму содержимым подзадачи
    setTodoTitle(subtask.subtaskTitle);
    setTodoDesc(subtask.subtaskDescription);
    setTodoDifficulty(subtask.subtaskDifficulty);
    setTodoTags(subtask.subtaskTags);

    setCurrentSubtask(subtask);  // Сохраняем текущую подзадачу для редактирования
    setCurrentSubtaskIndex(subtaskIndex);  // Сохраняем индекс подзадачи
    setIsEditingSubtask(true);  // Устанавливаем флаг редактирования подзадачи
  };

  const saveSubtask = (todoIndex: number) => {
    if (currentSubtask && currentSubtaskIndex !== null) {
      const updatedTodos = [...todos];
  
      // Обновляем данные подзадачи с новыми значениями из формы
      updatedTodos[todoIndex].subtasks[currentSubtaskIndex] = {
        ...updatedTodos[todoIndex].subtasks[currentSubtaskIndex],
        subtaskTitle: todoTitle,  // Обновляем название подзадачи
        subtaskDescription: todoDesc,  // Обновляем описание подзадачи
        subtaskDifficulty: todoDifficulty,  // Обновляем сложность подзадачи
        subtaskTags: todoTags,  // Обновляем теги подзадачи
      };
  
      saveToLocalStorage(updatedTodos);  // Сохраняем обновленные данные в локальное хранилище
      clearSubtaskFields();  // Очищаем форму и сбрасываем состояния
    }
  };

  // Отмена процесса редактирования подзадачи
  const cancelEditSubtask = () => {
    clearSubtaskFields();  // Сбрасываем поля формы
    setIsEditingSubtask(false);  // Убираем флаг редактирования подзадачи
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

  const clearSubtaskFields = () => {
    setCurrentSubtask(null);  // Сбрасываем текущую подзадачу
    setCurrentSubtaskIndex(null);  // Сбрасываем индекс подзадачи
    setIsEditingSubtask(false);  // Сбрасываем флаг редактирования
    setTodoTitle("");  // Очищаем поле названия
    setTodoDesc("");  // Очищаем поле описания
    setTodoDifficulty("");  // Очищаем поле сложности
    setTodoTags("");  // Очищаем поле тегов
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
      <TodoForm
        todoTitle={todoTitle}
        todoDesc={todoDesc}
        todoDifficulty={todoDifficulty}
        todoTags={todoTags}
        setTodoTitle={setTodoTitle}
        setTodoDesc={setTodoDesc}
        setTodoDifficulty={setTodoDifficulty}
        setTodoTags={setTodoTags}
        onSubmit={editingIndex !== null ? saveTodo : addTodo}
        isEditing={editingIndex !== null}
        isEditingSubtask={isEditingSubtask}
        onDeleteAll={deleteAllTasks}
        isDeleteAllDisabled={todos.length === 0}
      />
      <div className={styles.todoList}>
        {todos.map((todo, index) => (
          <TodoItem
            key={index}
            todo={todo}
            index={index}
            onEdit={() => editTask(index)}
            onDelete={(index) => deleteTodo(index)}
            onAddSubtask={addSubtask}
            onEditSubtask={(subtaskIndex) => editSubtask(index, subtaskIndex)}
            onDeleteSubtask={(subtaskIndex) => deleteSubtask(index, subtaskIndex)}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
