# SETUP INSTRUCTIONS - READ THIS FIRST

## Prerequisites
Make sure you have:
- Node.js installed (from nodejs.org)
- MySQL running locally

## Step 1: Setup Database (ONE TIME ONLY)

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE IF NOT EXISTS student_system;
USE student_system;

CREATE TABLE IF NOT EXISTS degree (
    degree_id INT AUTO_INCREMENT PRIMARY KEY,
    degree_desc VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS students (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    degree_id INT NOT NULL,
    student_FName VARCHAR(50) NOT NULL,
    student_LName VARCHAR(50) NOT NULL,
    FOREIGN KEY (degree_id) REFERENCES degree(degree_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS teacher (
    teacher_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_Fname VARCHAR(50) NOT NULL,
    teacher_Lname VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_desc VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS class (
    class_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    class_desc VARCHAR(100) NOT NULL,
    FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS section (
    classsection_ID INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    teacher_id INT NOT NULL,
    class_id INT NOT NULL,
    classSection VARCHAR(50) NOT NULL,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
);

INSERT INTO degree (degree_desc) VALUES ('BSIT'), ('BSCS'), ('BSIS');

INSERT INTO students (degree_id, student_FName, student_LName) VALUES
(1, 'Allen', 'Danao'),
(1, 'Mike', 'Cheq'),
(1, 'Nakuhra', 'Tan'),
(1, 'Jolly', 'Bee');

INSERT INTO teacher (teacher_Fname, teacher_Lname) VALUES
('John', 'Doe'),
('Jean', 'Barquin');

INSERT INTO course (course_desc) VALUES
('Programming 1'),
('IT Fundamentals');

INSERT INTO class (course_id, class_desc) VALUES
(1, 'Prog1 – IT1'),
(2, 'Fund1 – IT1');
```

## Step 2: Install Dependencies

Open PowerShell in the root directory and run:

```powershell
npm install
cd server
npm install
cd ..\client
npm install
cd ..
```

OR simply run:

```powershell
npm run install-all
```

## Step 3: Start the System

You need TWO separate PowerShell terminals:

### Terminal 1: Start the Backend Server
```powershell
cd server
npm start
```

You should see: `Server running on port 5001`

### Terminal 2: Start the Frontend
```powershell
cd client
npm start
```

This will automatically open your browser to `http://localhost:3000`

## Step 4: Test the Application

1. Open http://localhost:3000 in your browser
2. Click on "Degrees" in the sidebar
3. You should see the sample degrees (BSIT, BSCS, BSEE)
4. Try adding a new degree
5. Test all CRUD operations

## Troubleshooting

### Problem: "npm: command not found"
- Solution: Install Node.js from nodejs.org

### Problem: MySQL connection error
- Solution: Make sure MySQL is running and database was created
- Check the .env file in the server folder has correct credentials:
  ```
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=
  DB_NAME=student_system
  ```

### Problem: Port 3000 or 5000 already in use
- Solution: Close other applications using these ports, or:
  - For frontend: `npm start -- --port 3001`
  - For backend: Change PORT in server/.env to 5001

### Problem: Still getting errors
- Make sure you're in the correct directory when running commands
- Check that both server and client have node_modules folders
- Restart both terminals

## Quick Reference

```
Root directory (studentClass/)
├── npm run install-all          # Install all dependencies
├── npm run server              # Start backend only
├── npm run client              # Start frontend only
├── npm start                   # Start both (requires concurrently)

server/ directory
├── npm install                 # Install backend dependencies
├── npm start                   # Start backend server

client/ directory
├── npm install                 # Install frontend dependencies
├── npm start                   # Start frontend
```

## Expected Output

### Backend Console:
```
Server running on port 5001
```

### Frontend Console:
```
Compiled successfully!
You can now view student-management-client in the browser.
  Local:            http://localhost:3000
```

If you see both of these, you're good to go! 🎉
