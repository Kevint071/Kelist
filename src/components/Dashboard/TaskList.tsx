"use client";

import { useState } from "react";
import { useTaskStore } from "@/lib/taskStore";
import { useMenu } from "@/hooks/Dashboard/useMenu";
import { Edit2, Trash2, MoreVertical } from "lucide-react";
import {NewTaskForm, TaskItem} from "@/components/Dashboard";

interface TaskListProps {
  userId: string;
  list: { id: string; taskListName: string; taskItems: any[] };
}

export default function TaskList({ userId, list }: TaskListProps) {
  const [isEditingList, setIsEditingList] = useState(false);
  const [editListName, setEditListName] = useState(list.taskListName);
  const { updateTaskList, deleteTaskList } = useTaskStore();
  const { menuOpen, setMenuOpen, menuRef } = useMenu();

  const handleUpdateList = async () => {
    if (editListName.trim()) {
      await updateTaskList(userId, list.id, editListName);
      setIsEditingList(false);
    }
  };

  return (
    <div className="relative flex h-full min-w-0 flex-col rounded-lg bg-[#131b2e]/70 p-4">
      {isEditingList ? (
        <div className="mb-4 flex flex-col gap-2">
          <textarea
            value={editListName}
            onChange={(e) => setEditListName(e.target.value)}
            placeholder="Edit list name"
            className="w-full resize-none overflow-hidden rounded-lg border border-gray-500/50 bg-[#1a2338]/50 px-3 py-1 text-white"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditingList(false)}
              className="rounded-lg bg-gray-600 px-3 py-1 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateList}
              className="rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-4 flex items-start justify-between gap-2">
          <h2 className="flex-1 text-lg font-semibold break-words whitespace-pre-wrap text-white md:text-xl">
            {list.taskListName}
          </h2>
          <div className="relative flex-shrink-0">
            <button
              data-menu-id={list.id}
              onClick={() => setMenuOpen(menuOpen === list.id ? null : list.id)}
              className="text-gray-400 hover:text-gray-300"
            >
              <MoreVertical size={18} />
            </button>
            {menuOpen === list.id && (
              <div
                ref={menuRef}
                data-menu-content={list.id}
                className="fixed z-50 w-32 rounded-lg bg-[#1a2338] shadow-lg"
              >
                <button
                  onClick={() => {
                    setIsEditingList(true);
                    setMenuOpen(null);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-blue-400 hover:bg-[#252f47]"
                >
                  <Edit2 size={16} /> Editar
                </button>
                <button
                  onClick={() => {
                    deleteTaskList(userId, list.id);
                    setMenuOpen(null);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-red-400 hover:bg-[#252f47]"
                >
                  <Trash2 size={16} /> Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mb-4 flex-1 space-y-2 overflow-y-auto">
        {list.taskItems.map((task) => (
          <TaskItem key={task.id} userId={userId} listId={list.id} task={task} />
        ))}
      </div>

      <NewTaskForm userId={userId} listId={list.id} />
    </div>
  );
}