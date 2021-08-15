import React from "react";
import { mount } from "enzyme";
import { ManageCoursePage } from "../ManageCoursePage";
import { courses, authors, newCourse } from "../../../tools/mockData";

function render(args) {
  const defaultProps = {
    authors,
    courses,
    history: {},
    loadCourses: jest.fn(),
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    course: newCourse,
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
}

it("sets error when attempting to save an empty title field", () => {
  const warpper = render();
  warpper.find("form").simulate("submit");
  const error = warpper.find(".alert").first();
  expect(error.text()).toBe("Title is required.");
});
