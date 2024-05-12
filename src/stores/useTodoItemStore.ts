import { create } from 'zustand';

import {TodoItem, TodoItemInput, TodoItemState} from "@/types";

const initialTodoItems: TodoItem[] = [
  {id: Date.now() + 1, title: 'Research about Meddicc', completed: false, todolist: 1},
  {id: Date.now() + 2, title: 'Improve React/Nextjs skills', completed: false, todolist: 1},
  {id: Date.now() + 3, title: 'Build Python and Django skills', completed: false, todolist: 1},
  {id: Date.now() + 4, title: 'Get Hired', completed: false, todolist: 1},
]

const useTodoItemStore = create<TodoItemState>((set, get) => ({
  newTodoItemInput: undefined,
  todoItems: initialTodoItems,
  error: null,
  loading: false,

  fetchTodoItemRequest: () => set({ loading: true, error: null }),

  fetchTodoItemSuccess: (payload: any[]) => set({ todoItems: payload, loading: false, error: null, newTodoItemInput: undefined }),

  fetchTodoItemFailure: (error: string) => set({ loading: false, error }),

  setNewTodoItemInput: (todoInput: TodoItemInput | undefined) => set({ newTodoItemInput: todoInput }),

  addTodoItem: (todoInput: TodoItemInput) => {
    const newTodo = {
      id: Date.now(),
      ...todoInput,
      completed: false,
    };
    set(state => ({ todoItems: [...state.todoItems, newTodo] }));
  },

  deleteTodoItem: (id: number) => set(state => ({
    todoItems: state.todoItems.filter(todoItem => todoItem.id !== id)
  })),

  clearFinished: () => set(state => ({
    todoItems: state.todoItems.filter(todoItem => !todoItem.completed)
  })),

  toggleDone: (id: number) => set(state => ({
    todoItems: state.todoItems.map(todoItem =>
      todoItem.id === id ? {...todoItem, completed: !todoItem.completed} : todoItem
    )
  })),
}));

export default useTodoItemStore;
