# Quick Start Guide

## 1. Database Setup (MySQL)

```bash
mysql -u root -p < server/config/schema.sql
```

Or manually:
```sql
CREATE DATABASE student_system;
USE student_system;

-- Run all CREATE TABLE statements from schema.sql
```

## 2. Install & Run Backend

```bash
cd server
npm install
npm start
```

Expected output: `Server running on port 5000`

## 3. Install & Run Frontend (New Terminal)

```bash
cd client
npm install
npm start
```

Expected: Browser opens to `http://localhost:3000`

## Features Ready to Use

1. **Dashboard** - Overview of the system
2. **Degrees** - Add/Edit/Delete degree programs
3. **Students** - Manage student records
4. **Teachers** - Manage teacher profiles
5. **Courses** - Create course offerings
6. **Classes** - Link classes to courses
7. **Enrollments** - Assign students to classes

## Sample Data

Pre-loaded with:
- BSIT, BSCS, BSEE degrees
- 4 sample students
- 2 sample teachers
- 2 sample courses
- 2 sample classes

## If Something Doesn't Work

1. **Check MySQL is running**
2. **Verify .env credentials** in server/.env
3. **Check ports**: 5001 (backend), 3000 (frontend)
4. **Check console for errors** in terminal and browser DevTools

## Default MySQL Connection

- Host: localhost
- User: root
- Password: (empty - update in .env if needed)
- Database: student_system

Enjoy! 🎓
