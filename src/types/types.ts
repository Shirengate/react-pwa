export interface Task {
  id: number;
  title: string;
  description?: string;
  date: string; // можно использовать template literal type для формата даты
  level: "low" | "medium" | "high"; // конкретные значения
  completed: boolean;
}

export type Tasks = Task[];

export type TaskBody = Omit<Task, "id">;
