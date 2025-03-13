"use client";

import { useAtom } from "jotai";
import { todosAtom, addTodoAtom, toggleTodoAtom, deleteTodoAtom, fetchTodosAtom } from "@/lib/atoms";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

export default function TodoList() {
  const [todos] = useAtom(todosAtom);
  const [, fetchTodos] = useAtom(fetchTodosAtom);
  const [, addTodo] = useAtom(addTodoAtom);
  const [, toggleTodo] = useAtom(toggleTodoAtom);
  const [, deleteTodo] = useAtom(deleteTodoAtom);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch todos on component mount
  useEffect(() => {
    setIsLoading(true);
    fetchTodos()
      .then(() => setIsLoading(false))
      .catch(err => {
        console.error(err);
        setError("Failed to fetch todos");
        setIsLoading(false);
      });
  }, [fetchTodos]);

  const handleAddTodo = async () => {
    if (!input.trim()) return;
    
    try {
      await addTodo({
        text: input,
        completed: false,
      });
      setInput("");
    } catch (err) {
      console.error(err);
      setError("Failed to add todo");
    }
  };

  const handleToggleTodo = async (id: number) => {
    try {
      await toggleTodo(id);
    } catch (err) {
      console.error(err);
      setError("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      await deleteTodo(id);
    } catch (err) {
      console.error(err);
      setError("Failed to delete todo");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Todo List</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button 
            className="float-right font-bold"
            onClick={() => setError(null)}
          >
            &times;
          </button>
        </div>
      )}
      
      <div className="flex gap-2 mb-4">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          disabled={isLoading}
        />
        <Button onClick={handleAddTodo} disabled={isLoading}>
          Add
        </Button>
      </div>
      
      {isLoading ? (
        <div className="text-center py-4">Loading...</div>
      ) : (
        <ul className="space-y-2">
          {todos.length === 0 ? (
            <li className="text-center py-4 text-gray-500">No todos yet</li>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} className="flex items-center gap-2 border p-2 rounded">
                <Checkbox
                  checked={todo.completed}
                  onCheckedChange={() => handleToggleTodo(todo.id)}
                />
                <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : ""}`}>
                  {todo.text}
                </span>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  X
                </Button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}