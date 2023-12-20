import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import TodoItem from "./TodoItem";
import { dummyTodos } from "../../__test__/dummy";
import { TODO_CATEGORY_ICON } from "@/constants/icon";
import userEvent from "@testing-library/user-event";
import { useTodosDispatch } from "../../contexts/TodoContext";
const spyObj = {
    dispath: vi.fn((action) => { }),
};
vi.mock("../../contexts/TodoContext", async () => {
    return {
        useTodosDispatch: vi.fn(),
    };
});
useTodosDispatch.mockImplementation(() => (action) => {
    console.log(action);
    spyObj.dispath(action);
});
describe("<TodoItem />", () => {
    test("render", () => {
        render(<TodoItem todo={dummyTodos[0]} />);
    });
    test("값 출력이 잘됬는지 ", () => {
        const stubData = {
            id: 22,
            title: "dumy title",
            summary: "dumt summary",
            category: "TODO",
        };
        render(<TodoItem todo={stubData} />);
        expect(screen.getByText(stubData.title)).toBeInTheDocument();
        expect(screen.getByText(stubData.summary)).toBeInTheDocument();
        expect(
            screen.getByText(TODO_CATEGORY_ICON[stubData.category])
        ).toBeInTheDocument();
    });
    test("수정 버튼 클릭시 update 모달 출현 ", async () => {
        render(<TodoItem todo={dummyTodos[0]} />);
        await userEvent.click(screen.getByText("✏️"));
        expect(screen.getByText("Update Todo")).toBeInTheDocument();
    });

    test("삭제 버튼 ", async () => {
        const spyDispath = vi.spyOn(spyObj, "dispath");
        render(<TodoItem todo={dummyTodos[0]} />);
        await userEvent.click(screen.getByText("🗑"));
        expect(spyDispath).toHaveBeenCalledWith({
            type: "DELETE",
            id: dummyTodos[0].id,
        });
    });
});