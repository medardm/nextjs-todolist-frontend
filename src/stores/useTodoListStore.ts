import {create} from 'zustand';
import {ApiResponse, TodoList, TodoListApiResponse, TodoListState} from "@/types";
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
  online: false,

  setOnline: (online: boolean) => set({online}),

  initGuestTodoList: () => set({todoLists: initialTodoLists}),

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

  setNewTodoListInput: (title: string) => set({newTodoListInput: title}),

  addTodoList: async (title: string) => {
    // Create the new to-do list
    const newTodoList = {
      "title": title,
    };

    if (!get().online) {
      console.log('offline')
      set(state => ({
        todoLists: [...state.todoLists, {
          id: Date.now(),
          user: 2,
          created: Date.now().toLocaleString(),
          updated: Date.now().toLocaleString(),
          ...newTodoList
        }]
      }));
      return
    }

    try {
      // make a POST request to save the todo list on the server
      const response = await fetchData<ApiResponse & { data: TodoList }>('todolists/', {
        method: 'POST',
        body: JSON.stringify(newTodoList),
      });

      // if the request is successful, add the to-do list to the state
      set(state => ({todoLists: [...state.todoLists, response.data]}));
      console.info("Todolist added");
    } catch (error: any) {
      console.error("Failed to add todo list", error);
      set(state => ({...state, error: error.message}));
    }
  },

  deleteTodoList: async (id: number) => {
    if (!get().online) {
      set(state => ({
        todoLists: state.todoLists.filter(todoList => todoList.id !== id)
      }))
      return;
    }

    try {
      await fetchData<ApiResponse>(`todolists/${id}`, {
        method: 'DELETE',
      });

      set(state => ({ todoLists: state.todoLists.filter((todoList) => todoList.id !== id) }));
      console.info("Todolist deleted");
    } catch (error: any) {
      console.error("Failed to delete todo list", error);
      set(state => ({ ...state, error: error.message }));
    }
  },

  updateTodoList: (id: number, title: string) => set(state => ({
    todoLists: state.todoLists.map(todoList =>
      todoList.id === id ? {...todoList, title, updated: new Date().toISOString()} : todoList
    )
  })),
}));

export default useTodoListStore;
