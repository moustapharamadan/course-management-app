import courseReducer from "../courseReducer";
import * as actions from "../../actions/courseActions";

it("should add course ", () => {
  const initialState = [{ title: "A" }, { title: "B" }];
  const newCourse = { title: "C" };

  const action = actions.createCourseSuccess(newCourse);
  const newState = courseReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("B");
  expect(newState[2].title).toEqual("C");
});

it("should update course ", () => {
  const initialState = [
    { id: 1, title: "A" },
    { id: 2, title: "B" },
    { id: 3, title: "C" },
  ];
  const newCourse = { id: 2, title: "HeHe" };

  const action = actions.updateCourseSuccess(newCourse);
  const newState = courseReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual("A");
  expect(newState[1].title).toEqual("HeHe");
  expect(newState[2].title).toEqual("C");
});
