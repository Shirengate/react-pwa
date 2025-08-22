import { Header } from "@/components/Header";
import Form from "@/components/Form";
import Filters from "@/components/Filters";
import TaskList from "@/components/TaskList";
import { useGetAllTaksQuery } from "./store/api/tasks";

const App = () => {
  const { data, isLoading, isError, refetch } = useGetAllTaksQuery("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      <main className=" mx-auto px-4 py-8">
        <Form />
        {!isError ? (
          <>
            <Filters
              completed={data?.filter((item) => item.completed).length || 0}
              all={data?.length || 0}
              loading={isLoading}
            />
            <TaskList data={data} loading={isLoading} />
          </>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">
                  ⚠️
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-700">
                    Unable to load tasks
                  </h3>
                  <p className="mt-1 text-red-600">
                    Something went wrong while fetching your tasks. Please check
                    your connection and try again.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div
                      onClick={refetch}
                      className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 transition-colors"
                    >
                      Try again
                    </div>
                    <span className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2 text-red-700">
                      If the issue persists, please try later
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className=" mx-auto px-4 py-6 text-center text-gray-600">
          <p>Built with ❤️ using React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
