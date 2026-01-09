const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle errors
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Error: ${response.status}`);
  }
  return data;
};

const api = {
  // Degrees
  getDegrees: () => fetch(`${API_BASE_URL}/degrees`).then(res => res.json()),
  createDegree: (data) => fetch(`${API_BASE_URL}/degrees`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateDegree: (id, data) => fetch(`${API_BASE_URL}/degrees/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteDegree: (id) => fetch(`${API_BASE_URL}/degrees/${id}`, { method: 'DELETE' }).then(res => res.json()),

  // Students
  getStudents: () => fetch(`${API_BASE_URL}/students`).then(res => res.json()),
  searchStudents: (query) => fetch(`${API_BASE_URL}/students/search?query=${query}`).then(res => res.json()),
  createStudent: (data) => fetch(`${API_BASE_URL}/students`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateStudent: (id, data) => fetch(`${API_BASE_URL}/students/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteStudent: (id) => fetch(`${API_BASE_URL}/students/${id}`, { method: 'DELETE' }).then(res => res.json()),

  // Teachers
  getTeachers: () => fetch(`${API_BASE_URL}/teachers`).then(res => res.json()),
  searchTeachers: (query) => fetch(`${API_BASE_URL}/teachers/search?query=${query}`).then(res => res.json()),
  createTeacher: (data) => fetch(`${API_BASE_URL}/teachers`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateTeacher: (id, data) => fetch(`${API_BASE_URL}/teachers/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteTeacher: (id) => fetch(`${API_BASE_URL}/teachers/${id}`, { method: 'DELETE' }).then(res => res.json()),

  // Courses
  getCourses: () => fetch(`${API_BASE_URL}/courses`).then(res => res.json()),
  searchCourses: (query) => fetch(`${API_BASE_URL}/courses/search?query=${query}`).then(res => res.json()),
  createCourse: (data) => fetch(`${API_BASE_URL}/courses`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateCourse: (id, data) => fetch(`${API_BASE_URL}/courses/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteCourse: (id) => fetch(`${API_BASE_URL}/courses/${id}`, { method: 'DELETE' }).then(res => res.json()),

  // Classes
  getClasses: () => fetch(`${API_BASE_URL}/classes`).then(res => res.json()),
  searchClasses: (query) => fetch(`${API_BASE_URL}/classes/search?query=${query}`).then(res => res.json()),
  createClass: (data) => fetch(`${API_BASE_URL}/classes`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  updateClass: (id, data) => fetch(`${API_BASE_URL}/classes/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(handleResponse),
  deleteClass: (id) => fetch(`${API_BASE_URL}/classes/${id}`, { method: 'DELETE' }).then(res => res.json()),

};

export default api;
