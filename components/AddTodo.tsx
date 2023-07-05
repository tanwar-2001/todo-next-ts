"use client";
import { useTodos } from "@/store/todos";
import React, { useState } from "react";

const AddTodo = () => {
  const [todo, setTodo] = useState("");

  const { handleAddTodos } = useTodos();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddTodos(todo);
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Write your todos"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit"> ADD </button>
    </form>
  );
};

export default AddTodo;
