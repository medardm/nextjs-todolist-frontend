export type ApiResponse = {
  success: string;
  message: string;
};

interface UserData {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthUser {
  token?: string;
  refresh_token: string;
  expires_at: string;
  remember: string;
  user: UserData;
}

export type AuthState = {
  loading: boolean;
  user: AuthUser | null;
  error: string | null;
  // Methods
  loginStart: () => void;
  loginSuccess: (user: AuthUser | null) => void;
  loginFailure: (error: string) => void;
};

export type TodoList = {
  id: number;
  title: string;
  created: string;
  updated: string;
  user?: number;
};

export type TodoListState = {
  newTodoListInput: string;
  todoLists: TodoList[];
  error: string | null;
  loading: boolean;
  fetchTodoListRequest: () => void;
  fetchTodoListSuccess: (payload: TodoList[]) => void;
  fetchTodoListFailure: (error: string) => void;
  setNewTodoListInput: (title: string) => void;
  addTodoList: (title: string) => void;
  deleteTodoList: (id: number) => void;
  updateTodoList: (id: number, title: string) => void;
};

export type TodoItemInput = {
  title: string;
  todolist: number;
};

export type TodoItem = TodoItemInput & {
  id: number;
  description?: string;
  completed: boolean;
  created?: string;
  updated?: string;
};

type ToggleTodo = (id: number) => void;
type RemoveTodo = (id: number) => void;

export type TodoItemProps = {
  todoItem: TodoItem; // change this from separate properties to a single todo of type Todo
  toggleTodoDone: ToggleTodo; // define the correct type instead of any
  handleRemoveTodo: RemoveTodo; // define the correct type instead of any
}

export type TodoItemState = {
  newTodoItemInput: TodoItemInput | undefined;
  todoItems: TodoItem[];
  loading: boolean;
  error: string | null;
  // Methods
  fetchTodoItemRequest: () => void;
  fetchTodoItemSuccess: (payload: TodoItem[]) => void;
  fetchTodoItemFailure: (error: string) => void;
  setNewTodoItemInput: (newTodo: TodoItemInput | undefined) => void;
  addTodoItem: (newTodo: TodoItemInput) => void;
  deleteTodoItem: (id: number) => void;
  clearFinished: () => void;
  toggleDone: (id: number) => void;
};
