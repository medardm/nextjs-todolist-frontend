'use client'
import React from "react";
import {useTodolist} from "@/hooks/useTodolist";
import {TodoList} from "@/components/todolist/TodoList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="min-h-100 w-full flex items-center justify-center bg-teal-lightest">
        <TodoList />
      </div>
    </main>
  );
}

