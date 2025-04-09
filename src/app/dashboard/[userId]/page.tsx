"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/lib/authStore";
import { useTaskStore } from "@/lib/taskStore";
import {NewTaskListForm ,TaskList} from "@/components/Dashboard";

interface DashboardParams {
  userId: string;
}

export default function Dashboard({
  params,
}: {
  params: Promise<DashboardParams>;
}) {
  const [resolvedParams, setResolvedParams] = useState<DashboardParams | null>(
    null,
  );
  const { isAuthenticated } = useAuthStore();
  const { taskLists, error, fetchTaskLists } = useTaskStore();

  useEffect(() => {
    params.then((p) => {
      setResolvedParams(p);
      if (isAuthenticated) fetchTaskLists(p.userId);
    });
  }, [params, isAuthenticated, fetchTaskLists]);

  if (!resolvedParams) return <div></div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  const { userId } = resolvedParams;

  return (
    <div className="z-10 container mx-auto min-h-screen p-4 sm:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-200 sm:text-3xl">
            Task Dashboard
          </h1>
        </div>
        <NewTaskListForm userId={userId} />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {taskLists.map((list) => (
            <TaskList key={list.id} userId={userId} list={list} />
          ))}
        </div>
      </div>
    </div>
  );
}
