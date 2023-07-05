"use client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Todo = {
  id: string;
  task: string;
  completed: boolean;
  createdAt: Date;
};

export type TodosContext = {
  todos: Todo[];
  handleAddTodos: (task: string) => void;
  toggleTodoAsCompleted: (id: string) => void;
  handleDeleteTodo: (id: string) => void;
};

export const TodoContext = createContext<TodosContext | null>(null);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todos.length > 0 && localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const data = localStorage.getItem("todos");
    data && setTodos(JSON.parse(data));
  }, []);

  const handleAddTodos = (task: string) => {
    setTodos([
      ...todos,
      {
        id: Math.random().toString(),
        task,
        completed: false,
        createdAt: new Date(),
      },
    ]);
  };

  const toggleTodoAsCompleted = (id: string) => {
    const tmpArr: Todo[] = [];
    todos?.forEach((item) => {
      if (item.id == id) {
        tmpArr.push({ ...item, completed: true });
      } else {
        tmpArr.push(item);
      }
    });
    setTodos(tmpArr);
  };

  const handleDeleteTodo = (id: string) => {
    const tmpArr = todos?.filter((item) => {
      return item.id != id;
    });
    setTodos(tmpArr);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        handleAddTodos,
        toggleTodoAsCompleted,
        handleDeleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export function useTodos() {
  const todosContextValue: TodosContext | null = useContext(TodoContext);
  if (!todosContextValue) {
    throw new Error("UseTodos used outside the provider");
  }
  return todosContextValue;
}
