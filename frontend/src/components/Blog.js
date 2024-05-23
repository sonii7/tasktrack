import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import './Blog.css';

export default function TaskTracker() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:3008/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateTask = async () => {
    try {
      await axios.post('http://127.0.0.1:3008/tasks', { title: taskTitle, description: taskDescription });
      fetchTasks();
      setTaskTitle('');
      setTaskDescription('');
      alert('Task created successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to create task');
    }
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
    const editedTask = tasks.find(task => task.id === taskId);
    setTaskTitle(editedTask.title);
    setTaskDescription(editedTask.description);
  };

  const handleUpdateTask = async (taskId) => {
    try {
      await axios.put(`http://127.0.0.1:3008/tasks/${taskId}`, { title: taskTitle, description: taskDescription });
      fetchTasks();
      setEditingTaskId(null);
      setTaskTitle('');
      setTaskDescription('');
      alert('Task updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:3008/tasks/${taskId}`);
      fetchTasks();
      alert('Task deleted successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to delete task');
    }
  };

  return (
    <div>
      <h3><center>Task Tracker</center></h3> 
      <form style={{ maxWidth: '400px', margin: '0 auto' }}>
        <div className="mb-3">
          <label className="form-label"><b>Task Title</b></label>
          <input type="text" className="form-control" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} /><br></br>
        </div>
        <div className="mb-3">
          <label className="form-label"> <b>Task Description</b></label>
          <textarea className="form-control" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea><br></br>
          <center><Button variant="primary" onClick={handleCreateTask}>Create Task</Button></center>
        </div>
      </form>
      <div>
        <CardGroup>
          {tasks.map(task => (
            <div key={task.id} style={{margin:'20px'}}>
              <Card className="bg-dark text-white" style={{ width: '18rem', height: '15rem' }}>
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Text>{task.description}</Card.Text>
                  <Button style={{margin:'5px'}} variant="primary" onClick={() => handleEditTask(task.id)}>Edit</Button>
                  <Button style={{margin:'5px'}} variant="primary" onClick={() => handleUpdateTask(task.id)}>Update</Button>
                  <Button style={{margin:'5px'}} variant="primary" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </CardGroup>
      
      </div>
    </div>
  );
}
