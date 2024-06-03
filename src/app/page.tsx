'use client'
import React from "react";
import {TodoList} from "@/state-management/zustand/features/todo/components/TodoList";
import {useTodoList} from "@/hooks/useTodoList";
import {TodoListNew} from "@/state-management/zustand/features/todo/components/TodoListNew";
import useAuthStore from "@/state-management/zustand/useAuthStore";
import useTodoItemStore from "@/state-management/zustand/features/todo/useTodoItemStore";

export default function Home() {
  const {user} = useAuthStore()
  const {
    todoLists,
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList,
    handleRemoveTodoList,
    toggleShowCompleted,
  } = useTodoList()

  const {todoItems} = useTodoItemStore()

  const todoListNewProps = {
    newTodoListInput,
    handleSetNewTodoListInput,
    handleAddTodoList
  }
  return (
    <main className="flex min-h-screen flex-col py-3 container mx-auto">
      <header className="mb-2">
        <h1 className="text-2xl">
          Hi {user?.user.username ?? 'Guest'}
        </h1>
        <p>
          Todo lists: {todoLists.length} |
          Todo items: {todoItems.length}
        </p>
      </header>
      <div className="grid grid-cols-3 gap-5 min-h-100 w-full bg-teal-lightest">
        {
          todoLists.map(
            todoList =>
              <TodoList
                key={todoList.id}
                todoList={todoList}
                handleRemoveTodoList={handleRemoveTodoList}
                toggleShowCompleted={toggleShowCompleted}/>
          )
        }
        <TodoListNew
          {...todoListNewProps}
        />
      </div>
    </main>
  );
}

