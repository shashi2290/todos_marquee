import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { Todo } from "../../api";
import { useNavigate } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const { user, logout, addTodo, verifyToken } = useAuth();
  const [taskInput, setTaskInput] = React.useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token && !user) {
      navigate("/login");
    } else {
      verifyToken(token);
    }
  }, [user, navigate, verifyToken]);

  const handleAddTask = () => {
    addTodo(taskInput);
    setTaskInput("");
  };

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <button onClick={logout}>Logout</button>
      <h3>Todos:</h3>
      <ul>
        {user?.todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
      <input
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { updateTodo } = useAuth();
  const [checked, setChecked] = useState(false);
  const handleToggleTodo = () => {
    updateTodo(todo.id);
    setChecked(!checked);
    console.log("check");
  };
  return (
    <li>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleToggleTodo}
        onClick={handleToggleTodo}
        // readOnly
      />
      {todo.title}
      {todo.subTasks && (
        <ul>
          {todo.subTasks.map((subTask) => (
            <TodoItem key={subTask.id} todo={subTask} />
          ))}
        </ul>
      )}
    </li>
  );
};
