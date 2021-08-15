import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import * as authorAction from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCoursePage({
  courses,
  authors,
  loadCourses,
  saveCourse,
  loadAuthors,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (0 === courses.length) {
      loadCourses().catch((error) => {
        alert("Loading courses failed " + error);
      });
    } else {
      setCourse({ ...props.course });
    }
    if (0 === authors.length) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed " + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((previousCourse) => ({
      ...previousCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  function isValidForm() {
    const { title, authorId, category } = course;
    const error = {};
    if (!title) error.title = "Title is required.";
    if (!authorId) error.authorId = "Author is required.";
    if (!category) error.category = "Category is required.";
    setErrors(error);

    return Object.keys(error).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!isValidForm()) return;

    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course Saved");
        history.push("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return authors.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <>
      <CourseForm
        course={course}
        errors={errors}
        authors={authors}
        onChange={handleChange}
        onSave={handleSave}
        saving={saving}
      />
    </>
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  const slug = ownProps.match.params.slug;
  const course = slug ? getCourseBySlug(state.courses, slug) : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
};

const mapDispatchToProps = {
  loadCourses: courseAction.loadCourses,
  saveCourse: courseAction.saveCourse,
  loadAuthors: authorAction.loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);

function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug);
}
