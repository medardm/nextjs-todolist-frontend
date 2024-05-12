import { create } from 'zustand';
import {TodoList, TodoListApiResponse, TodoListState} from "@/types";
import {fetchData} from "@/utils/api";

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
  },
  {
    "id": 3,
    "title": "To Learasdn",
    "created": "2024-05-07T20:49:20.551751Z",
    "updated": "2024-05-07T21:02:48.530152Z",
    "user": 2
  },
  {
    "id": 4,
    "title": "To Learasdn",
    "created": "2024-05-07T20:49:20.551751Z",
    "updated": "2024-05-07T21:02:48.530152Z",
    "user": 2
  },
]

const useTodoListStore = create<TodoListState>((set, get) => ({
  newTodoListInput: '',
  todoLists: initialTodoLists,
  error: null,
  loading: false,

  initGuestTodoList: () => set({ todoLists: initialTodoLists }),

  fetchTodoLists: async () => {
    try {
      set(state => ({...state, loading: true}));

      const response = await fetchData<TodoListApiResponse>('todolists', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      set(state => ({...state, todoLists: response.data, loading: false}));

    } catch (error: any) {
      console.error("Failed to fetch todo lists", error);
      set(state => ({...state, error: error.message, loading: false}));
    }
  },

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
