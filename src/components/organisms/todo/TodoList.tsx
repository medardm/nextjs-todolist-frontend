import {TodoItem as TodoItemType, TodoItemProps, TodoList as TodoListType} from "@/types";
import {IoAdd, IoClose, IoEye, IoEyeOff, IoTrash} from "react-icons/io5";
import React from "react";
import {useTodoItem} from "@/hooks/useTodoItem";

export const TodoList = ({todoList, handleRemoveTodoList, toggleShowCompleted}: {
  todoList: TodoListType,
  handleRemoveTodoList: any,
  toggleShowCompleted: any
}) => {
  const {
    getNewTodoInput,
    handleSetNewTodoInput,
    completedTodo,
    todoItems,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
  } = useTodoItem(todoList.id);

  const setNewTodoInput = (e: { target: { value: any; }; }) => handleSetNewTodoInput({
    title: e.target.value,
    todolist: todoList.id
  })

  const addOnEnter = (event: { key: string; }) => {
    if (event.key === 'Enter') handleAddTodo();
  }

  const removeTodoList = () => handleRemoveTodoList(todoList.id)

  return (
    <div>
      <div className="bg-white rounded shadow p-6">
        <div className="mb-4">
          <header className="text-grey-darkest flex justify-between">
            <h2>{todoList.title} <span>({completedTodo.length}/{todoItems.length})</span></h2>
            <IoTrash size="20px" className="cursor-pointer" color="gray" onClick={removeTodoList}/>
          </header>
          <div className="flex mt-4">
            <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
                   placeholder="Add Todo"
                   onChange={setNewTodoInput}
                   value={getNewTodoInput()}
                   onKeyUp={addOnEnter}
            />
            <button
              onClick={handleAddTodo}
              className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-black hover:bg-teal flex items-center">
              <IoAdd size="20px" color="gray"/>
              <span>Add </span>
            </button>
          </div>
        </div>

        <fieldset>
          {todoItems.filter(i => {
            if (!todoList.showCompleted) return !i.completed;
            return i
          })
            .map((t: TodoItemType) =>
              <TodoItem key={t.id}
                        todoItem={
                          {
                            id: t.id,
                            title: t.title,
                            completed: t.completed,
                            todolist: todoList.id
                          }
                        }
                        handleRemoveTodo={handleRemoveTodo}
                        toggleTodoDone={handleToggleDone}
              />
            )}
        </fieldset>
        { completedTodo.length > 0 &&
          <div className='mt-3'>
          <button
            onClick={e => toggleShowCompleted(todoList.id)}
            className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-black hover:bg-teal flex gap-1 items-center">
            {todoList.showCompleted && <><IoEyeOff size="20px" color="gray"/>
                <span>Hide {completedTodo.length} completed</span></>}
            {!todoList.showCompleted && <><IoEye size="20px" color="gray"/>
                <span>Show {completedTodo.length} completed</span></>}
          </button>
        </div>
        }
      </div>
    </div>
  )
}

const TodoItem = ({todoItem, toggleTodoDone, handleRemoveTodo}: TodoItemProps) => {
  const doneStyle = todoItem.completed ? 'text-gray-400 line-through' : 'text-gray-900'

  const toggleDone = () => toggleTodoDone(todoItem.id)

  return (
    <div className={"flex justify-between items-center border-b-2"}>
      <div className={`flex items-center py-2 flex-grow  ${doneStyle}`}
           onClick={toggleDone}>
        <input
          checked={todoItem.completed}
          id={"todoItem-" + todoItem.id}
          type="checkbox"
          onChange={() => {
          }}
          className="w-4 h-4 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
        />
        <label htmlFor={"todoItem-" + todoItem.id}
               className="ms-2 text-md font-medium pointer-events-none">{todoItem.title}</label>
      </div>
      <IoClose size="20px" color="gray" className='cursor-pointer' onClick={handleRemoveTodo(todoItem)}/>
    </div>
  );
}
