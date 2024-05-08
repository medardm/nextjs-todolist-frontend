export type Todo = {
  id: number;
  task: string;
  done: boolean;
};

// This type represents an event handler function
type Handler = (id: number) => void;

// Let's define functions for toggling and removing todos
type ToggleTodo = (id: number) => void;
type RemoveTodo = (id: number) => void;

export type TodoItemProps = {
  todo: Todo; // change this from separate properties to a single todo of type Todo
  toggleTodoDone: ToggleTodo; // define the correct type instead of any
  handleRemoveTodo: RemoveTodo; // define the correct type instead of any
}

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

export type TodoItem = {
  id: number;
  task: string;
  done: boolean;
};

export type TodoState = {
  newTodoInput: string | undefined;
  todos: TodoItem[];
  loading: boolean;
  error: string | null;
  // Methods
  fetchTodoRequest: () => void;
  fetchTodoSuccess: (payload: TodoItem[]) => void;
  fetchTodoFailure: (error: string) => void;
  setNewTodoInput: (task: string) => void;
  addTodo: (task: string) => void;
  deleteTodo: (id: number) => void;
  clearFinished: () => void;
  toggleDone: (id: number) => void;
};

export type AuthState = {
  loading: boolean;
  user: AuthUser | null;
  error: string | null;
  // Methods
  loginStart: () => void;
  loginSuccess: (user: AuthUser | null) => void;
  loginFailure: (error: string) => void;
};
