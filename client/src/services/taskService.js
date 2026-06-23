import axios from "axios";

const API = "http://localhost:8080/tasks";

export const getTasks = () => axios.get(API);

export const addTask = (taskData) => axios.post(API, taskData);

export const deleteTask = (id) => axios.delete(`${API}/${id}`);

export const updateTask = (id, data) => axios.put(`${API}/${id}`, data);

export const completeTask = (id) => axios.patch(`${API}/${id}/complete`);
