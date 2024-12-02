"use client";
import { useRouter, useParams } from "next/navigation"; // Изменен импорт
import React, { useEffect, useState } from "react";
import TodoForm from "../../components/TodoForm";
import { Task } from "../../types";

const EditTask: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [todos, setTodos] = useState<Task[]>([]);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Task[];
    setTodos(savedTodos);

    const urlParts = window.location.pathname.split("/");
    const id = urlParts[urlParts.length - 1];
    const task = savedTodos[+id]; // +id конвертирует строку в число
    setCurrentTask(task);
  }, []);

  const saveTask = (updatedTask: Task) => {
    const id = +params.id;
    const updatedTodos = [...todos];
    updatedTodos[id] = updatedTask;
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    router.push("/"); // Возвращаемся на главную страницу
  };

  if (!currentTask) return <div>Loading...</div>;

  return (
    <TodoForm
      todoTitle={currentTask.title}
      todoDesc={currentTask.text}
      todoDifficulty={currentTask.difficulty}
      todoTags={currentTask.tags}
      setTodoTitle={(title) => setCurrentTask({ ...currentTask, title })}
      setTodoDesc={(text) => setCurrentTask({ ...currentTask, text })}
      setTodoDifficulty={(difficulty) => setCurrentTask({ ...currentTask, difficulty })}
      setTodoTags={(tags) => setCurrentTask({ ...currentTask, tags })}
      onSubmit={() => saveTask(currentTask)}
      isEditing={true}
      isEditingSubtask={false}
      onCancel={() => router.push("/")}
      onDeleteAll={() => {}}
      isDeleteAllDisabled={true}
    />
  );
};

export default EditTask;