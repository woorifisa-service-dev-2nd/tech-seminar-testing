import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TodoBody from "./TodoBody";
import userEvent from "@testing-library/user-event";
import { useTodos } from "../../contexts/TodoContext";
import { dummyTodos } from "../../__test__/dummy";
import TodoHeader from "./TodoHeader";

vi.mock("./TodoFilter", () => ({
    default: () => {
        return (
            <div>
                <p>filter</p>
            </div>
        );
    },
}));

describe("<TodoHeader/>", () => {
    test("render", () => {
        render(<TodoHeader />);
    })

    test("add 버튼 클릭시 모달 호출 되어 랜더링 되는지 확인", async () => {
        render(<TodoHeader />);

        expect(screen.getByTestId("add-todo-button")).toHaveTextContent("Add Todo");

        expect(() => screen.getByText("New Todo")).toThrowError();

        await userEvent.click(screen.getByTestId("add-todo-button"));

        expect(screen.getByText("New Todo")).toBeInTheDocument();

    });

    test("모달 close 버튼 클릭시 모달 닫히는지 확인", async () => {

        render(<TodoHeader />);

        expect(screen.getByTestId("add-todo-button")).toHaveTextContent("Add Todo");

        await userEvent.click(screen.getByTestId("add-todo-button"));

        expect(screen.getByText("New Todo")).toBeInTheDocument();

        await userEvent.click(screen.getByText("Cancel"));

        expect(() => screen.getByText("New Todo")).toThrowError();


    })

})


