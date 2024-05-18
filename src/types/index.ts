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
  usernameInput: string,
  passwordInput: string,
  confirmPasswordInput: string,
  user: AuthUser | null;
  error: string | null;
  // Methods
  loginStart: () => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (confirmPassword: string) => void;
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
  online: boolean;
  initGuestTodoList: () => void;
  setOnline: (online: boolean) => void;
  fetchTodoLists: () => void;
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
type RemoveTodo = (todoItem: TodoItem) => void;

export type TodoItemProps = {
  todoItem: TodoItem;
  toggleTodoDone: ToggleTodo;
  handleRemoveTodo: RemoveTodo;
}

export type TodoItemState = {
  newTodoItemInput: TodoItemInput | undefined;
  todoItems: TodoItem[] | [];
  loading: boolean;
  online: boolean;
  error: string | null;
  // Methods
  setOnline: (online: boolean) => void;
  initGuestTodoItems: () => void;
  fetchTodoItems: (todolist: number) => void;
  fetchTodoItemRequest: () => void;
  fetchTodoItemSuccess: (payload: TodoItem[]) => void;
  fetchTodoItemFailure: (error: string) => void;
  setNewTodoItemInput: (newTodo: TodoItemInput | undefined) => void;
  addTodoItem: (newTodo: TodoItemInput) => void;
  deleteTodoItem: (todo: TodoItem) => void;
  clearFinished: () => void;
  toggleDone: (id: number, todolist: number) => void;
};

export type ApiResponse = {
  success: string;
  message: string;
};

export type TodoListApiResponse = ApiResponse & {
  data: TodoList[]
}

export type TodoItemsApiResponse = ApiResponse & {
  data: TodoItem[]
}
