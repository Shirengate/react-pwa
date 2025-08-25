export type Level = "low" | "medium" | "high";

export interface Task {
  id: number;
  title: string;
  description?: string;
  date: string; // можно использовать template literal type для формата даты
  level: Level; // конкретные значения
  completed: boolean;
}

export type Tasks = Task[];

export type TaskBody = Omit<Task, "id">;

export interface ChangedTask {
  id: number;
  title: string;
  description: string;
  level: Level;
}

export type FilterStatus = "all" | "active" | "completed";
