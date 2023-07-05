"use client";
import { useTodos } from "@/store/todos";
import { useSearchParams } from "next/navigation";

const Todos = () => {
  const searchParams = useSearchParams();
  const todosFilter = searchParams.get("todos");
  const { todos, toggleTodoAsCompleted, handleDeleteTodo } = useTodos();
  let filterTodos = todos;

  if (todosFilter === "active") {
    filterTodos = todos.filter((item) => {
      if (item.completed === false) {
        return item;
      }
    });
  } else if (todosFilter === "completed") {
    filterTodos = todos.filter((item) => {
      if (item.completed === true) {
        return item;
      }
    });
  }

  return (
    <ul>
      {filterTodos?.map((item) => {
        return (
          <li key={item.id}>
            <input
              type="checkbox"
              id={`todo-${item.id}`}
              checked={item.completed}
              onChange={() => toggleTodoAsCompleted(item.id)}
            />
            <label htmlFor={`todo-${item.id}`}>{item.task}</label>
            {item.completed && (
              <button onClick={() => handleDeleteTodo(item.id)}>Delete</button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Todos;
