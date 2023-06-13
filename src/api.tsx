import data from "./mockdata.json";
import jwt from "jsonwebtoken";

export interface User {
  id: number;
  username: string;
  password: string;
  name: string;
  todos: Todo[];
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  subTasks?: Todo[];
}

export function login(username: string, password: string): string | undefined {
  // debugger;
  const user = data.users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username, todos: user.todos },
      "secret-key",
      {
        expiresIn: "1h",
      }
    );

    return token;
  }

  return undefined;
}

export function verifyToken(token: string | null): User | null {
  // debugger;
  try {
    const decoded =
      token &&
      (jwt.verify(token, "secret-key") as {
        id: number;
        username: string;
      });

    const user =
      decoded &&
      data.users.find(
        (user) => user.id === decoded.id && user.username === decoded.username
      );
    return user || null;
  } catch (err) {
    return null;
  }
}
