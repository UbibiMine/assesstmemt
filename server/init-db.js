const mysql = require('mysql2/promise');

async function initializeDatabase() {
  const conn = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
  });

  try {
    // Create database
    await conn.query('CREATE DATABASE IF NOT EXISTS studentclass');
    await conn.query('USE studentclass');

    // Disable foreign key checks
    await conn.query('SET FOREIGN_KEY_CHECKS = 0');

    // Drop existing tables with constraints
    await conn.query('DROP TABLE IF EXISTS section');
    await conn.query('DROP TABLE IF EXISTS class');
    await conn.query('DROP TABLE IF EXISTS course');
    await conn.query('DROP TABLE IF EXISTS students');
    await conn.query('DROP TABLE IF EXISTS teacher');
    await conn.query('DROP TABLE IF EXISTS degree');

    // Re-enable foreign key checks
    await conn.query('SET FOREIGN_KEY_CHECKS = 1');

    // Create tables
    await conn.query(`
      CREATE TABLE degree (
        degree_id INT AUTO_INCREMENT PRIMARY KEY,
        degree_desc VARCHAR(100) NOT NULL UNIQUE
      )
    `);

    await conn.query(`
      CREATE TABLE students (
        student_id INT AUTO_INCREMENT PRIMARY KEY,
        degree_id INT NOT NULL,
        student_FName VARCHAR(50) NOT NULL,
        student_LName VARCHAR(50) NOT NULL,
        FOREIGN KEY (degree_id) REFERENCES degree(degree_id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE teacher (
        teacher_id INT AUTO_INCREMENT PRIMARY KEY,
        teacher_Fname VARCHAR(50) NOT NULL,
        teacher_Lname VARCHAR(50) NOT NULL
      )
    `);

    await conn.query(`
      CREATE TABLE course (
        course_id INT AUTO_INCREMENT PRIMARY KEY,
        course_desc VARCHAR(100) NOT NULL UNIQUE
      )
    `);

    await conn.query(`
      CREATE TABLE class (
        class_id INT AUTO_INCREMENT PRIMARY KEY,
        course_id INT NOT NULL,
        class_desc VARCHAR(100) NOT NULL,
        FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
      )
    `);

    await conn.query(`
      CREATE TABLE section (
        classsection_ID INT AUTO_INCREMENT PRIMARY KEY,
        student_id INT NOT NULL,
        teacher_id INT NOT NULL,
        class_id INT NOT NULL,
        classSection VARCHAR(50) NOT NULL,
        FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
        FOREIGN KEY (teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
        FOREIGN KEY (class_id) REFERENCES class(class_id) ON DELETE CASCADE
      )
    `);

    // Insert sample data
    await conn.query("INSERT INTO degree (degree_desc) VALUES ('BSIT'), ('BSCS'), ('BSIS')");
    
    await conn.query(`
      INSERT INTO students (degree_id, student_FName, student_LName) VALUES
      (1, 'Allen', 'Danao'),
      (1, 'Mike', 'Cheq'),
      (1, 'Nakuhra', 'Tan'),
      (1, 'Jolly', 'Bee')
    `);

    await conn.query(`
      INSERT INTO teacher (teacher_Fname, teacher_Lname) VALUES
      ('John', 'Doe'),
      ('Jean', 'Barquin')
    `);

    await conn.query(`
      INSERT INTO course (course_desc) VALUES
      ('Programming 1'),
      ('IT Fundamentals')
    `);

    await conn.query(`
      INSERT INTO class (course_id, class_desc) VALUES
      (1, 'Prog1 – IT1'),
      (2, 'Fund1 – IT1')
    `);

    console.log('✓ Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Error:', error.message);
    process.exit(1);
  } finally {
    await conn.end();
  }
}

initializeDatabase();
