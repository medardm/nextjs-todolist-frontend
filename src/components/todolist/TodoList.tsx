import {TodoItem as TodoItemType, TodoItemProps} from "@/types";
import {IoAdd, IoClose, IoTrash} from "react-icons/io5";
import React from "react";
import {useTodoItem} from "@/hooks/useTodoItem";

export const TodoList = ({ id, title, handleRemoveTodoList } : {id: number, title: string, handleRemoveTodoList: any}) => {
  const {
    getNewTodoInput,
    handleSetNewTodoInput,
    completedTodo,
    todoItems,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
    handleClearDone
  } = useTodoItem(id);

  return (
    <div className="bg-white rounded shadow p-6 m-4">
      <div className="mb-4">
        <header className="text-grey-darkest flex justify-between">
          <h2>{ title } <span>({completedTodo.length}/{todoItems.length})</span></h2>
          <IoTrash size="20px" className="cursor-pointer" color="gray" onClick={() => handleRemoveTodoList(id)}/>
        </header>
        <div className="flex mt-4">
          <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                 placeholder="Add Todo"
                 onChange={(e) => handleSetNewTodoInput({
                   title: e.target.value,
                   todolist: id
                 })}
                 value={getNewTodoInput()}
                 onKeyUp={(event) => {
                   if(event.key === 'Enter') handleAddTodo();
                 }}
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
        {todoItems.map((t: TodoItemType) =>
          <TodoItem key={t.id}
                    todoItem={
                      {
                        id: t.id,
                        title: t.title,
                        completed: t.completed,
                        todolist: id
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
const TodoItem = ({todoItem, toggleTodoDone, handleRemoveTodo}: TodoItemProps) => {
  const doneStyle = todoItem.completed ? 'text-gray-400 line-through' : 'text-gray-900'

  return (
    <div className={"flex justify-between items-center border-b-2"}>
      <div className={`flex items-center py-2 flex-grow  ${doneStyle}`}
           onClick={() => toggleTodoDone(todoItem.id)}>
        <input
          checked={todoItem.completed}
          id={"todoItem-" + todoItem.id}
          type="checkbox"
          onChange={() => {
          }}
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
          readOnly
        />
        <label htmlFor={"todoItem-" + todoItem.id} className="ms-2 text-md font-medium pointer-events-none">{todoItem.title}</label>
      </div>
      <IoClose size="20px" color="gray" className='cursor-pointer' onClick={e => {
        handleRemoveTodo(todoItem)
      }}/>
    </div>
  );
}
