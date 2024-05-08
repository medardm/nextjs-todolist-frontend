import { create } from 'zustand';

import {TodoState} from "@/types";

const initialTodos = [
  {id: Date.now() + 1, task: 'Research about Meddicc', done: false},
  {id: Date.now() + 2, task: 'Improve React/Nextjs skills', done: false},
  {id: Date.now() + 3, task: 'Build Python and Django skills', done: false},
  {id: Date.now() + 4, task: 'Get Hired', done: false},
]

const useTodoStore = create<TodoState>((set, get) => ({
  newTodoInput: '',
  todos: initialTodos,
  error: null,
  loading: false,

  fetchTodoRequest: () => set({ loading: true, error: null }),

  fetchTodoSuccess: (payload: any[]) => set({ todos: payload, loading: false, error: null, newTodoInput: undefined }),

  fetchTodoFailure: (error: string) => set({ loading: false, error }),

  setNewTodoInput: (task: string) => set({ newTodoInput: task }),

  addTodo: (task: string) => {
    const newTodo = {id: Date.now(), task, done: false};
    set(state => ({ todos: [...state.todos, newTodo] }));
  },

  deleteTodo: (id: number) => set(state => ({
    todos: state.todos.filter(todo => todo.id !== id)
  })),

  clearFinished: () => set(state => ({
    todos: state.todos.filter(todo => !todo.done)
  })),

  toggleDone: (id: number) => set(state => ({
    todos: state.todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo
    )
  })),
}));

export default useTodoStore;
