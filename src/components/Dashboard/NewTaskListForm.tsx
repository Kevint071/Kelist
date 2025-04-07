import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useTaskStore } from "@/lib/taskStore";

export default function NewTaskListForm({ userId }: { userId: string }) {
  const [newListName, setNewListName] = useState("");
  const { createTaskList } = useTaskStore();

  const handleCreateList = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newListName.trim()) {
      await createTaskList(userId, newListName);
      setNewListName("");
    }
  };

  return (
    <form
      onSubmit={handleCreateList}
      className="mb-8 flex flex-col gap-4 sm:flex-row"
    >
      <input
        type="text"
        value={newListName}
        onChange={(e) => setNewListName(e.target.value)}
        placeholder="New list name"
        className="w-full flex-1 rounded-lg border border-gray-500/50 bg-[#131b2e]/70 px-4 py-2 text-white sm:w-auto"
      />
      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 sm:w-auto"
      >
        <Plus size={18} /> Add List
      </button>
    </form>
  );
}
