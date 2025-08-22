import type { ChangedTask, Task } from "@/types/types";
import { memo, useMemo, useState, type FC } from "react";
import dayjs from "dayjs";
import {
  useChangeTaskDataMutation,
  useCompleteTaskMutation,
  useDeleteTaskMutation,
} from "@/store/api/tasks";
import Spiner from "./Spiner";
import Descrtiption from "./UI/Descrtiption";
import InputDesc from "./UI/InputDesc";

const TaskItem: FC<{ props: Task }> = memo(({ props }) => {
  const [pathComplete, { isLoading }] = useCompleteTaskMutation();
  const [deleteData, { isLoading: deleteLoading }] = useDeleteTaskMutation();
  const [patchTask] = useChangeTaskDataMutation();
  const [editStatus, setEditStatus] = useState(false);
  const [editedData, setEditedData] = useState({
    title: props.title,
    description: props.description || "",
    level: props.level,
  });

  const date = dayjs(props.date).format("MMMM D, YYYY");
  async function completeTask() {
    const data = {
      date,
      id: props.id,
      completed: !props.completed,
    };
    try {
      await pathComplete(data).unwrap();
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

  async function editTask() {
    if (props.completed) return;
    setEditStatus(!editStatus);
  }
  async function changeTask() {
    const body: ChangedTask = { ...editedData, id: props.id };
    const keys = Object.keys(body) as Array<keyof typeof body>;
    if (
      keys.every((key) => {
        return body[key] === props[key];
      })
    ) {
      return setEditStatus(false);
    }
    try {
      await patchTask(body).unwrap();
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
  const selectLevelStyles = useMemo(() => {
    switch (editedData.level) {
      case "high":
        return "bg-red-100 text-red-700";
      case "low":
        return "bg-green-100 text-green-700";
      case "medium":
        return "bg-blue-100 text-blue-700";
    }
  }, [editedData.level]);
  return (
    <div
      onDoubleClick={editTask}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-200"
    >
      <div className="flex flex-col items-start gap-4">
        {!editStatus ? (
          <span
            className={`px-3 py-1 ${levelStyles} font-medium rounded-full self-end text-sm`}
          >
            {props.level}
          </span>
        ) : (
          <select
            className={`px-3  py-1 text-center font-medium rounded-full ${selectLevelStyles} text-sm self-end`}
            name="status"
            value={editedData.level}
            onChange={(e) => {
              const value = e.target.value as "low" | "medium" | "high";
              setEditedData({ ...editedData, level: value });
            }}
          >
            <option
              className="bg-green-100  text-center text-green-700"
              value="low"
            >
              low
            </option>
            <option className="bg-blue-100 text-blue-700" value="medium">
              medium
            </option>
            <option className="bg-red-100 text-red-700" value="high">
              high
            </option>
          </select>
        )}
        <div className="flex-1 w-full">
          <div className="flex items-center w-full gap-3 mb-2">
            {!editStatus ? (
              <h3
                className={`text-lg  font-medium w-full text-gray-800 ${
                  props.completed ? "line-through" : ""
                }`}
              >
                {props.title}
              </h3>
            ) : (
              <input
                className="w-full p-2 border-2 text-lg  font-medium  text-gray-800"
                value={editedData.title}
                onChange={(e) =>
                  setEditedData({ ...editedData, title: e.target.value })
                }
              />
            )}
          </div>
          {props.description && !editStatus && (
            <Descrtiption
              description={props.description}
              completed={props.completed}
            />
          )}
          {props.description && editStatus && (
            <InputDesc
              value={editedData.description}
              onChange={(e): void =>
                setEditedData({ ...editedData, description: e.target.value })
              }
            />
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {!props.completed ? <span>📅 {date}</span> : <span>✅ {date}</span>}
            <span>🏷️ Project</span>
          </div>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          {!props.completed && (
            <button
              onClick={editTask}
              className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            >
              ✏️
            </button>
          )}
          {!editStatus ? (
            <>
              <button
                onClick={deleteTask}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              >
                {!deleteLoading ? (
                  <span> 🗑️</span>
                ) : (
                  <Spiner proportions={20} />
                )}
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
            </>
          ) : (
            <span
              onClick={changeTask}
              className="text-[40px] text-center w-[65px] "
            >
              ✅
            </span>
          )}
        </div>
      </div>
    </div>
  );
});

export default TaskItem;
