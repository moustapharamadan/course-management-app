import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function tableRow(course, onDeleteClick) {
  return (
    <tr key={course.id}>
      <td>
        <a
          className="btn btn-light"
          href={"http://pluralsight.com/courses/" + course.slug}
        >
          Watch
        </a>
      </td>
      <td>
        <Link to={"/course/" + course.slug}>{course.title}</Link>
      </td>
      <td>{course.author ? course.author.name : ""}</td>
      <td>{course.category}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => onDeleteClick(course)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

function CourseList({ courses, onDeleteClick }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => {
          return tableRow(course, onDeleteClick);
        })}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};

export default CourseList;
