// client/src/components/TaskForm.js
import React, { useState, useEffect } from 'react';

const TaskForm = ({ onFormSubmit, editingTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false,
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        completed: editingTask.completed,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        completed: false,
      });
    }
  }, [editingTask]);

  const { title, description, completed } = formData;

  const onChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    onFormSubmit(formData);
    setFormData({ title: '', description: '', completed: false });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="mb-3">
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>Description</label>
        <textarea
          name="description"
          value={description}
          onChange={onChange}
          className="form-control"
        />
      </div>
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          name="completed"
          checked={completed}
          onChange={onChange}
          className="form-check-input"
          id="completedCheck"
        />
        <label className="form-check-label" htmlFor="completedCheck">
          Completed
        </label>
      </div>
      <button type="submit" className="btn btn-success">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
