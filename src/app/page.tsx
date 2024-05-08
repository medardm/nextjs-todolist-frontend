'use client'
import React from "react";
import {useTodolist} from "@/hooks/useTodolist";
import {TodoList} from "@/components/todolist/TodoList";

export default function Home() {
  const {
    newTodo,
    setNewTodo,
    completedTodo,
    todoState,
    handleAddTodo,
    handleRemoveTodo,
    handleToggleDone,
    handleClearDone
  } = useTodolist();

  const {todos, error, loading} = todoState

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="min-h-100 w-full flex items-center justify-center bg-teal-lightest">
        <TodoList
          todos={todos}
          newTodo={newTodo}
          setNewTodo={setNewTodo}
          handleAddTodo={handleAddTodo}
          completedTodo={completedTodo}
          handleRemoveTodo={handleRemoveTodo}
          handleToggleDone={handleToggleDone}
          handleClearDone={handleClearDone}
        />
      </div>
    </main>
  );
}

