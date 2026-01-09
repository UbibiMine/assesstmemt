import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search } from 'lucide-react';
import Modal from './Modal';
import api from '../api';

export default function ClassManagement() {
  const [classes, setClasses] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({ course_id: '', class_desc: '' });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [classData, courseData] = await Promise.all([
        api.getClasses(),
        api.getCourses()
      ]);
      setClasses(Array.isArray(classData) ? classData : []);
      setCourses(Array.isArray(courseData) ? courseData : []);
    } catch (error) {
      console.error('Error loading data:', error);
      setClasses([]);
      setCourses([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.course_id || !formData.class_desc.trim()) {
      alert('Please fill all fields');
      return;
    }
    try {
      if (editingId) {
        await api.updateClass(editingId, formData);
        setEditingId(null);
      } else {
        await api.createClass(formData);
      }
      setFormData({ course_id: '', class_desc: '' });
      loadData();
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.deleteClass(id);
        loadData();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleEdit = (cls) => {
    setFormData(cls);
    setEditingId(cls.class_id);
    setShowModal(true);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      try {
        const data = await api.searchClasses(value);
        setClasses(data);
      } catch (error) {
        console.error('Search error:', error);
      }
    } else {
      loadData();
    }
  };

  return (
    <div className="p-6 fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Class Management</h1>
        <p className="text-gray-600">Manage class information</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editingId ? 'Edit Class' : 'Add New Class'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <select
            value={formData.course_id}
            onChange={(e) => setFormData({ ...formData, course_id: e.target.value })}
            className="input-field"
          >
            <option value="">Select Course</option>
            {courses.map(c => (
              <option key={c.course_id} value={c.course_id}>{c.course_desc}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Class Description"
            value={formData.class_desc}
            onChange={(e) => setFormData({ ...formData, class_desc: e.target.value })}
            className="input-field"
          />
          <button type="submit" className="btn-primary flex items-center justify-center gap-2">
            <Plus size={20} />
            {editingId ? 'Update' : 'Add'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => { setEditingId(null); setFormData({ course_id: '', class_desc: '' }); }}
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
            placeholder="Search classes..."
            value={search}
            onChange={handleSearch}
            className="flex-1 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : classes.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No classes found</div>
        ) : (
          <table className="w-full min-w-max">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Description</th>
                <th className="px-6 py-3 text-left font-semibold">Course</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {classes.map((cls) => (
                <tr key={cls.class_id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-semibold">{cls.class_id}</td>
                  <td className="px-6 py-4 text-gray-700">{cls.class_desc}</td>
                  <td className="px-6 py-4 text-gray-700">{cls.course_desc}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(cls)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(cls.class_id)}
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
