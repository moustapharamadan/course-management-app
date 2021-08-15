import * as courseActions from "../courseActions";
import * as types from "../actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS action", () => {
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE,
      course,
    };

    const action = courseActions.createCourseSuccess(course);

    expect(action).toEqual(expectedAction);
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
describe("Async Actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("Load Courses Thunk", () => {
    fetchMock.mock("*", {
      body: courses,
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.LOAD_COURSES_SUCCESS, courses },
      { type: types.END_API_CALL },
    ];

    const store = mockStore({ courses: [] });
    return store.dispatch(courseActions.loadCourses()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
