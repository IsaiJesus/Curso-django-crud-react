import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <div className="flex justify-between p-3">
      <Link to="/tasks">
        <h1 className="font-bold text-3xl mb-4">Task App</h1>
      </Link>
      <Link to="tasks-create" className="bg-indigo-500 flex items-center px-3 py-2 rounded-lg">
        Create task
      </Link>
    </div>
  );
}
