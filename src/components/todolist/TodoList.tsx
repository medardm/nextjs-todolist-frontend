import {Todo, TodoItemProps} from "@/types";
import {IoAdd, IoClose, IoTrash} from "react-icons/io5";
import React from "react";
import {useTodo} from "@/hooks/useTodo";

export const TodoList = () => {

  const {
    newTodoInput,
    handleSetNewTodoInput,
    completedTodo,
    todos,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
    handleClearDone
  } = useTodo();

  return (
    <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
      <div className="mb-4">
        <h1 className="text-grey-darkest">Todo List <span>({completedTodo.length}/{todos.length})</span></h1>
        <div className="flex mt-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                 placeholder="Add Todo"
                 onChange={(e) => handleSetNewTodoInput(e.target.value)}
                 value={newTodoInput}
          />
          <button
            onClick={() => handleAddTodo()}
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-black hover:bg-teal flex items-center">
            <IoAdd size="20px" color="gray"/>
            <span>Add </span>
          </button>
        </div>
      </div>

      <fieldset>
        {todos.map((t: Todo) =>
          <TodoItem key={t.id}
                    todo={
                      {
                        id: t.id,
                        task: t.task,
                        done: t.done
                      }
                    }
                    handleRemoveTodo={handleRemoveTodo}
                    toggleTodoDone={handleToggleDone}
          />
        )}
      </fieldset>
      <div className='mt-3'>
        <button
          onClick={() => handleClearDone()}
          className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-black hover:bg-teal flex gap-1 items-center">
          <IoTrash size="20px" color="gray"/>
          <span>Clear finished</span>
        </button>
      </div>
    </div>
  )
}
const TodoItem = ({todo, toggleTodoDone, handleRemoveTodo}: TodoItemProps) => {
  const doneStyle = todo.done ? 'text-gray-400 line-through' : 'text-gray-900'

  return (
    <div className={"flex justify-between items-center border-b-2"}>
      <div className={`flex items-center py-2 flex-grow  ${doneStyle}`}
           onClick={() => toggleTodoDone(todo.id)}>
        <input
          checked={todo.done}
          id={"todo-" + todo.id}
          type="checkbox"
          onChange={() => {
          }}
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          readOnly
        />
        <label htmlFor={"todo-" + todo.id} className="ms-2 text-md font-medium pointer-events-none">{todo.task}</label>
      </div>
      <IoClose size="20px" color="gray" className='cursor-pointer' onClick={e => {
        handleRemoveTodo(todo.id)
      }}/>
    </div>
  );
}
