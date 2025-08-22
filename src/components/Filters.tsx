import type { FC } from "react";

interface FiltersProps {
  loading: boolean;
  all: number;
  completed: number;
}

const Filters: FC<FiltersProps> = ({ loading, all, completed }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>{all} tasks remaining</span>
          <span className="w-2 h-2 bg-green-400 rounded-full"></span>
          <span className="text-green-400">{completed} completed</span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
          All
        </button>
        <button className="flex-2 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Active
        </button>
        <button className="flex-3 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Completed
        </button>
      </div>
    </div>
  );
};

export default Filters;
