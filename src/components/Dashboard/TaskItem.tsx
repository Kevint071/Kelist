"use client";

import { useState } from "react";
import { useTaskStore } from "@/lib/taskStore";
import { useMenu } from "@/hooks/Dashboard/useMenu";
import { Check, MoreVertical, Edit2, Trash2 } from "lucide-react";

interface TaskItemProps {
  userId: string;
  listId: string;
  task: { id: string; description: string; isCompleted: boolean };
}

export default function TaskItem({ userId, listId, task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskDesc, setEditTaskDesc] = useState(task.description);
  const { updateTaskItem, deleteTaskItem } = useTaskStore();
  const { menuOpen, setMenuOpen, menuRef } = useMenu();

  const handleUpdateTask = async () => {
    if (editTaskDesc.trim()) {
      await updateTaskItem(
        userId,
        listId,
        task.id,
        editTaskDesc,
        task.isCompleted,
      );
      setIsEditing(false);
    }
  };

  const handleToggleTask = async () => {
    await updateTaskItem(
      userId,
      listId,
      task.id,
      task.description,
      !task.isCompleted,
    );
  };

  return (
    <div className="flex flex-col gap-2 rounded bg-[#1a2338]/50 p-2">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <button
              onClick={handleToggleTask}
              className={`mt-1.5 h-5 w-5 flex-shrink-0 rounded border ${
                task.isCompleted
                  ? "border-green-500 bg-green-500"
                  : "border-gray-500"
              }`}
            >
              {task.isCompleted && (
                <Check size={14} className="mx-auto text-white" />
              )}
            </button>
            <textarea
              value={editTaskDesc}
              onChange={(e) => setEditTaskDesc(e.target.value)}
              placeholder="Edit task description"
              className="field-sizing-content w-full resize-none overflow-hidden rounded-lg border border-gray-500/50 bg-[#1a2338]/50 px-2 py-1 text-white"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="rounded-lg bg-gray-600 px-2 py-1 text-white hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateTask}
              className="rounded-lg bg-blue-600 px-2 py-1 text-white hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-start gap-2">
          <button
            onClick={handleToggleTask}
            className={`h-5 w-5 rounded border ${
              task.isCompleted
                ? "border-green-500 bg-green-500"
                : "border-gray-500"
            }`}
          >
            {task.isCompleted && (
              <Check size={14} className="mx-auto text-white" />
            )}
          </button>
          <span
            className={`flex-1 overflow-hidden break-words whitespace-pre-wrap text-white max-md:text-sm ${
              task.isCompleted ? "text-gray-400 line-through" : ""
            }`}
          >
            {task.description}
          </span>
          <div className="relative flex-shrink-0">
            <button
              data-menu-id={task.id}
              onClick={() => setMenuOpen(menuOpen === task.id ? null : task.id)}
              className="text-gray-400 hover:text-gray-300"
            >
              <MoreVertical size={16} />
            </button>
            {menuOpen === task.id && (
              <div
                ref={menuRef}
                data-menu-content={task.id}
                className="fixed z-50 w-32 rounded-lg bg-[#1a2338] shadow-lg"
              >
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setMenuOpen(null);
                  }}
                  className="flex w-full items-center gap-2 px-3 py-2 text-left text-blue-400 hover:bg-[#252f47]"
                >
                  <Edit2 size={16} /> Editar
                </button>
                <button
                  onClick={() => {
                    deleteTaskItem(userId, listId, task.id);
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
    </div>
  );
}
