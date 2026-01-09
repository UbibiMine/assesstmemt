import React, { useState, useEffect } from 'react';
import { Edit2, Plus, Search, Eye, EyeOff } from 'lucide-react';
import Modal from './Modal';
import api from '../api';

export default function TeacherManagement() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({ teacher_Fname: '', teacher_Lname: '', is_active: 1 });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTeachers();
  }, []);

  const loadTeachers = async () => {
    try {
      setLoading(true);
      const data = await api.getTeachers();
      setTeachers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading teachers:', error);
      setTeachers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.teacher_Fname.trim() || !formData.teacher_Lname.trim()) {
      setError('Please fill all fields');
      return;
    }
    try {
      if (editingId) {
        await api.updateTeacher(editingId, formData);
        setEditingId(null);
      } else {
        await api.createTeacher(formData);
      }
      setFormData({ teacher_Fname: '', teacher_Lname: '', is_active: 1 });
      setShowModal(false);
      loadTeachers();
    } catch (err) {
      setError(err.message || 'Error saving teacher');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.updateTeacher(id, { ...teachers.find(t => t.teacher_id === id), is_active: teachers.find(t => t.teacher_id === id).is_active ? 0 : 1 });
      loadTeachers();
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  const toggleStatus = async (teacher) => {
    try {
      const newStatus = teacher.is_active ? 0 : 1;
      await api.updateTeacher(teacher.teacher_id, { ...teacher, is_active: newStatus });
      loadTeachers();
    } catch (error) {
      setError('Error: ' + error.message);
    }
  };

  const handleEdit = (teacher) => {
    setFormData(teacher);
    setShowModal(true);
    setEditingId(teacher.teacher_id);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      try {
        const data = await api.searchTeachers(value);
        setTeachers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Search error:', error);
        setTeachers([]);
      }
    } else {
      loadTeachers();
    }
  };

  return (
    <div className="p-6 fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Teacher Management</h1>
        <p className="text-gray-600">Manage teacher information</p>
      </div>

      {/* Add Button */}
      <div className="mb-8">
        <button
          onClick={() => {
            setFormData({ teacher_Fname: '', teacher_Lname: '', is_active: 1 });
            setEditingId(null);
            setShowModal(true);
            setError('');
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Teacher
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={editingId ? 'Edit Teacher' : 'Add New Teacher'}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ teacher_Fname: '', teacher_Lname: '', is_active: 1 });
          setError('');
        }}
      >
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={formData.teacher_Fname}
            onChange={(e) => setFormData({ ...formData, teacher_Fname: e.target.value })}
            className="input-field w-full"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.teacher_Lname}
            onChange={(e) => setFormData({ ...formData, teacher_Lname: e.target.value })}
            className="input-field w-full"
          />
          {editingId && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.is_active === 1}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.checked ? 1 : 0 })}
                className="h-4 w-4"
              />
              <label className="text-gray-700">Active</label>
            </div>
          )}
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              {editingId ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setFormData({ teacher_Fname: '', teacher_Lname: '', is_active: 1 });
                setError('');
              }}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Search */}
      <div className="mb-6">
        <div className="flex items-center gap-2 bg-white p-3 rounded-lg shadow-sm">
          <Search size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search teachers..."
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
        ) : teachers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No teachers found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">First Name</th>
                <th className="px-6 py-3 text-left font-semibold">Last Name</th>
                <th className="px-6 py-3 text-center font-semibold">Status</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((teacher) => (
                <tr key={teacher.teacher_id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-semibold">{teacher.teacher_id}</td>
                  <td className="px-6 py-4 text-gray-700">{teacher.teacher_Fname}</td>
                  <td className="px-6 py-4 text-gray-700">{teacher.teacher_Lname}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                      teacher.is_active ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {teacher.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(teacher)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit Teacher"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => toggleStatus(teacher)}
                        className={teacher.is_active ? "text-red-600 hover:text-red-800" : "text-green-600 hover:text-green-800"}
                        title={teacher.is_active ? 'Deactivate' : 'Activate'}
                      >
                        {teacher.is_active ? <EyeOff size={18} /> : <Eye size={18} />}
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
