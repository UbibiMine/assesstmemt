import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search } from 'lucide-react';
import Modal from './Modal';
import api from '../api';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [degrees, setDegrees] = useState([]);
  const [formData, setFormData] = useState({ degree_id: '', student_FName: '', student_LName: '' });
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
      const [studentData, degreeData] = await Promise.all([
        api.getStudents(),
        api.getDegrees()
      ]);
      setStudents(Array.isArray(studentData) ? studentData : []);
      setDegrees(Array.isArray(degreeData) ? degreeData : []);
    } catch (error) {
      console.error('Error loading data:', error);
      setStudents([]);
      setDegrees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.degree_id || !formData.student_FName.trim() || !formData.student_LName.trim()) {
      alert('Please fill all fields');
      return;
    }
    try {
      if (editingId) {
        await api.updateStudent(editingId, formData);
        setEditingId(null);
      } else {
        await api.createStudent(formData);
      }
      setFormData({ degree_id: '', student_FName: '', student_LName: '' });
      loadData();
    } catch (error) {
      alert('Error saving student: ' + error.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await api.deleteStudent(id);
        loadData();
      } catch (error) {
        alert('Error: ' + error.message);
      }
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
    setShowModal(true);
    setEditingId(student.student_id);
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value.trim()) {
      try {
        const data = await api.searchStudents(value);
        setStudents(data);
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Management</h1>
        <p className="text-gray-600">Manage student information and enrollment</p>
      </div>

      {/* Add Button */}
      <div className="mb-8">
        <button
          onClick={() => {
            setFormData({ degree_id: '', student_FName: '', student_LName: '' });
            setEditingId(null);
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Student
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={editingId ? 'Edit Student' : 'Add New Student'}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ degree_id: '', student_FName: '', student_LName: '' });
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            value={formData.degree_id}
            onChange={(e) => setFormData({ ...formData, degree_id: e.target.value })}
            className="input-field"
          >
            <option value="">Select Degree</option>
            {degrees.map(d => (
              <option key={d.degree_id} value={d.degree_id}>{d.degree_desc}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="First Name"
            value={formData.student_FName}
            onChange={(e) => setFormData({ ...formData, student_FName: e.target.value })}
            className="input-field"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.student_LName}
            onChange={(e) => setFormData({ ...formData, student_LName: e.target.value })}
            className="input-field"
          />
          <div className="flex gap-3">
            <button type="submit" className="btn-primary flex-1">
              {editingId ? 'Update' : 'Add'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowModal(false);
                setEditingId(null);
                setFormData({ degree_id: '', student_FName: '', student_LName: '' });
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
            placeholder="Search students..."
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
        ) : students.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No students found</div>
        ) : (
          <table className="w-full min-w-max">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">First Name</th>
                <th className="px-6 py-3 text-left font-semibold">Last Name</th>
                <th className="px-6 py-3 text-left font-semibold">Degree</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map((student) => (
                <tr key={student.student_id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-semibold">{student.student_id}</td>
                  <td className="px-6 py-4 text-gray-700">{student.student_FName}</td>
                  <td className="px-6 py-4 text-gray-700">{student.student_LName}</td>
                  <td className="px-6 py-4 text-gray-700">{student.degree_desc}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(student.student_id)}
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
