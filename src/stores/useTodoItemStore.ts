import { create } from 'zustand';

import {ApiResponse, TodoItem, TodoItemInput, TodoItemsApiResponse, TodoItemState, TodoListApiResponse} from "@/types";
import {fetchData} from "@/utils/api";

const initialTodoItems: TodoItem[] = [
  {id: Date.now() + 1, title: 'Research about XX', completed: false, todolist: 1},
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

  initGuestTodoItems: () => set({ todoItems: initialTodoItems }),

  fetchTodoItems: async (todolist: number) => {
    try {
      set(state => ({...state, loading: true}));

      const response = await fetchData<TodoItemsApiResponse>(`todolists/${todolist}/todoitems`, {
        credentials: 'include',
      });

      set(state => (
        {
          ...state,
          todoItems: [
            ...get().todoItems,
            ...response.data.filter(r =>
              !get().todoItems.some((item) => item.id === r.id) )],
          loading: false
        }));

    } catch (error: any) {
      console.error("Failed to fetch todo items", error);
      set(state => ({...state, error: error.message, loading: false}));
    }
  },

  addTodoItem: (todoInput: TodoItemInput) => {
    set({ loading: true, error: null })
    const newTodo = {
      id: Date.now(),
      ...todoInput,
      completed: false,
    };

    fetchData<ApiResponse & { data: TodoItem }>(`todolists/${todoInput.todolist}/todoitems/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
      credentials: 'include',
    }).then(response => {
      console.info('added todo item')
      set({ loading: false, error: null })
    }).catch((e: any) => {
      set({ loading: false, error: e.message })
    });

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
