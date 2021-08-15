import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/courseActions";
import * as authorAction from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (0 === courses.length) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed " + error);
      });
    }
    if (0 === authors.length) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed " + error);
      });
    }
  }

  handleDeleteCourse(course) {
    toast.success("Course Deleted");
    this.props.actions
      .deleteCourse(course)
      .catch((error) =>
        toast.error("Delete Failed. " + error.message, { autoClose: false })
      );
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course/" />}

        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={(course) => this.handleDeleteCourse(course)}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  loading: PropTypes.bool.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    courses: state.courses.map((course) => {
      return {
        ...course,
        author: state.authors.find((author) => author.id === course.authorId),
      };
    }),
    authors: state.authors,
    loading: state.apiCalls > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      loadCourses: bindActionCreators(courseAction.loadCourses, dispatch),
      deleteCourse: bindActionCreators(courseAction.deleteCourse, dispatch),
      loadAuthors: bindActionCreators(authorAction.loadAuthors, dispatch),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
