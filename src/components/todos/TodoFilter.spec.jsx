import TodoFilter from "../todos/TodoFilter"
import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useTodos, useTodosDispatch } from "../../contexts/TodoContext";
import { dummyTodosdos } from "../../__test__/dummy";
import userEvent from "@testing-library/user-event";

const mockObj = {
    dispath: vi.fn((action) => { }),
};
vi.mock("../../contexts/TodoContext", () => {
    return {
        useTodos: vi.fn(),
        useTodosDispatch: vi.fn(),
    };
});
useTodos.mockImplementation(() => ({ data: dummyTodosdos, category: "ALL" }));
useTodosDispatch.mockImplementation(() => (action) => {
    mockObj.dispath(action);
});


describe("<TodoFilter />", () => {
    test("redner", () => {
        render(
            <TodoFilter />
        );
    });

    test(
        "select 선탁핸 갑이 바뀔시 onChanger 함수 호출해서 dispatch 함수를 호출", async () => {
            const psyDispath = vi.spyOn(mockObj, "dispath");

            render(<TodoFilter />);


            expect(screen.getByTestId("todo-filter")).toBeInTheDocument();

            await userEvent.selectOptions(screen.getByTestId("todo-filter"), "TODO")

            expect(psyDispath).toHaveBeenCalled({
                selectedCategory: "TODO",
                type: "FILTER"
            })

        }
    )



})