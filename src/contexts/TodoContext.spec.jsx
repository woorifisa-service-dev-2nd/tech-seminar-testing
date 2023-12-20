import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import { TodoProvider, useTodos, useTodosDispatch } from "./TodoContext";
import { createContext, useContext } from "react";
import userEvent from "@testing-library/user-event";

const UseContext = () => {
  // 외부에서 사용할 수 있도록 export
  //   const TodoContext = createContext(); // Todos 데이터 제공 용도의 Context
  //   const TodoDispatchContext = createContext(); // Todos Dispatch() 제공 용도의 Context

  // 읽기 쉬운 이름으로 추상화
  // const useTodos = () => useContext(TodoContext);
  // const useTodosDispatch = () => useContext(TodoDispatchContext);

  const todos = useTodos();
  const dispath = useTodosDispatch();

  return (
    <div>
      <div>
        {todos.data &&
          todos.data.map((todo) => (
            <div key={todo.id}>
              <p>id : {todo.id}</p>
              <p>{todo.title}</p>
              <p>{todo.summary}</p>
              <p>{todo.category}</p>
            </div>
          ))}
      </div>
      <button
        onClick={() =>
          dispath({
            type: "ADD",
            newTodo: {
              id: 44,
              title: "ADD DATA",
              summary: "ADD summary",
              category: "DONE",
            },
          })
        }
      >
        ADD
      </button>
      <button
        onClick={() =>
          dispath({
            type: "UPDATE",
            updateTodo: {
              id: 2,
              title: "UPDATE DATA",
              summary: "UPDATE summary",
              category: "TODO",
            },
          })
        }
      >
        UPDATE
      </button>
      <button onClick={() => dispath({ type: "DELETE", id: 2 })}>DELETE</button>
      <button onClick={() => dispath({ type: "FILTER" })}>FILTER</button>
    </div>
  );
};

describe("TodoProvider", () => {
  beforeEach(() => {
    render(
      <TodoProvider>
        <UseContext />
      </TodoProvider>
    );
  });

  test("ADD ", async () => {
    // expect(screen.getByText(/ADD/))
    expect(screen.getByText("ADD")).toBeInTheDocument();
    await userEvent.click(screen.getByText("ADD"));

    expect(screen.getByText(/ADD summary/)).toBeInTheDocument();
  });
  test("UPDATE ", async () => {
    await userEvent.click(screen.getByText("UPDATE"));

    expect(screen.getByText(/UPDATE summary/)).toBeInTheDocument();
  });
  test("DELETE ", async () => {
    await userEvent.click(screen.getByText("DELETE"));

    expect(() => screen.getByText("id : 2")).toThrowError();
  });
  test("FILTER ", async () => {
    await userEvent.click(screen.getByText("FILTER"));
  });
});
