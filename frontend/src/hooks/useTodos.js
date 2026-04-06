import { useState, useEffect } from "react";

const BASE_URL = "";
const API_URL = `${BASE_URL}/todos`;

const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (err) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTodo }),
      });
      setNewTodo("");
      fetchTodos();
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const toggleTodo = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "PATCH" });
      fetchTodos();
    } catch (err) {
      setError("Failed to update todo");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTodo();
  };

  return { todos, newTodo, setNewTodo, addTodo, toggleTodo, handleKeyDown, loading, error };
};

export default useTodos;