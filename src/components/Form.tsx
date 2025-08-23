import { usePostTaskMutation } from "@/store/api/tasks";
import type { TaskBody } from "@/types/types";
import dayjs from "dayjs";
import React, { memo, useState } from "react";

type TaskLevel = "low" | "medium" | "high";

const Form = memo(() => {
  const [taskData, setTaskData] = useState<TaskBody>({
    title: "",
    description: "",
    date: dayjs().format(""),
    completed: false,
    level: "low" as TaskLevel,
  });
  const [postData, { isLoading }] = usePostTaskMutation();

  if (isLoading) {
    return <div>loading...</div>;
  }

  function clearFields() {
    setTaskData({
      title: "",
      description: "",
      date: dayjs().format(""),
      completed: false,
      level: "low" as TaskLevel,
    });
  }
  async function createToDo() {
    try {
      const data = await postData(taskData).unwrap();
      clearFields();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
      <div className="flex flex-col w-full gap-3">
        <input
          type="text"
          value={taskData.title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const value = e.target.value;
            setTaskData({ ...taskData, title: value });
          }}
          placeholder="What needs to be done?"
          className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        />
        <textarea
          placeholder="Add description (optional)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
          rows={3}
          value={taskData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const value = e.target.value;
            setTaskData({ ...taskData, description: value });
          }}
        />
        <div className="flex gap-5">
          <select
            value={taskData.level}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              const value = e.target.value as "low" | "medium" | "high";
              setTaskData({ ...taskData, level: value });
            }}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button
            onClick={createToDo}
            className="px-6 py-3 ml-auto flex-1 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
          >
            Add Task
          </button>
        </div>
      </div>
    </div>
  );
});

export default Form;
