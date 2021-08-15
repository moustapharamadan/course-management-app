import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";
import SelectInput from "../common/SelectInput";

function CourseForm({
  course,
  authors,
  onSave,
  onChange,
  saving = false,
  errors = {},
}) {
  return (
    <form onSubmit={onSave}>
      <h2>{course.id ? "Edit" : "Add"}</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave};
        </div>
      )}
      <TextInput
        name="title"
        label="Title"
        onChange={onChange}
        value={course.title}
        error={errors.title}
      />
      <SelectInput
        name="authorId"
        label="Author"
        value={course.authorId || ""}
        defaultOption="Select Author"
        options={authors.map((author) => ({
          value: author.id,
          text: author.name,
        }))}
        onChange={onChange}
        error={errors.authorId}
      />
      <TextInput
        name="category"
        label="Category"
        onChange={onChange}
        value={course.category}
        error={errors.category}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? "Saving..." : "Save"}
      </button>
    </form>
  );
}

CourseForm.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool,
  errors: PropTypes.object,
};

export default CourseForm;
