export default function TaskCard({ task, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-dark line-clamp-2">
          {task.title}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>

      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>Due: {formatDate(task.dueDate)}</span>
        <span>
          Priority: <span className="font-medium">{task.priority}</span>
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 btn-primary text-sm"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="flex-1 btn-danger text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
