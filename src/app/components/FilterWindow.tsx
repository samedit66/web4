"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Task } from "../types";
import styles from "../styles/FilterWindow.module.css";

const FilterWindow: React.FC = () => {
    const [todos, setTodos] = useState<Task[]>([]);
    const [filterQuery, setFilterQuery] = useState("");
    const [filteredTodos, setFilteredTodos] = useState<Task[]>([]);

    const router = useRouter();

    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]") as Task[];
        setTodos(savedTodos);
    }, []);

    const filterTasks = () => {
        const results = todos.filter((todo) =>
            todo.title.toLowerCase().includes(filterQuery.toLowerCase())
        );
        setFilteredTodos(results);
    };

    const backToHome = () => {
        router.push("/");
    };

    return (
        <div className={styles.container}>
            <h1>Filter Tasks</h1>
            <input
                type="text"
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                placeholder="Enter task name"
                className={styles.input}
            />
            <button className={styles.filterButton} onClick={filterTasks}>
                Filter
            </button>
            <button className={styles.backButton} onClick={backToHome}>
                Back to Home
            </button>
            <div className={styles.results}>
                {filteredTodos.length > 0 ? (
                    filteredTodos.map((todo, index) => (
                        <div key={index} className={styles.task}>
                            <h3>{todo.title}</h3>
                            <p>{todo.text}</p>
                        </div>
                    ))
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
        </div>
    );
};

export default FilterWindow;
