
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test } from "vitest";
import TodoForm from "./TodoForm";
import userEvent from "@testing-library/user-event";
import { useTodosDispatch } from "../../contexts/TodoContext"
import { dummyTodos } from "../../__test__/dummy";

const spyObj = {
    dispath: vi.fn((action) => { }),
    onClose: vi.fn(),
};
vi.mock("../../contexts/TodoContext", () => {
    return {
        useTodosDispatch: vi.fn(),
    };
});

useTodosDispatch.mockImplementation(() => (action) => {
    spyObj.dispath(action);

});

describe("<TodoForm ADD FORM", () => {
    let spyClose;
    let updateDisapath;
    beforeEach(() => {
        spyClose = vi.spyOn(spyObj, "onClose");
        updateDisapath = vi.spyOn(spyObj, "dispath");
        render(<TodoForm onClose={spyObj.onClose}>New</TodoForm>);
    });
    test("ADD FORM 확인", () => {
        expect(screen.getByTestId("addOrUpdateBtn")).toHaveTextContent("Add");
    });
    test("값이 안 들어왔을 때 버튼 비활성화", () => {
        expect(screen.getByTestId("addOrUpdateBtn")).toBeDisabled;
    });
    test("값이 안 들어왔을 때 작성해달라는 문자 출력", () => {
        expect(screen.getByText(/모든 항목을 채워서 작성해주세요/))
    });
    test("ADD Button 클릭시", async () => {

        const stubData = {
            id: "stub-test-id",
            title: "stub title",
            summary: "stub summary",
            category: "DONE",
        };
        window.self.crypto.randomUUID = () => stubData.id

        await userEvent.type(screen.getByTestId("input-title"), stubData.title);
        await userEvent.type(screen.getByTestId("input-summary"), stubData.summary);
        await userEvent.selectOptions(screen.getByTestId("test-category"), stubData.category);

        await userEvent.click(screen.getByTestId("addOrUpdateBtn"))

        expect(updateDisapath).toHaveBeenCalledWith({
            type: "ADD",
            newTodo: stubData
        })



    });
    test("close 버튼 클릭시 ", async () => {
        await userEvent.click(screen.getByText("Cancel"))

        expect(spyClose).toHaveBeenCalledTimes(1)
    });
})


describe("<TodoForm /> UPDATE FORM", () => {

    let spyClose;
    let updateDisapath;
    beforeEach(() => {
        spyClose = vi.spyOn(spyObj, "onClose");
        updateDisapath = vi.spyOn(spyObj, "dispath");
        render(
            <TodoForm onClose={spyObj.onClose} todo={dummyTodos[0]}>
                Update
            </TodoForm>
        );
    });

    test("New children 문자열 이 아닐시 Update Form 인지 확인", () => {
        expect(screen.getByTestId("addOrUpdateBtn")).toHaveTextContent("Update");
    });
    test("Update Button 클릭시", async () => {

        const stubData = {
            id: dummyTodos[0].id,
            title: "stub title",
            summary: "stub summary",
            category: "PROGRESS",
        };


        await userEvent.clear(screen.getByTestId("input-title"), stubData.title);
        await userEvent.type(screen.getByTestId("input-title"), stubData.title);
        await userEvent.clear(screen.getByTestId("input-summary"), stubData.summary);
        await userEvent.type(screen.getByTestId("input-summary"), stubData.summary);
        await userEvent.selectOptions(screen.getByTestId("test-category"), stubData.category);

        await userEvent.click(screen.getByTestId("addOrUpdateBtn"))

        expect(updateDisapath).toHaveBeenCalledWith({
            type: "UPDATE",
            updateTodo: stubData
        })


    });
    test("close 버튼 클릭시 ", async () => {
        await userEvent.click(screen.getByText("Cancel"))

        expect(spyClose).toHaveBeenCalledTimes(1)
    });
});