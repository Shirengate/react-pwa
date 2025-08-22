import { memo, useMemo, type FC } from "react";
import type { Task } from "@/types/types";
const TaskComp: FC<{ props: Task }> = memo(({ props }) => {
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
      <div className="flex items-start gap-4">
        <input
          type="checkbox"
          checked
          className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-medium  line-through text-gray-500">
              Setup development environment
            </h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
              Low
            </span>
          </div>
          <p className="text-gray-500 mb-3 line-through">
            Install and configure all necessary development tools
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>✅ Completed: Dec 10, 2024</span>
            <span>🏷️ Setup</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
            ✏️
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
});

export default TaskComp;
