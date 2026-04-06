import useTodos from "../hooks/useTodos";

const TodoList = () => {
  const {
    todos,
    newTodo,
    setNewTodo,
    addTodo,
    toggleTodo,
    handleKeyDown,
    loading,
  } = useTodos();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-teal-800 p-8 rounded-lg shadow-lg w-full max-w-md">

        <h1 className="text-4xl font-bold text-center text-white mb-6">
          To Do List
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Enter your todo..."
            className="flex-1 rounded-md bg-stone-200 text-black px-4 py-2 text-lg"
          />

          <button
            onClick={addTodo}
            className="bg-black text-white rounded-md px-4 py-2"
          >
            Add +
          </button>
        </div>

        {/* Loading */}
        {loading && <p className="text-white">Loading...</p>}

        {/* List */}
        <ul className="bg-orange-50 rounded-md overflow-hidden">
          {todos.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-3 px-4 py-3 border-b"
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTodo(item.id)}   
                className="w-4 h-4"
              />

              <span
                className={`flex-1 ${
                  item.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {item.task}
              </span>
            </li>
          ))}
        </ul>

        {/* Count */}
        <p className="text-white mt-3 text-right">
          {todos.filter((t) => t.completed).length} of {todos.length} completed
        </p>
      </div>
    </div>
  );
};

export default TodoList;