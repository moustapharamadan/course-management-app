import { createStore } from "redux";
import rootReducer from "../reducers";
import * as courseActions from "../actions/courseActions";

it("Should handle creating courses", () => {
  const store = createStore(rootReducer);
  const course = {
    title: "Design Pattern",
  };

  store.dispatch(courseActions.createCourseSuccess(course));
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
