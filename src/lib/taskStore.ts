import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "@/lib/authStore";

interface TaskItem {
  id: string;
  description: string;
  isCompleted: boolean;
}

interface TaskList {
  id: string;
  taskListName: string;
  taskItems: TaskItem[];
}

interface TaskState {
  taskLists: TaskList[];
  isLoading: boolean;
  error: string | null;
  fetchTaskLists: (userId: string) => Promise<void>;
  createTaskList: (userId: string, name: string) => Promise<void>;
  updateTaskList: (userId: string, taskListId: string, name: string) => Promise<void>;
  deleteTaskList: (userId: string, taskListId: string) => Promise<void>;
  createTaskItem: (userId: string, taskListId: string, description: string) => Promise<void>;
  updateTaskItem: (userId: string, taskListId: string, taskItemId: string, description: string, isCompleted: boolean) => Promise<void>;
  deleteTaskItem: (userId: string, taskListId: string, taskItemId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      taskLists: [],
      isLoading: false,
      error: null,

      fetchTaskLists: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
          const { accessToken } = useAuthStore.getState();
          console.log(accessToken)
          if (!accessToken) throw new Error('No access token available');
          const response = await fetch(`http://localhost:5206/users/${userId}/tasklists`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) throw new Error('Failed to fetch task lists');
          const data = await response.json();
          set({ taskLists: data, isLoading: false });
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMessage, isLoading: false });
        }
      },

      createTaskList: async (userId: string, name: string) => {
        set({ error: null });
        try {
          const { accessToken } = useAuthStore.getState();
          if (!accessToken) throw new Error('No access token available');
          const response = await fetch(`http://localhost:5206/users/${userId}/tasklists`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name }),
          });
          if (!response.ok) throw new Error('Failed to create task list');
          const newTaskList = await response.json();
          set(state => ({
            taskLists: [...state.taskLists, newTaskList],
          }));
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMessage });
        }
      },

      updateTaskList: async (userId: string, taskListId: string, name: string) => {
        set({ error: null });
        try {
          const { accessToken } = useAuthStore.getState();
          if (!accessToken) throw new Error('No access token available');
          const response = await fetch(`http://localhost:5206/users/${userId}/tasklists/${taskListId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name }),
          });
          if (!response.ok) throw new Error('Failed to update task list');
          const updatedTaskList = await response.json();
          set(state => ({
            taskLists: state.taskLists.map(list =>
              list.id === taskListId ? updatedTaskList : list
            ),
          }));
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMessage });
        }
      },

      deleteTaskList: async (userId: string, taskListId: string) => {
        set({ error: null });
        set(state => ({
          taskLists: state.taskLists.filter(list => list.id !== taskListId),
        }));
        try {
          const { accessToken } = useAuthStore.getState();
          if (!accessToken) throw new Error('No access token available');
          const response = await fetch(`http://localhost:5206/users/${userId}/tasklists/${taskListId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) throw new Error('Failed to delete task list');
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMessage });
          await get().fetchTaskLists(userId);
        }
      },

      createTaskItem: async (userId: string, taskListId: string, description: string) => {
        set({ error: null });
        try {
          const { accessToken } = useAuthStore.getState();
          if (!accessToken) throw new Error('No access token available');
          const response = await fetch(`http://localhost:5206/users/${userId}/tasklists/${taskListId}/taskitems`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ description }),
          });
          if (!response.ok) throw new Error('Failed to create task item');
          const newTaskItem = await response.json();
          set(state => ({
            taskLists: state.taskLists.map(list =>
              list.id === taskListId
                ? { ...list, taskItems: [...list.taskItems, newTaskItem] }
                : list
            ),
          }));
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMessage });
        }
      },

      updateTaskItem: async (userId: string, taskListId: string, taskItemId: string, description: string, isCompleted: boolean) => {
        set({ error: null });
        set(state => ({
          taskLists: state.taskLists.map(list =>
            list.id === taskListId
              ? {
                  ...list,
                  taskItems: list.taskItems.map(item =>
                    item.id === taskItemId ? { ...item, isCompleted } : item
                  )
                }
              : list
          ),
        }));
        try {
          const { accessToken } = useAuthStore.getState();
          if (!accessToken) throw new Error('No access token available');
          const response = await fetch(`http://localhost:5206/users/${userId}/tasklists/${taskListId}/taskitems/${taskItemId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ description, isCompleted }),
          });
          if (!response.ok) throw new Error('Failed to update task item');
          const updatedTaskItem = await response.json();
          set(state => ({
            taskLists: state.taskLists.map(list =>
              list.id === taskListId
                ? {
                    ...list,
                    taskItems: list.taskItems.map(item =>
                      item.id === taskItemId ? updatedTaskItem : item
                    )
                  }
                : list
            ),
          }));
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMessage });
          await get().fetchTaskLists(userId);
        }
      },

      deleteTaskItem: async (userId: string, taskListId: string, taskItemId: string) => {
        set({ error: null });
        set(state => ({
          taskLists: state.taskLists.map(list =>
            list.id === taskListId
              ? {
                  ...list,
                  taskItems: list.taskItems.filter(item => item.id !== taskItemId)
                }
              : list
          ),
        }));
        try {
          const { accessToken } = useAuthStore.getState();
          if (!accessToken) throw new Error('No access token available');
          const response = await fetch(`http://localhost:5206/users/${userId}/tasklists/${taskListId}/taskitems/${taskItemId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          if (!response.ok) throw new Error('Failed to delete task item');
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          set({ error: errorMessage });
          await get().fetchTaskLists(userId);
        }
      },
    }),
    {
      name: 'task-storage',
    }
  )
);