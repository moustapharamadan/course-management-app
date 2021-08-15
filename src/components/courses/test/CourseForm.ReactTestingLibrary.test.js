import React from "react";
import CourseForm from "../CourseForm";
import { render } from "@testing-library/react";

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {},
  };

  const props = { ...defaultProps, ...args };
  return render(<CourseForm {...props} />);
}

it("should render Add Course header", () => {
  const { getByText } = renderCourseForm();
  getByText("Add"); //the test will fail if it can not find the the label Add
});

it("should label svae button as 'Save' when not saving", () => {
  const { getByText } = renderCourseForm();
  getByText("Save");
});

it("should label svae button as 'Saving...' when saving", () => {
  const { getByText /*debug*/ } = renderCourseForm({ saving: true });
  //   debug();
  getByText("Saving...");
});
