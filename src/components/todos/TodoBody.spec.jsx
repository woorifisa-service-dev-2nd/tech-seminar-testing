import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TodoBody from "./TodoBody";
import userEvent from "@testing-library/user-event";
import { useTodos } from "../../contexts/TodoContext";
import { dummyTodos } from "../../__test__/dummy";

vi.mock("./TodoItem", () => ({
  default: ({ todo }) => {
    return (
      <div>
        <p>{todo.id}</p>
        <p>{todo.title}</p>
        <p>{todo.summary}</p>
        <p>{todo.category}</p>
      </div>
    );
  },
}));

vi.mock("../../contexts/TodoContext", () => {
  return {
    useTodos: vi.fn(),
  };
});

describe("<TodoBody />", () => {
  // test("redner", () => {
  //   render(
  //     <TodoBody />
  //   );
  // });


  test("Category DONE ", async () => {
    useTodos.mockImplementation(() => ({
      data: dummyTodos,
      category: "DONE",
    }));
    render(<TodoBody />);

    expect(() => screen.getByText("점심 먹기")).toThrowError();

    expect(screen.getByText("커피를 마신다."));
  });

  test("Category All", async () => {
    useTodos.mockImplementation(() => ({
      data: dummyTodos,
      category: "ALL",
    }));
    render(<TodoBody />);

    expect(screen.getByText("점심 먹기")).toBeInTheDocument();

    expect(screen.getByText("커피를 마신다.")).toBeInTheDocument();
  });
});
