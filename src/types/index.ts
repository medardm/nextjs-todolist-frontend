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

// This represents the props for the TodoList function
export type TodoListProps = {
  todos: Todo[];  // change this from TodoItemProps[] to Todo[]
  newTodo: string;
  setNewTodo: (value: string) => void;
  handleAddTodo: () => void;
  completedTodo: Todo[];
  handleRemoveTodo: Handler;
  handleToggleDone: Handler;
  handleClearDone: () => void;
};

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
  message: string;
}
