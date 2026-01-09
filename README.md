# Student Management System

A professional, full-featured student class management system built with React, Tailwind CSS, and Node.js/Express.

## Features

- **Degree Management**: Create, read, update, delete academic degrees
- **Student Management**: Manage student information with degree association
- **Teacher Management**: Manage teacher profiles
- **Course Management**: Manage course offerings
- **Class Management**: Link classes to courses
- **Class Enrollment**: Manage student enrollments in classes with teacher assignments
- **Search Functionality**: Real-time search across all entities
- **Professional UI**: Modern, responsive design with Tailwind CSS

## Project Structure

```
studentClass/
├── server/                          # Express backend
│   ├── config/
│   │   ├── database.js             # MySQL connection pool
│   │   └── schema.sql              # Database schema with sample data
│   ├── controllers/                # Business logic
│   │   ├── degreeController.js
│   │   ├── studentController.js
│   │   ├── teacherController.js
│   │   ├── courseController.js
│   │   ├── classController.js
│   │   └── sectionController.js
│   ├── routes/                     # API routes
│   │   ├── degreeRoutes.js
│   │   ├── studentRoutes.js
│   │   ├── teacherRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── classRoutes.js
│   │   └── sectionRoutes.js
│   ├── server.js                   # Main server entry point
│   ├── package.json
│   └── .env                        # Environment variables
│
└── client/                         # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── DegreeManagement.jsx
    │   │   ├── StudentManagement.jsx
    │   │   ├── TeacherManagement.jsx
    │   │   ├── CourseManagement.jsx
    │   │   ├── ClassManagement.jsx
    │   │   └── SectionManagement.jsx
    │   ├── App.jsx                 # Main app with navigation
    │   ├── api.js                  # API service
    │   ├── index.jsx               # React entry point
    │   └── index.css               # Global styles
    ├── package.json
    ├── tailwind.config.js
    └── postcss.config.js
```

## Database Schema (3NF Compliant)

- **degree**: Stores academic degree information
- **students**: Student records linked to degrees
- **teacher**: Teacher profiles
- **course**: Course offerings
- **class**: Classes linked to courses
- **section**: Class enrollments linking students, teachers, and classes

## Prerequisites

- Node.js (v14 or higher)
- MySQL 5.7 or higher
- npm or yarn

## Installation & Setup

### 1. Database Setup

```bash
# Connect to MySQL
mysql -u root -p

# Run the schema script
source server/config/schema.sql
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Configure environment variables
# Edit .env file with your MySQL credentials
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=student_system

# Start the server
npm start

# Or for development with auto-reload
npm run dev
```

The server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to client directory
cd ../client

# Install dependencies
npm install

# Start the React development server
npm start
```

The app will open at `http://localhost:3000`

## API Endpoints

### Degrees
- `GET /api/degrees` - Get all degrees
- `POST /api/degrees` - Create degree
- `PUT /api/degrees/:id` - Update degree
- `DELETE /api/degrees/:id` - Delete degree

### Students
- `GET /api/students` - Get all students
- `GET /api/students/search?query=...` - Search students
- `POST /api/students` - Create student
- `PUT /api/students/:id` - Update student
- `DELETE /api/students/:id` - Delete student

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/search?query=...` - Search teachers
- `POST /api/teachers` - Create teacher
- `PUT /api/teachers/:id` - Update teacher
- `DELETE /api/teachers/:id` - Delete teacher

### Courses
- `GET /api/courses` - Get all courses
- `GET /api/courses/search?query=...` - Search courses
- `POST /api/courses` - Create course
- `PUT /api/courses/:id` - Update course
- `DELETE /api/courses/:id` - Delete course

### Classes
- `GET /api/classes` - Get all classes
- `GET /api/classes/search?query=...` - Search classes
- `POST /api/classes` - Create class
- `PUT /api/classes/:id` - Update class
- `DELETE /api/classes/:id` - Delete class

### Sections (Enrollments)
- `GET /api/sections` - Get all enrollments
- `GET /api/sections/search?query=...` - Search enrollments
- `POST /api/sections` - Create enrollment
- `PUT /api/sections/:id` - Update enrollment
- `DELETE /api/sections/:id` - Delete enrollment

## Usage

1. **Navigate the Interface**: Use the sidebar to access different management modules
2. **Add Records**: Fill in the form at the top of each page and click Add
3. **Search**: Use the search box to filter records
4. **Edit**: Click the edit icon to modify an existing record
5. **Delete**: Click the delete icon to remove a record

## Technologies Used

### Frontend
- React 18
- Tailwind CSS
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MySQL2
- CORS

### Database
- MySQL

## Features Implemented

✅ Full CRUD operations for all entities
✅ Real-time search functionality
✅ Professional, responsive UI with Tailwind CSS
✅ Error handling and validation
✅ RESTful API design
✅ Database relationships and integrity
✅ Sample data included
✅ Icon-based navigation and actions

## Running the Complete System

### Terminal 1: Start Backend
```bash
cd server
npm install
npm start
```

### Terminal 2: Start Frontend
```bash
cd client
npm install
npm start
```

Then open your browser to `http://localhost:3000`

## Troubleshooting

### MySQL Connection Issues
- Ensure MySQL is running
- Check .env credentials match your MySQL setup
- Verify database exists: `SHOW DATABASES;`

### Port Already in Use
- Backend (5000): Change PORT in server/.env
- Frontend (3000): Use `npm start -- --port 3001`

### CORS Errors
- Ensure backend is running on port 5000
- Check API_BASE_URL in client/src/api.js matches backend URL

## Sample Data

The schema includes sample data:
- 3 Degrees: BSIT, BSCS, BSEE
- 4 Students with degree associations
- 2 Teachers
- 2 Courses
- 2 Classes

## Notes

- All passwords and sensitive data should be in environment variables
- Use environment variables for production deployments
- Database connections use connection pooling for better performance
- The system follows 3NF database design principles

## Author

Student Management System - Educational Project

## License

MIT
