import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { User, login as mockLogin, verifyToken } from "./api";

interface AuthContextData {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  addTodo: (task: string) => void;
  updateTodo: (todoId: number) => void;
  verifyToken: (token: string | null) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData | null>(null);

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  console.log("user", user);
  //   const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const authenticatedUser = verifyToken(token);
      if (authenticatedUser) {
        setUser(authenticatedUser);
      }
    }
  }, []);

  const login = (username: string, password: string) => {
    const token = mockLogin(username, password);
    if (token) {
      const authenticatedUser = verifyToken(token);
      if (authenticatedUser) {
        setUser(authenticatedUser);
        // console.log("auth", authenticatedUser);
        localStorage.setItem("token", token);
      }
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const addTodo = (description: string) => {
    if (user) {
      const prevTasks = user?.todos;
      const newTask = {
        id: prevTasks?.length + 1,
        completed: false,
        title: description,
        subTasks: [],
      };
      setUser({ ...user, todos: [...prevTasks, newTask] });
    }
  };

  const updateTodo = (todoId: number) => {
    if (user) {
      const todos = [...user?.todos];
      const modifiedTodos = todos?.map((todo) => {
        if (todo.id === todoId) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setUser({ ...user, todos: [...modifiedTodos] });
    }

    // const updatedTodo = {...user?.todos[index], completed: !todo?.completed};
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, addTodo, updateTodo, verifyToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {};
