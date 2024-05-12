import { create } from 'zustand';
import {TodoList, TodoListState} from "@/types";

const initialTodoLists: TodoList[] = [
  {
    "id": 1,
    "title": "To Do",
    "created": "2024-05-07T20:42:19.175888Z",
    "updated": "2024-05-07T21:03:02.429030Z",
    "user": 2
  },
  {
    "id": 2,
    "title": "To Learn",
    "created": "2024-05-07T20:49:20.551751Z",
    "updated": "2024-05-07T21:02:48.530152Z",
    "user": 2
  }
]

const useTodoListStore = create<TodoListState>((set, get) => ({
  newTodoListInput: '',
  todoLists: initialTodoLists,
  error: null,
  loading: false,

  fetchTodoListRequest: () => set({ loading: true, error: null }),

  fetchTodoListSuccess: (payload: any[]) => set({ todoLists: payload, loading: false, error: null, newTodoListInput: undefined }),

  fetchTodoListFailure: (error: string) => set({ loading: false, error }),

  setNewTodoListInput: (title: string) => set({ newTodoListInput: title }),

  addTodoList: (title: string) => {
    const newTodoList = {"id": Date.now(), "title": title, "created": new Date().toISOString(), "updated": new Date().toISOString(), "user": 2};
    set(state => ({ todoLists: [...state.todoLists, newTodoList] }));
  },

  deleteTodoList: (id: number) => set(state => ({
    todoLists: state.todoLists.filter(todoList => todoList.id !== id)
  })),

  updateTodoList: (id: number, title: string) => set(state => ({
    todoLists: state.todoLists.map(todoList =>
      todoList.id === id ? {...todoList, title, updated: new Date().toISOString()} : todoList
    )
  })),
}));

export default useTodoListStore;
