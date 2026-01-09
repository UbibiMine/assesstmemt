import React, { useState, useEffect } from 'react';
import { Trash2, Edit2, Plus, Search } from 'lucide-react';
import Modal from './Modal';
import api from '../api';

export default function DegreeManagement() {
  const [degrees, setDegrees] = useState([]);
  const [formData, setFormData] = useState({ degree_desc: '' });
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadDegrees();
  }, []);

  const loadDegrees = async () => {
    try {
      setLoading(true);
      const data = await api.getDegrees();
      setDegrees(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading degrees:', error);
      setDegrees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.degree_desc.trim()) {
      setError('Please enter degree description');
      return;
    }
    try {
      if (editingId) {
        await api.updateDegree(editingId, formData);
        setEditingId(null);
      } else {
        await api.createDegree(formData);
      }
      setFormData({ degree_desc: '' });
      setShowModal(false);
      loadDegrees();
    } catch (err) {
      setError(err.message || 'Error saving degree');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this degree?')) {
      try {
        await api.deleteDegree(id);
        loadDegrees();
      } catch (error) {
        alert('Error deleting degree: ' + error.message);
      }
    }
  };

  const handleEdit = (degree) => {
    setFormData(degree);
    setEditingId(degree.degree_id);
    setShowModal(true);
  };

  const filteredDegrees = degrees.filter(degree =>
    degree.degree_desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Degree Management</h1>
        <p className="text-gray-600">Manage academic degrees in the system</p>
      </div>

      {/* Add Button */}
      <div className="mb-8">
        <button
          onClick={() => {
            setFormData({ degree_desc: '' });
            setEditingId(null);
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add New Degree
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={editingId ? 'Edit Degree' : 'Add New Degree'}
        onClose={() => {
          setShowModal(false);
          setEditingId(null);
          setFormData({ degree_desc: '' });
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Degree Description"
            value={formData.degree_desc}
            onChange={(e) => setFormData({ ...formData, degree_desc: e.target.value })}
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
                setFormData({ degree_desc: '' });
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
            placeholder="Search degrees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : filteredDegrees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No degrees found</div>
        ) : (
          <table className="w-full">
            <thead className="bg-purple-600 text-white">
              <tr>
                <th className="px-6 py-3 text-left font-semibold">ID</th>
                <th className="px-6 py-3 text-left font-semibold">Description</th>
                <th className="px-6 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDegrees.map((degree) => (
                <tr key={degree.degree_id} className="hover:bg-blue-50 transition-colors">
                  <td className="px-6 py-4 text-gray-700 font-semibold">{degree.degree_id}</td>
                  <td className="px-6 py-4 text-gray-700">{degree.degree_desc}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(degree)}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(degree.degree_id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
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
