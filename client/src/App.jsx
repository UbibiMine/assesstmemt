import React, { useState } from 'react';
import { Users, BookOpen, GraduationCap, Award, Briefcase, LogOut } from 'lucide-react';
import DegreeManagement from './components/DegreeManagement';
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import CourseManagement from './components/CourseManagement';
import ClassManagement from './components/ClassManagement';
import './index.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'degrees':
        return <DegreeManagement />;
      case 'students':
        return <StudentManagement />;
      case 'teachers':
        return <TeacherManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'classes':
        return <ClassManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <GraduationCap size={32} />
            <h1 className="text-3xl font-bold">Student Management System</h1>
          </div>
          <button className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded-lg transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="bg-blue-700 text-white w-64 min-h-screen shadow-lg">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-8">Menu</h2>
            <nav className="space-y-3">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'dashboard' ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`}
              >
                <BookOpen size={20} />
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('degrees')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'degrees' ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`}
              >
                <Award size={20} />
                Degrees
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'students' ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`}
              >
                <Users size={20} />
                Students
              </button>
              <button
                onClick={() => setActiveTab('teachers')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'teachers' ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`}
              >
                <Briefcase size={20} />
                Teachers
              </button>
              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'courses' ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`}
              >
                <BookOpen size={20} />
                Courses
              </button>
              <button
                onClick={() => setActiveTab('classes')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'classes' ? 'bg-blue-600' : 'hover:bg-blue-600'
                }`}
              >
                <BookOpen size={20} />
                Classes
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="p-6 fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to Student Management System</h1>
        <p className="text-gray-600">Manage students, teachers, courses, and class enrollments efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Award, title: 'Degrees', desc: 'Manage academic degrees' },
          { icon: Users, title: 'Students', desc: 'Manage student information' },
          { icon: Briefcase, title: 'Teachers', desc: 'Manage teacher profiles' },
          { icon: BookOpen, title: 'Courses', desc: 'Manage course details' },
          { icon: BookOpen, title: 'Classes', desc: 'Manage class sections' },
          { icon: Users, title: 'Enrollments', desc: 'Manage class enrollments' }
        ].map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <item.icon size={40} className="text-blue-600 mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
