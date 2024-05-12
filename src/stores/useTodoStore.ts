import { create } from 'zustand';

import {TodoItem, TodoItemInput, TodoState} from "@/types";

const initialTodos: TodoItem[] = [
  {id: Date.now() + 1, title: 'Research about Meddicc', completed: false, todolist: 1},
  {id: Date.now() + 2, title: 'Improve React/Nextjs skills', completed: false, todolist: 1},
  {id: Date.now() + 3, title: 'Build Python and Django skills', completed: false, todolist: 1},
  {id: Date.now() + 4, title: 'Get Hired', completed: false, todolist: 1},
]

const useTodoStore = create<TodoState>((set, get) => ({
  newTodoInput: undefined,
  todos: initialTodos,
  error: null,
  loading: false,

  fetchTodoRequest: () => set({ loading: true, error: null }),

  fetchTodoSuccess: (payload: any[]) => set({ todos: payload, loading: false, error: null, newTodoInput: undefined }),

  fetchTodoFailure: (error: string) => set({ loading: false, error }),

  setNewTodoInput: (todoInput: TodoItemInput | undefined) => set({ newTodoInput: todoInput }),

  addTodo: (todoInput: TodoItemInput) => {
    const newTodo = {
      id: Date.now(),
      ...todoInput,
      completed: false,
    };
    set(state => ({ todos: [...state.todos, newTodo] }));
  },

  deleteTodo: (id: number) => set(state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),

  clearFinished: () => set(state => ({
    todos: state.todos.filter(todo => !todo.completed)
  })),

  toggleDone: (id: number) => set(state => ({
    todos: state.todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
  })),
}));

export default useTodoStore;
