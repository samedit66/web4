"use client";
import { useRouter, useParams } from "next/navigation"; // Изменен импорт
import React, { useEffect, useState } from "react";
import TodoForm from "../../components/TodoForm";
import { Task, Subtask } from "../../types";

const EditSubtask: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const [todos, setTodos] = useState<Task[]>([]);
  const [currentSubtask, setCurrentSubtask] = useState<Subtask | null>(null);

  useEffect(() => {
    const ids = params.id.split("-");
    const todoIndex = +ids[0];
    const subtaskIndex = +ids[1];

    const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Task[];
    setTodos(savedTodos);

    if (!isNaN(todoIndex) && !isNaN(subtaskIndex)) {
      const subtask = savedTodos[todoIndex]?.subtasks[subtaskIndex];
      if (subtask) {
        setCurrentSubtask(subtask);
      } else {
        alert("Invalid subtask index");
        router.push("/"); // Возвращаемся на главную, если подзадача не найдена
      }
    }
  }, [router]);

  const saveSubtask = (updatedSubtask: Subtask) => {
    const urlParts = window.location.pathname.split("/");
    const id = urlParts[urlParts.length - 1];
    const [todoIndex, subtaskIndex] = id.split("-").map(Number);

    const updatedTodos = [...todos];
    updatedTodos[todoIndex].subtasks[subtaskIndex] = updatedSubtask;
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    router.push("/"); // Возвращаемся на главную страницу
  };

  if (!currentSubtask) return <div>Loading...</div>;

  return (
    <TodoForm
      todoTitle={currentSubtask.subtaskTitle}
      todoDesc={currentSubtask.subtaskDescription}
      todoDifficulty={currentSubtask.subtaskDifficulty}
      todoTags={currentSubtask.subtaskTags}
      setTodoTitle={(title) =>
        setCurrentSubtask({ ...currentSubtask, subtaskTitle: title })
      }
      setTodoDesc={(desc) =>
        setCurrentSubtask({ ...currentSubtask, subtaskDescription: desc })
      }
      setTodoDifficulty={(difficulty) =>
        setCurrentSubtask({ ...currentSubtask, subtaskDifficulty: difficulty })
      }
      setTodoTags={(tags) =>
        setCurrentSubtask({ ...currentSubtask, subtaskTags: tags })
      }
      onSubmit={() => saveSubtask(currentSubtask)}
      isEditing={false}
      isEditingSubtask={true}
      onCancel={() => router.push("/")}
      onDeleteAll={() => {}}
      isDeleteAllDisabled={true}
    />
  );
};

export default EditSubtask;