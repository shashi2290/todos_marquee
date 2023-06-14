import React, { useEffect, useState } from "react";
import { useAuth } from "../../AuthContext";
import { Todo } from "../../api";
import { useNavigate } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  const { user, logout, addTodo, verifyToken, addSubTask } = useAuth();
  const [taskInput, setTaskInput] = React.useState("");
  const [subTask, setSubTask] = React.useState("");
  const [show, setShow] = React.useState({ show: false, todoId: -1 });

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
    if (!taskInput.trim()) {
      return;
    }
    addTodo(taskInput);
    setTaskInput("");
  };

  const handleAddSubTask = (todoId: number) => {
    if (!subTask.trim()) {
      return;
    }
    addSubTask(todoId, subTask);
    setShow({ show: false, todoId: -1 });
    setSubTask("");
  };

  return (
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <button onClick={logout}>Logout</button>
      <h3>Todos:</h3>
      <ul>
        {user?.todos.map((todo) => (
          <div style={{ display: "flex", paddingBottom: "20px" }}>
            <TodoItem key={todo.id} todo={todo} />
            <button
              style={{ height: "20px" }}
              onClick={() => {
                if (show.show) {
                  setShow({ show: false, todoId: -1 });
                  return;
                }
                setShow({ show: true, todoId: todo.id });
              }}
            >
              +
            </button>
            {show.show && show.todoId === todo.id && (
              <div>
                <input
                  type="text"
                  value={subTask}
                  onChange={(e) => setSubTask(e.target.value)}
                />
                <button
                  onClick={() => {
                    handleAddSubTask(todo.id);
                  }}
                >
                  Add Subtask Task
                </button>
              </div>
            )}
          </div>
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
