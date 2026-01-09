import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search } from 'lucide-react';
import Modal from './Modal';
import api from '../api';

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ course_desc: '' });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const data = await api.getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading courses:', error);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.course_desc.trim()) {
      alert('Please enter course description');
      return;
    }
    try {
      if (editingId) {
        await api.updateCourse(editingId, formData);
        setEditingId(null);
      } else {
        await api.createCourse(formData);
      }
      setFormData({ course_desc: '' });
      loadCourses();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.deleteCourse(id);
        loadCourses();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleEdit = (course) => {
    setFormData(course);
    setShowModal(true);
    setEditingId(course.course_id);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      try {
        const data = await api.searchCourses(value);
        setCourses(data);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      loadCourses();
    }
  };

  return (
    <div className="p-6 fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Course Management</h1>
        <p className="text-gray-600">Manage course information</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editingId ? 'Edit Course' : 'Add New Course'}
        </h2>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            placeholder="Course Description"
            value={formData.course_desc}
            onChange={(e) => setFormData({ ...formData, course_desc: e.target.value })}
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary flex items-center gap-2">
            <Plus size={20} />
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setFormData({ course_desc: '' }); }}
              className="btn-secondary"
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={handleSearch}
            className="flex-1 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : courses.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No courses found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Description</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.course_id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-semibold">{course.course_id}</td>
                  <td className="px-6 py-4 text-gray-700">{course.course_desc}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(course)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(course.course_id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
