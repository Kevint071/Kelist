"use client";

import { useState } from "react";
import { useTaskStore } from "@/lib/taskStore";
import { Plus } from "lucide-react";

interface NewTaskFormProps {
  userId: string;
  listId: string;
}

export default function NewTaskForm({ userId, listId }: NewTaskFormProps) {
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const { createTaskItem } = useTaskStore();

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskDesc.trim()) {
      await createTaskItem(userId, listId, newTaskDesc);
      setNewTaskDesc("");
    }
  };

  return (
    <form onSubmit={handleCreateTask} className="flex flex-col gap-2">
      <input
        type="text"
        value={newTaskDesc}
        onChange={(e) => setNewTaskDesc(e.target.value)}
        placeholder="New task description"
        className="w-full rounded-lg border border-gray-500/50 bg-[#1a2338]/50 px-3 py-1 text-white"
      />
      <button
        type="submit"
        className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
      >
        <Plus size={16} /> Add Task
      </button>
    </form>
  );
}