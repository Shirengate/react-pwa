import type { Tasks } from "@/types/types";
import { Skeleton } from "./Skeleton";
import TaskItem from "./TaskItem";
// import TaskComp from "./TaskComp";
import { useGetAllTaksQuery } from "@/store/api/tasks";
import type { FC } from "react";

interface TaskListProps {
  data: Tasks | undefined;
  loading: boolean;
}
const TaskList: FC<TaskListProps> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {data &&
        data.map((item) => {
          return <TaskItem key={item.id} props={item} />;
        })}
    </div>
  );
};

export default TaskList;
