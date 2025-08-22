import type { Task } from "@/types/types";
import { memo, useMemo, type FC } from "react";
import dayjs from "dayjs";
import {
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "@/store/api/tasks";
import Spiner from "./Spiner";

const TaskItem: FC<{ props: Task }> = memo(({ props }) => {
  const [patchData, { isLoading }] = useCompleteTaskMutation();
  const [deleteData, { isLoading: deleteLoading }] = useDeleteTaskMutation();
  const date = dayjs(props.date).format("MMMM D, YYYY");
  async function completeTask() {
    const data = {
      date,
      id: props.id,
      completed: !props.completed,
    };
    try {
      await patchData(data).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteTask() {
    const ok = confirm("are you sure want delete this data?");
    if (!ok) {
      return;
    }
    try {
      await deleteData(props.id).unwrap();
    } catch (error) {
      console.log(error);
    }
  }
  const levelStyles = useMemo(() => {
    switch (props.level) {
      case "high":
        return "bg-red-100 text-red-700";
      case "low":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-blue-100 text-blue-700";
    }
  }, [props.level]);
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200">
      <div className="flex flex-col items-start gap-4">
        <span
          className={`px-3 py-1 ${levelStyles} font-medium rounded-full self-end text-sm`}
        >
          {props.level}
        </span>
        <div className="flex-1">
          <div className="flex items-center w-full gap-3 mb-2">
            <h3
              className={`text-lg  font-medium w-full text-gray-800 ${
                props.completed ? "line-through" : ""
              }`}
            >
              {props.title}
            </h3>
          </div>
          {props.description ? (
            <p
              className={`text-gray-600 text-justify w-full mb-3 ${
                props.completed ? "line-through" : ""
              }`}
            >
              {props.description}
            </p>
          ) : (
            ""
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {!props.completed ? <span>📅 {date}</span> : <span>✅ {date}</span>}
            <span>🏷️ Project</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            ✏️
          </button>
          <button
            onClick={deleteTask}
            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
          >
            {!deleteLoading ? <span> 🗑️</span> : <Spiner proportions={20} />}
          </button>
          {!isLoading ? (
            <input
              type="checkbox"
              checked={props.completed}
              onChange={completeTask}
              className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
          ) : (
            <Spiner proportions={25} />
          )}
        </div>
      </div>
    </div>
  );
});

export default TaskItem;
