// client/src/pages/TodoList.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';
import TaskForm from '../components/TaskForm';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const { token, logout } = useContext(AuthContext);
  const [editingTask, setEditingTask] = useState(null);

  // Configure axios to include the token
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:5002',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const fetchTasks = async () => {
    try {
      const res = await axiosInstance.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      setError(err.response.data.message || 'Error fetching tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, []);

  const onDelete = async (id) => {
    try {
      await axiosInstance.delete(`/api/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      setError(err.response.data.message || 'Error deleting task');
    }
  };

  const onEdit = (task) => {
    setEditingTask(task);
  };

  const onFormSubmit = async (taskData) => {
    try {
      if (editingTask) {
        // Update task
        await axiosInstance.put(`/api/tasks/${editingTask._id}`, taskData);
      } else {
        // Create new task
        await axiosInstance.post('/api/tasks', taskData);
      }
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      setError(err.response.data.message || 'Error saving task');
    }
  };

  return (
    <div className="container mt-5">
      <h2>My Tasks</h2>
      <button className="btn btn-secondary mb-3" onClick={logout}>Logout</button>
      {error && <div className="alert alert-danger">{error}</div>}
      <TaskForm onFormSubmit={onFormSubmit} editingTask={editingTask} />
      <ul className="list-group mt-3">
        {tasks.map(task => (
          <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{task.title}</h5>
              <p>{task.description}</p>
              <small>{task.completed ? 'Completed' : 'Pending'}</small>
            </div>
            <div>
              <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(task)}>Edit</button>
              <button className="btn btn-sm btn-danger" onClick={() => onDelete(task._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
