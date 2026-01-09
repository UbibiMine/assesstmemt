CREATE DATABASE IF NOT EXISTS studentclass;
USE studentclass;

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

-- Sample Data
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
