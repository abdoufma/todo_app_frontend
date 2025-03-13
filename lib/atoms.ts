import { atom } from 'jotai';
import type { Todo } from './types';

const API_URL = 'http://localhost:3000/api/todos';

// Base atom to hold the list of todos
export const todosAtom = atom<Todo[]>([]);

// Atom to fetch todos from the backend
export const fetchTodosAtom = atom(
  null, // read value (null because we don't need to read)
  async (_get, set) => {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const todos = await response.json() as Todo[];
    set(todosAtom, todos);
    return todos;
  }
);

// Atom to add a new todo
export const addTodoAtom = atom(
  null,
  async (get, set, newTodo: Omit<Todo, 'id'>) => {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
      throw new Error('Failed to add todo');
    }
    const result = await response.json();
    
    // Create a complete todo object with the returned ID
    const addedTodo: Todo = {
      id: result.id,
      ...newTodo
    };
    
    set(todosAtom, [...get(todosAtom), addedTodo]);
    return addedTodo;
  }
);

// Atom to toggle the completion status of a todo
export const toggleTodoAtom = atom(
  null,
  async (get, set, id: number) => {
    const todos = get(todosAtom);
    const todo = todos.find((t) => t.id === id);
    if (!todo) {
      throw new Error('Todo not found');
    }
    
    const updatedTodo = { ...todo, completed: !todo.completed };
    
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTodo),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    
    set(todosAtom, todos.map((t) => (t.id === id ? updatedTodo : t)));
    return updatedTodo;
  }
);

// Atom to delete a todo
export const deleteTodoAtom = atom(
  null,
  async (get, set, id: number) => {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    
    if (!response.ok) throw new Error('Failed to delete todo');
    
    set(todosAtom, get(todosAtom).filter((t) => t.id !== id));
  }
);