type State = {
  todos: any[],
  loading: boolean,
  error: string | null
};
type Action = | { type: 'FETCH_TODO_REQUEST' }
  | { type: 'FETCH_TODO_SUCCESS', payload: any[] }
  | { type: 'FETCH_TODO_FAILURE', error: string }
  | { type: 'ADD_TODO', task: string }
  | { type: 'DELETE_TODO', id: number }
  | { type: 'CLEAR_FINISHED' }
  | { type: 'TOGGLE_DONE', id: number };

export function todoReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'FETCH_TODO_REQUEST':
      return {...state, loading: true, error: null};
    case 'FETCH_TODO_SUCCESS':
      return {todos: action.payload, loading: false, error: null};
    case 'FETCH_TODO_FAILURE':
      return {...state, loading: false, error: action.error};
    case 'ADD_TODO':
      return {...state, todos: [...state.todos, {id: Date.now(), task: action.task, done: false}]};
    case 'DELETE_TODO':
      return {...state, todos: state.todos.filter(todo => todo.id !== action.id) };
    case 'CLEAR_FINISHED':
      return {...state, todos: state.todos.filter(todo => !todo.done)};
    case 'TOGGLE_DONE':
      return {...state, todos: state.todos.map(todo => todo.id === action.id ? {...todo, done: !todo.done} : todo)};
    default:
      return state;
  }
}
